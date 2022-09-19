import {
  Contains,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(6)
  @Contains('@')
  @IsNotEmpty()
  @IsEmail()
  emailInput: string;
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/)
  @Matches(/[a-z]/)
  @Matches(/[0-9]/)
  passwordInput: string;
}
