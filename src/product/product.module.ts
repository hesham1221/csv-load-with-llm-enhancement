import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductService } from './product.service';
import { LLMModule } from 'src/llm/llm.module';
import { ProductSchedule } from './product.schedule';
import { ProductTransformer } from './product.transformer';
import { UtilModule } from 'src/common/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    LLMModule,
    UtilModule
  ],
  providers: [ProductService, ProductSchedule, ProductTransformer],
  exports: [ProductService],
})
export class ProductModule {}
