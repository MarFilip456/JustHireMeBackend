import { IsInt, IsNumber, IsUrl } from 'class-validator';
import { Date } from '../../schemas/offer/date.schema';
import { Employment } from '../../schemas/offer/employment/employment.schema';
import { TechStack } from '../../schemas/offer/techStack.schema';

export class CreateOfferDto {
  /* @IsNumber()
  @IsInt() */
  companySize: string;
  companyName: string;
  date: Date;
  employment: Employment;
  expLevel: string;
  fullyRemote: boolean;
  jobPosition: string;
  location: string;
  lat: number;
  lng: number;
  /*  @IsUrl() */
  logo: string;
  mainLang: string;
  techStack: [TechStack];
}
