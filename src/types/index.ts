export type UseCase = 'code' | 'image' | 'video' | 'website' | 'general';

export interface Prompt {
  id: string;
  session_id: string;
  requirement: string;
  use_case: UseCase;
  generated_prompt: string;
  techniques: string[];
  quality_score: number;
  title: string;
  is_saved: boolean;
  created_at: string;
}

export interface GeneratedResult {
  prompt: string;
  techniques: string[];
  quality_score: number;
  title: string;
  breakdown: PromptBreakdown[];
}

export interface PromptBreakdown {
  label: string;
  content: string;
  color: string;
}

export interface IterationExample {
  id: string;
  title: string;
  use_case: UseCase;
  description: string;
  initial_prompt: string;
  improved_prompt: string;
  changes: string[];
  quality_before: number;
  quality_after: number;
}

export interface ContentTemplate {
  id: string;
  category: 'video' | 'image' | 'website';
  title: string;
  description: string;
  icon: string;
  variables: TemplateVariable[];
  template: string;
}

export interface TemplateVariable {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'select';
  options?: string[];
}
