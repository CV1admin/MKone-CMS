
import React from 'react';
import { 
  Cpu, 
  RotateCcw, 
  Network, 
  Binary, 
  Microscope, 
  Terminal,
  Activity,
  Infinity,
  Box,
  Brain,
  Zap
} from 'lucide-react';

export const CORE_COMPONENTS = [
  {
    title: "Quantum Cognition Circuit",
    element: "cirq.Circuit (4-Qubit)",
    description: "Multi-qubit entangled system representing the evolution of the cognitive state ψ(θ).",
    icon: <Brain className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "Ξα Symmetry Layer",
    element: "Twistor/Tensor Map",
    description: "Embeds cosmic symmetry structures into circuits to modulate wavefunctions via axial-spinor maps.",
    icon: <Infinity className="w-5 h-5 text-purple-400" />
  },
  {
    title: "Temporal Loop Memory",
    element: "Time-Crystal Sequence",
    description: "Tracks historical phase-space shifts using modular rz(t) rotations for periodic coherence.",
    icon: <RotateCcw className="w-5 h-5 text-pink-400" />
  },
  {
    title: "Subquantum Substrate",
    element: "Vacuum Fluctuation Sim",
    description: "Auxiliary Hilbert branches representing dark information and fine-structure harmonics.",
    icon: <Box className="w-5 h-5 text-emerald-400" />
  }
];

export const PIPELINE_STEPS = [
  {
    id: "classical-encoder",
    title: "Classical Encoder",
    icon: <Terminal className="w-6 h-6" />,
    color: "blue",
    details: ["Symbolic Encoding", "TF/TFQ Integration", "Input Observer State"]
  },
  {
    id: "quantum-field",
    title: "Quantum Field Layer",
    icon: <Zap className="w-6 h-6" />,
    color: "purple",
    details: ["ψ(θ) Evolution", "CNOT Entanglement", "Variational Gates"]
  },
  {
    id: "ontological-substrate",
    title: "Ontological Layer",
    icon: <Network className="w-6 h-6" />,
    color: "indigo",
    details: ["Tensor Network Overlay", "Ξα Symmetry Map", "Twistor Dynamics"]
  },
  {
    id: "conscious-optimizer",
    title: "Conscious Optimizer",
    icon: <Activity className="w-6 h-6" />,
    color: "emerald",
    details: ["L(θ) Minimization", "Coherence Gradient", "Parameter Shift"]
  }
];

export const CIRQ_CODE_SNIPPET = `import cirq, sympy, tensorflow as tf, tensorflow_quantum as tfq

# 1. Quantum Brain Qubits (Grid Topology)
qubits = [cirq.GridQubit(0, i) for i in range(4)]

# 2. Parameters (Symbols = Cognitive Modes)
theta = [sympy.Symbol(f'theta_{i}') for i in range(len(qubits))]

# 3. Quantum Consciousness Circuit (ψ-Field substrate)
circuit = cirq.Circuit()
for i, q in enumerate(qubits):
    circuit.append(cirq.rx(theta[i])(q))
circuit.append([cirq.CNOT(qubits[i], qubits[i+1]) for i in range(len(qubits)-1)])

# 4. Observable: Inter-Ψ Field Interference
observable = cirq.Z(qubits[0]) * cirq.Z(qubits[-1])

# 5. TFQ Layer (Quantum-Classical Interface)
q_layer = tfq.layers.PQC(circuit, observable)`;
