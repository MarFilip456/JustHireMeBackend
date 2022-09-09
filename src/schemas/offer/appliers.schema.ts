import { Prop, Schema } from '@nestjs/mongoose';

export type AppliersDocument = Appliers & Document;

@Schema()
export class Appliers {
  @Prop()
  id: string;
  @Prop()
  email: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  logoUrl: string;
  @Prop()
  experience: string;
  @Prop()
  mainLang: string;
  @Prop()
  location: string;
  @Prop()
  aboutYou: string;
  @Prop()
  gitHubUrl: string;
  @Prop()
  linkedInUrl: string;
}
