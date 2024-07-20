import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { nanoid } from 'nanoid';
import { UtilService } from 'src/common/utils/util.service';

@Injectable()
export class ProductTransformer {
  constructor(private utilService: UtilService) {}
  convertToJSON(products: any[]): Product[] {
    const groupedProducts = products.reduce((acc, product) => {
      const { productId } = product;
      if (!acc[productId]) {
        acc[productId] = {
          docId: nanoid(),
          productId: product.productId,
          name: product.name,
          type: product.type,
          shortDescription: product.shortDescription,
          description: product.description,
          vendorId: product.vendorId,
          storefrontPriceVisibility: product.storefrontPriceVisibility,
          variants: [],
          options: this.utilService.jsonParser({
            data: product.options || '[]',
            silent: true,
          }),
          availability: product.availability,
          isFragile: product.isFragile === 'true',
          published: product.published === 'true',
          isTaxable: product.isTaxable === 'true',
          images: this.utilService.jsonParser({
            data: product.productImages || '[]',
            silent: true,
          }),
          categoryName: product.categoryName,
        };
      }

      acc[productId].variants.push({
        id: product.variantId,
        available: product.variantAvailable === 'true',
        attributes: product.variantAttributes
          ? this.utilService.jsonParser({
              data: product.variantAttributes,
              silent: true,
            })
          : {},
        cost: parseFloat(product.variantCost),
        currency: product.variantCurrency,
        depth: product.variantDepth
          ? parseFloat(product.variantDepth)
          : undefined,
        description: product.variantDescription,
        dimensionUom: product.variantDimensionUom,
        height: product.variantHeight
          ? parseFloat(product.variantHeight)
          : undefined,
        width: product.variantWidth
          ? parseFloat(product.variantWidth)
          : undefined,
        manufacturerItemCode: product.variantManufacturerItemCode,
        manufacturerItemId: product.variantManufacturerItemId,
        packaging: product.variantPackaging,
        price: parseFloat(product.variantPrice),
        volume: product.variantVolume
          ? parseFloat(product.variantVolume)
          : undefined,
        volumeUom: product.variantVolumeUom,
        weight: product.variantWeight
          ? parseFloat(product.variantWeight)
          : undefined,
        weightUom: product.variantWeightUom,
        optionName: product.variantOptionName,
        optionsPath: product.variantOptionsPath,
        optionItemsPath: product.variantOptionItemsPath,
        sku: product.variantSku,
        active: product.variantActive === 'true',
        images: this.utilService.jsonParser({
          data: product.variantImages || '[]',
          silent: true,
        }),
        itemCode: product.variantItemCode,
      });

      return acc;
    }, {});

    return Object.values(groupedProducts);
  }
}
