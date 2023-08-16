import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '../entities';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    forwardRef(() => UsersModule),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    ConfigService,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
