import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Variant, VariantSchema } from './variant.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  docId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  shortDescription?: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  vendorId: string;

  @Prop({ required: true })
  manufacturerId: string;

  @Prop({ required: true })
  storefrontPriceVisibility: string;

  @Prop({ type: [VariantSchema], required: true })
  variants: Variant[];

  @Prop({ type: [{ id: String, name: String, value: String }], required: true })
  options: {
    id: string;
    name: string;
    value: string;
  }[];

  @Prop({ required: true })
  availability: string;

  @Prop({ required: true })
  isFragile: boolean;

  @Prop({ required: true })
  published: string;

  @Prop({ required: true })
  isTaxable: boolean;

  @Prop({
    type: [{ fileName: String, cdnLink: String, i: Number, alt: String }],
  })
  images: {
    fileName: string;
    cdnLink: string;
    i: number;
    alt?: string;
  }[];

  @Prop({ required: true })
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
