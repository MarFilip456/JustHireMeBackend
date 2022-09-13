import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { B2b } from './b2b.schema';
import { Uop } from './uop.schema';

export type EmploymentDocument = Employment & Document;

@Schema()
export class Employment {
  @Prop()
  undisclosed: boolean;
  @Prop()
  b2b: B2b;
  @Prop()
  uop: Uop;
}

export const EmploymentSchema = SchemaFactory.createForClass(Employment);
