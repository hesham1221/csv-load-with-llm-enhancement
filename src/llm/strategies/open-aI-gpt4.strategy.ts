import { Injectable } from '@nestjs/common';
import { OpenAI } from "@langchain/openai";
import { LLMStrategy } from 'src/common/@types/llm-strategy.interface';

@Injectable()
export class OpenAIGPT4Strategy implements LLMStrategy {
  private openAIProvider: OpenAI;

  constructor() {
    this.openAIProvider = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4',
    });
  }

  async executePrompt(prompt: string): Promise<string> {
    const response = await this.openAIProvider.invoke(prompt);
    return response.trim();
  }
}
