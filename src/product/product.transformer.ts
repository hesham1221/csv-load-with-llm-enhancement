import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class ProductTransformer {
  convertToJSON(products: any[]): Product[] {
    const groupedProducts = products.reduce((acc, product) => {
      const { ProductID, ItemID, ItemDescription, Packaging } = product;
      if (!acc[ProductID]) {
        acc[ProductID] = {
          productId: ProductID,
          variants: [],
          docId: nanoid(),
        };
      }
      acc[ProductID].variants.push({
        itemId: ItemID,
        description: ItemDescription,
        packaging: Packaging,
        id: nanoid(),
      });
      return acc;
    }, {});

    return Object.values(groupedProducts);
  }
}
