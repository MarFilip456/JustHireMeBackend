import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UopDocument = Uop & Document;

@Schema()
export class Uop {
  @Prop()
  allowUop: boolean;
  @Prop()
  minSalary: number;
  @Prop()
  maxSalary: number;
}

export const UopSchema = SchemaFactory.createForClass(Uop);
