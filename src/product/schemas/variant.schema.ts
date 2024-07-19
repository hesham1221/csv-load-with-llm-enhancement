import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Variant extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  available: boolean;

  @Prop({ type: Map, of: String })
  attributes: Map<string, string>;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  currency: string;

  @Prop()
  depth?: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  dimensionUom?: string;

  @Prop()
  height?: number;

  @Prop()
  width?: number;

  @Prop({ required: true })
  manufacturerItemCode: string;

  @Prop({ required: true })
  manufacturerItemId: string;

  @Prop({ required: true })
  packaging: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  volume?: number;

  @Prop()
  volumeUom?: string;

  @Prop()
  weight?: number;

  @Prop()
  weightUom?: string;

  @Prop({ required: true })
  optionName: string;

  @Prop({ required: true })
  optionsPath: string;

  @Prop({ required: true })
  optionItemsPath: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ type: [{ fileName: String, cdnLink: String, i: Number, alt: String }] })
  images: {
    fileName: string;
    cdnLink: string;
    i: number;
    alt?: string;
  }[];

  @Prop({ required: true })
  itemCode: string;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
