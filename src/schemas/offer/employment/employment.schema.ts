import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { B2b, B2bSchema } from './b2b.schema';
import { Uop, UopSchema } from './uop.schema';

export type EmploymentDocument = Employment & Document;

@Schema()
export class Employment {
  @Prop()
  undisclosed: boolean;
  @Prop({ type: B2bSchema })
  b2b: B2b;
  @Prop({ type: UopSchema })
  uop: Uop;
}

export const EmploymentSchema = SchemaFactory.createForClass(Employment);
