import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { v4 as uuid } from 'uuid';
import { UserRole } from './user-role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private authModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async devSignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { emailInput, passwordInput } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(passwordInput, salt);
    try {
      await this.authModel.create({
        id: uuid(),
        email: emailInput,
        password: hashedPassword,
        role: [UserRole.User],
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Email already exists in database, please sign in.',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async empSignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { emailInput, passwordInput } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(passwordInput, salt);
    try {
      await this.authModel.create({
        id: uuid(),
        email: emailInput,
        password: hashedPassword,
        role: [UserRole.Admin],
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Email already exists in database, please sign in.',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; userRole: string; userId: string }> {
    const { emailInput, passwordInput } = authCredentialsDto;
    const user = await this.authModel.findOne({ email: emailInput });

    if (user && (await bcrypt.compare(passwordInput, user.password))) {
      const payload: JwtPayload = { emailInput };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken, userRole: user.role[0], userId: user.id };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
  async getUserById(user: User): Promise<User> {
    const found = await this.authModel.findOne({ id: user.id });
    if (!found) {
      throw new NotFoundException(`Developer with ID "${user.id}" not found`);
    }
    return found;
  }
  async updateUserInfo(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const filter = { id: userId };
    const updateObject = { ...updateUserDto };
    const user = await this.authModel.findOneAndUpdate(filter, updateObject, {
      new: true,
    });
    return user;
  }
}
