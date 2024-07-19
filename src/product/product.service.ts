import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CsvService } from '../common/csv/csv.service';
import { LLMService } from 'src/llm/llm.service';
import { generateEnhanceDescriptionPrompt } from './prompts/enhance-description.prompt';
import { ProductTransformer } from './product.transformer';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private llmService: LLMService,
    private csvService: CsvService,
    private productTransformer: ProductTransformer,
  ) {}

  /**
   * Import products from a CSV file, parse the data, transform it to JSON, update vendors and manufacturers, save to MongoDB, and enhance descriptions.
   *
   * @param {string} filePath - The path to the CSV file to import
   * @return {Promise<void>} A Promise that resolves when the import process is complete
   */
  async importProductsFromCSV(filePath: string): Promise<void> {
    this.logger.debug('Starting import process');
    const products = await this.csvService.parseCSV(filePath);
    const productJson = this.productTransformer.convertToJSON(products);
    await this.updateVendorsAndManufacturers(productJson);
    await this.saveToMongo(productJson);
    await this.enhanceDescriptions(productJson, 'gpt4');
  }

  private async updateVendorsAndManufacturers(products: any[]): Promise<void> {
    // Implement vendor and manufacturer update logic
    // suppose there is manufacturer and vendor collection in the database
  }

  /**
   * Saves the given array of products to MongoDB using bulkWrite.
   *
   * @param {Partial<Product>[]} products - The array of products to save.
   * @return {Promise<void>} A Promise that resolves when the save operation is complete.
   */
  private async saveToMongo(products: Partial<Product>[]): Promise<void> {
    const bulkOps = products.map((product) => ({
      updateOne: {
        filter: { productId: product.productId },
        update: { $set: product },
        upsert: true,
      },
    }));

    if (bulkOps.length > 0) {
      await this.productModel.bulkWrite(bulkOps);
    }
  }

  // NOTE: can be enhanced by using bull queue for batch processing
  private async enhanceDescriptions(
    products: Product[],
    strategyName = 'gpt4',
  ): Promise<void> {
    const strategy = this.llmService.setStrategy(strategyName);
    const enhancedProducts = products.slice(0, 10); // limit the number of products to enhance
    for (const product of enhancedProducts) {
      const prompt = generateEnhanceDescriptionPrompt(product);
      const enhancedDescription = await strategy.executePrompt(prompt);
      product.description = enhancedDescription;
    }
    return this.saveToMongo(enhancedProducts);
  }
}
