import { Global, Module } from '@nestjs/common';
import { CsvService } from './csv.service';

@Global()  // As this module suppose gonna be used in whole application
@Module({
  providers: [CsvService],
  exports: [CsvService],
})
export class CsvModule {}
