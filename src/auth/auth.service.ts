import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { TokenEntity, UserEntity } from '../entities';
import { JwtTokens } from '../interfaces';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ERROR_MESSAGES, JWT_CONSTANTS } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @Inject(forwardRef(() => ConfigService))
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup({ login, password }: CreateUserDto): Promise<UserEntity> {
    const salt: number = Number(
      this.configService.get(JWT_CONSTANTS.CRYPT_SALT),
    );
    const passwordHashed: string = await hash(password, salt);

    return await this.userService.createUser({
      login,
      password: passwordHashed,
    });
  }

  async validateUser({
    login,
    password,
  }: CreateUserDto): Promise<UserEntity | undefined> {
    const user: UserEntity | undefined = await this.userService.getUserByLogin(
      login,
    );

    if (user && compareSync(password, user.password)) {
      return user;
    }
  }

  async login(user: UserEntity): Promise<JwtTokens> {
    const { login, id }: UserEntity = user;
    const { accessToken, refreshToken }: JwtTokens = await this.generateTokens(
      login,
      id,
    );

    await this.storeRefreshToken(id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<JwtTokens> {
    const data = this.jwtService.decode(refreshToken) as {
      userId: string;
      login: string;
    };

    if (!data) {
      throw new ForbiddenException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
    }

    const { login, userId } = data;
    const tokens: JwtTokens = await this.generateTokens(login, userId);
    await this.storeRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async generateTokens(login: string, id: string): Promise<JwtTokens> {
    const payload = { login, userId: id };

    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(JWT_CONSTANTS.JWT_SECRET_KEY),
      expiresIn: this.configService.get(JWT_CONSTANTS.TOKEN_EXPIRE_TIME),
    });

    const refreshToken: string = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(JWT_CONSTANTS.JWT_SECRET_REFRESH_KEY),
      expiresIn: this.configService.get(
        JWT_CONSTANTS.TOKEN_REFRESH_EXPIRE_TIME,
      ),
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<TokenEntity> {
    const salt: number = Number(
      this.configService.get(JWT_CONSTANTS.CRYPT_SALT),
    );
    const refreshTokenHashed: string = await hash(refreshToken, salt);
    const existingToken: TokenEntity = await this.tokenRepository.findOneBy({
      userId,
    });

    if (existingToken) {
      existingToken.refreshToken = refreshTokenHashed;
      return await this.tokenRepository.save(existingToken);
    }

    const newToken: TokenEntity = this.tokenRepository.create({
      refreshToken: refreshTokenHashed,
      userId,
    });

    return await this.tokenRepository.save(newToken);
  }
}
