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

  /**
   * Sets the strategy that is used for llm generation and returns it.
   *
   * @param {string} name - The name of the strategy to set.
   * @return {LLMStrategy} The llm strategy with the given name.
   * @throws {Error} If the strategy with the given name is not found.
   */
  public setStrategy(name: string): LLMStrategy {
    const strategy = this.strategies.get(name);
    if (!strategy) {
      throw new Error(`Strategy ${name} not found`);
    }
    return strategy;
  }
}
