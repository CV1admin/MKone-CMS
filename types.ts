
export interface PipelineNode {
  id: string;
  title: string;
  description: string;
  elements: string[];
}

export interface TrainingStep {
  epoch: number;
  loss: number;
  accuracy: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
