import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductService } from './product.service';
import { join } from 'path';
@Injectable()
export class ProductSchedule {
  constructor(private readonly productService: ProductService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async importProductsFromCSVJob() {
    await this.productService.importProductsFromCSV(
      join(process.cwd(), 'public', 'products.csv'), // This suppose to be a data came from the vendure server so we can mock it with a file
    );
  }
}
