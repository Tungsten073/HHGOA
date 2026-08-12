export type FormatType = 'frame' | 'id-card';

export type FrameTheme = 'editorial' | 'sunset' | 'volt' | 'ocean';

export type TechStack = 
  | 'AI / ML'
  | 'Solana / Web3'
  | 'Full-Stack'
  | 'Rust / Systems'
  | 'Design / Product'
  | 'Infra / Security';

export interface BuilderData {
  name: string;
  stack: TechStack;
  title: string;
  githubHandle?: string;
  twitterHandle?: string;
}

export interface TransformState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export interface ShareResponse {
  success: boolean;
  shareId: string;
  shareUrl: string;
  imageUrl: string;
  error?: string;
}
