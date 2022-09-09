import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/auth/user-role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop({ unique: true, index: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  role: UserRole[];
  @Prop()
  experience: string;
  @Prop()
  gitHubUrl: string;
  @Prop()
  linkedInUrl: string;
  @Prop()
  location: string;
  @Prop()
  mainLang: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  logoUrl: string;
  @Prop()
  aboutYou: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
