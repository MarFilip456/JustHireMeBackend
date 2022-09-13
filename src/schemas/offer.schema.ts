import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Appliers } from './offer/appliers.schema';
import { Date } from './offer/date.schema';
import { Employment } from './offer/employment/employment.schema';
import { TechStack } from './offer/techStack.schema';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop()
  id: string;
  @Prop()
  addedBy: string;
  @Prop()
  appliers: [Appliers];
  @Prop()
  companySize: number;
  @Prop()
  companyName: string;
  @Prop()
  date: Date;
  @Prop()
  employment: Employment;
  @Prop()
  expLevel: string;
  @Prop()
  fullyRemote: boolean;
  @Prop()
  jobPosition: string;
  @Prop()
  location: string;
  @Prop()
  lat: number;
  @Prop()
  lng: number;
  @Prop()
  logo: string;
  @Prop()
  mainField: string;
  @Prop()
  techStack: [TechStack];
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
