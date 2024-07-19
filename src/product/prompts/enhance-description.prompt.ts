import { Product } from '../schemas/product.schema';

export const generateEnhanceDescriptionPrompt = (
  product: Product,
) => `You are an expert in medical sales. Your specialty is medical consumables used by hospitals on a daily basis. Your task is to enhance the description of a product based on the information provided.

Product name: ${product.name}
Product description: ${product.description}
Category: ${product.categoryName}

New Description:`;
