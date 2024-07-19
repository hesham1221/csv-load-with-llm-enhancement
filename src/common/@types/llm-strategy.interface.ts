export interface LLMStrategy {
    executePrompt(prompt: string): Promise<string>;
  }
  