import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BTechStackDocument = TechStack & Document;

@Schema()
export class TechStack {
  @Prop()
  id: string;
  @Prop()
  lang: string;
  @Prop()
  value: string;
}

export const TechStackSchema = SchemaFactory.createForClass(TechStack);
