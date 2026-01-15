
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';
import { Mic, MicOff, Volume2, Loader2, Sparkles, MessageSquare } from 'lucide-react';

// Audio Helpers as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [userSpeech, setUserSpeech] = useState<string>('');
  
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextsRef.current) {
      audioContextsRef.current.input.close();
      audioContextsRef.current.output.close();
      audioContextsRef.current.input = null as any;
      audioContextsRef.current.output = null as any;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `You are the MKone Core Intelligence in Voice Synchronicity Mode. 
          You are an expert in quantum consciousness, Google Cirq, and TF Quantum. 
          Speak with a calm, intellectual, yet visionary tone. 
          Your current environment is the MKone CMS dashboard.`,
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcription
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent!.outputTranscription!.text);
            } else if (message.serverContent?.inputTranscription) {
              setUserSpeech(prev => prev + message.serverContent!.inputTranscription!.text);
            }

            if (message.serverContent?.turnComplete) {
              setTranscription('');
              setUserSpeech('');
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextsRef.current) {
              const { output: ctx } = audioContextsRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              const gainNode = ctx.createGain();
              source.connect(gainNode);
              gainNode.connect(ctx.destination);
              
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live API Error:', e);
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
            stopSession();
          },
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start session:', err);
      setIsConnecting(false);
    }
  };

  const toggleSession = () => {
    if (isActive || isConnecting) stopSession();
    else startSession();
  };

  return (
    <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center space-y-8 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
      
      {/* Waveform Visualizer simulation */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-indigo-500/20 animate-[ping_3s_linear_infinite]" />
            <div className="w-3/4 h-3/4 rounded-full border border-indigo-500/30 animate-[ping_2s_linear_infinite]" />
            <div className="w-1/2 h-1/2 rounded-full border border-indigo-500/40 animate-[ping_1.5s_linear_infinite]" />
          </div>
        )}
        <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl
          ${isActive ? 'bg-indigo-600 scale-110 shadow-indigo-600/40' : 'bg-slate-800 scale-100 shadow-black'}`}>
          {isConnecting ? (
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          ) : isActive ? (
            <Volume2 className="w-12 h-12 text-white animate-pulse" />
          ) : (
            <Mic className="w-12 h-12 text-slate-400" />
          )}
        </div>
      </div>

      <div className="text-center space-y-2 relative z-10">
        <h3 className="text-xl font-black text-white uppercase tracking-widest">
          {isConnecting ? 'Establishing Link...' : isActive ? 'Synchronicity Active' : 'Voice Interface'}
        </h3>
        <p className="text-xs text-slate-500 font-mono">
          {isActive ? 'MKone Core is listening to your cognitive intent.' : 'Initialize real-time audio entanglement.'}
        </p>
      </div>

      <div className="flex flex-col w-full space-y-4">
        {/* Transcription HUD */}
        {(userSpeech || transcription) && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 min-h-[100px] max-h-[150px] overflow-y-auto space-y-3">
            {userSpeech && (
              <div className="flex items-start space-x-2 text-[11px] text-cyan-400 font-mono">
                <Sparkles className="w-3 h-3 mt-1 flex-shrink-0" />
                <span><span className="opacity-50">[USER]:</span> {userSpeech}</span>
              </div>
            )}
            {transcription && (
              <div className="flex items-start space-x-2 text-[11px] text-indigo-300 font-mono">
                <MessageSquare className="w-3 h-3 mt-1 flex-shrink-0" />
                <span><span className="opacity-50">[CORE]:</span> {transcription}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={toggleSession}
          disabled={isConnecting}
          className={`w-full py-4 rounded-2xl flex items-center justify-center space-x-3 text-xs font-black uppercase tracking-[0.2em] transition-all
            ${isActive 
              ? 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20' 
              : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500'}`}
        >
          {isActive ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>Sever Link</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>Initialize Synchronicity</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center space-x-4 opacity-50">
        <div className="flex items-center space-x-1">
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
          <span className="text-[9px] font-mono text-slate-500 uppercase">Input: 16k PCM</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
          <span className="text-[9px] font-mono text-slate-500 uppercase">Output: 24k PCM</span>
        </div>
      </div>
    </div>
  );
};
