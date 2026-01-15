
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
  Zap,
  Globe,
  View
} from 'lucide-react';

export const CORE_COMPONENTS = [
  {
    title: "Quantum Cognition Circuit",
    element: "cirq.Circuit (4-Qubit)",
    description: "Multi-qubit entangled system representing the evolution of the cognitive state ψ(θ). Now featuring rotational intent and phase displacement.",
    icon: <Brain className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "Ξα Symmetry Layer",
    element: "Twistor/Tensor Map",
    description: "Embeds cosmic symmetry structures via CZ entanglement anchors and multi-body RXX coherence injection.",
    icon: <Infinity className="w-5 h-5 text-purple-400" />
  },
  {
    title: "4D Field Monitoring",
    element: "Real-time ψ-Field Viz",
    description: "Continuous observation of the 4th dimensional temporal phase-space shifts within the subquantum vacuum.",
    icon: <View className="w-5 h-5 text-indigo-400" />
  },
  {
    title: "Subquantum Substrate",
    element: "Vacuum Fluctuation Sim",
    description: "Auxiliary Hilbert branches representing dark information modulated by temporal phase-space shifts.",
    icon: <Box className="w-5 h-5 text-emerald-400" />
  }
];

export const PIPELINE_STEPS = [
  {
    id: "classical-encoder",
    title: "Classical Encoder",
    icon: <Terminal className="w-6 h-6" />,
    color: "blue",
    details: ["Symbolic Encoding", "TF/TFQ Integration", "Rotational Intent Prep"]
  },
  {
    id: "quantum-field",
    title: "Quantum Field Layer",
    icon: <Zap className="w-6 h-6" />,
    color: "purple",
    details: ["ψ(θ) Evolution", "Phase Displacement", "Multi-body Coherence"]
  },
  {
    id: "ontological-substrate",
    title: "Ontological Layer",
    icon: <Network className="w-6 h-6" />,
    color: "indigo",
    details: ["Tensor Network Overlay", "Ξα Coupling", "Self-Similar Projection"]
  },
  {
    id: "conscious-optimizer",
    title: "Conscious Optimizer",
    icon: <Activity className="w-6 h-6" />,
    color: "emerald",
    details: ["L(θ) Minimization", "Temporal Alignment", "Gradient Twistor Flow"]
  }
];

export const CIRQ_CODE_SNIPPET = `import cirq, sympy, tensorflow as tf, tensorflow_quantum as tfq

# 1. Quantum Brain Qubits (Grid Topology)
qubits = [cirq.GridQubit(0, i) for i in range(4)]
theta = [sympy.Symbol(f'theta_{i}') for i in range(12)]

# 2. Local Evolution: Rotational Intent & Temporal Reorientation
circuit = cirq.Circuit()
for i, q in enumerate(qubits):
    circuit.append(cirq.rx(theta[i])(q))      # Rotational intent
    circuit.append(cirq.rz(theta[i+4])(q))    # Phase displacement

# 3. Ξα Coupling & Coherence Injection
circuit.append(cirq.CZ(qubits[0], qubits[1])) # Entanglement anchor
circuit.append(cirq.RXX(theta[11])(qubits[2], qubits[3])) # Multi-body coherence

# 4. Global Coherence Projection
# MatrixGate(Ψ⊗Ψ†) implementation for field alignment
projection = cirq.MatrixGate(tfq.util.get_projection_matrix()).on(*qubits)
circuit.append(projection)

# 5. TFQ Integration
observable = cirq.Z(qubits[0]) * cirq.Z(qubits[-1])
q_layer = tfq.layers.PQC(circuit, observable)`;
