import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type B2bDocument = B2b & Document;

@Schema()
export class B2b {
  @Prop()
  allowB2b: boolean;
  @Prop()
  minSalary: number;
  @Prop()
  maxSalary: number;
}
export const B2bSchema = SchemaFactory.createForClass(B2b);
