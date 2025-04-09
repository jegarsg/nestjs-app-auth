import { Injectable, Inject, BadRequestException, UnauthorizedException} from '@nestjs/common';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { hashPassword , comparePassword} from '@shared/utils/password.util';
import { generateUsername } from '@shared/utils/username.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepository) 
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
) {}

  async register(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new BadRequestException('Email already used');

    if (!/^\d{10,12}$/.test(dto.phone)) {
      throw new BadRequestException('Phone must be 10–12 digits');
    }

    const formattedPhone = `+62${dto.phone.slice(-10)}`;
    const existingUserByPhone = await this.userRepository.findByPhone(formattedPhone);
    if (existingUserByPhone) {
      throw new BadRequestException('Phone number already used');
    }

    const user = new User();
    user.full_name = dto.fullname;
    user.user_name = generateUsername(dto.fullname);
    user.email = dto.email;
    user.phone = formattedPhone;
    user.password = await hashPassword(dto.password);
    user.created_at = new Date();
    user.created_by=dto.email;
    user.modified_at= new Date();
    user.modified_by=dto.email;
    user.is_deleted=false
    user.is_active = false;

    return this.userRepository.save(user);
  }

  async login(dto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await comparePassword(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.user_id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
  
}


