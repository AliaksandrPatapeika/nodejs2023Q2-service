import { forwardRef, Module } from '@nestjs/common';
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
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, LocalStrategy],
  exports: [TypeOrmModule],
})
export class AuthModule {}
