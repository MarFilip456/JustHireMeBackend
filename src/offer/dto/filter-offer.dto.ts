export class FilterOfferDto {
  search?: string;
  location?: string;
  mainField?: string;
  minSalary?: number;
  maxSalary?: number;
  employment?: string;
  experience?: string;
  undisclosed?: boolean;
  remote?: boolean;
}
