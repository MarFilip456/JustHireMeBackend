import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DateDocument = Date & Document;

@Schema()
export class Date {
  @Prop()
  day: number;
  @Prop()
  month: number;
  @Prop()
  year: number;
}

export const UopSchema = SchemaFactory.createForClass(Date);
