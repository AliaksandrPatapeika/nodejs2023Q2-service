import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity, UserEntity } from '../entities';
import { JwtTokens } from '../interfaces';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async signup(user: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  async login(user: UserEntity): Promise<JwtTokens> {
    const accessToken = 'mockAccessToken';
    const refreshToken = 'mockRefreshToken';

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<JwtTokens> {
    const accessToken = 'mockAccessToken';
    return { accessToken, refreshToken };
  }
}
