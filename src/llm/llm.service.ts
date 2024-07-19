import { Injectable } from '@nestjs/common';
import { LLMStrategy } from 'src/common/@types/llm-strategy.interface';
import { OpenAIGPT4Strategy } from './strategies/open-aI-gpt4.strategy';

@Injectable()
export class LLMService {
  private strategies: Map<string, LLMStrategy>;

  constructor(private readonly openAIGPT4Strategy: OpenAIGPT4Strategy) {
    this.strategies = new Map<string, LLMStrategy>();
    this.strategies.set('gpt4', openAIGPT4Strategy);
  }

  public setStrategy(name: string): LLMStrategy {
    const strategy = this.strategies.get(name);
    if (!strategy) {
      throw new Error(`Strategy ${name} not found`);
    }
    return strategy;
  }
}
