import { TechStack } from '@/types';

export const STACK_OPTIONS: TechStack[] = [
  'AI / ML',
  'Solana / Web3',
  'Full-Stack',
  'Rust / Systems',
  'Design / Product',
  'Infra / Security',
];

export const TITLE_POOLS: Record<TechStack, string[]> = {
  'AI / ML': [
    'Autonomous Agent Architect',
    'Neural Systems Builder',
    'LLM RAG Specialist',
    'Prompt Alchemist',
    'Model Fine-Tuner',
    'AI Engineer'
  ],
  'Solana / Web3': [
    'Solana Speedrunner',
    'Anchor Smart Contract Crafter',
    'On-Chain Protocol Builder',
    '0x Bytecode Architect',
    'SVM Hacker',
    'Web3 Builder'
  ],
  'Full-Stack': [
    'Full-Stack Alchemist',
    'App Router Connoisseur',
    'Zero-Latency Engineer',
    'UI Systems Specialist',
    'API Sorcerer',
    'Product Builder'
  ],
  'Rust / Systems': [
    'Memory Safety Virtuoso',
    'Low-Level Systems Hacker',
    'Zero-Cost Abstractionist',
    'Kernel & Concurrency Crafter',
    'Compiler Specialist',
    'Systems Engineer'
  ],
  'Design / Product': [
    'Product & UX Artisan',
    'Editorial Design System Craftsman',
    'Interaction & Motion Specialist',
    'Micro-Animation Designer',
    'Figma to Code Hacker',
    'Design Engineer'
  ],
  'Infra / Security': [
    'Zero-Knowledge Architect',
    'High-Throughput Node Wrangler',
    'Distributed Systems Specialist',
    'RPC & Protocol Builder',
    'Security Researcher',
    'Infra Engineer'
  ]
};

export function getRandomTitle(stack?: TechStack): string {
  const pool = stack && TITLE_POOLS[stack] ? TITLE_POOLS[stack] : Object.values(TITLE_POOLS).flat();
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
