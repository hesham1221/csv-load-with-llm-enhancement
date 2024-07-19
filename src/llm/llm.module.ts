import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';
import { OpenAIGPT4Strategy } from './strategies/open-aI-gpt4.strategy';

@Module({
  providers: [LLMService, OpenAIGPT4Strategy],
  exports: [LLMService],
})
export class LLMModule {}
