import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from 'src/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/dev')
  devSignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.devSignUp(authCredentialsDto);
  }
  @Post('/signup/emp')
  empSignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.empSignUp(authCredentialsDto);
  }
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.authService.getUserById(id);
  }
  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.authService.updateUserInfo(id, updateUserDto);
  }
}
