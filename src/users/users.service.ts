import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../entities';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.RECORD_NOT_FOUND('User', id));
    }

    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const newUser: UserEntity = this.usersRepository.create(user);

    return await this.usersRepository.save(newUser);
  }

  async updateUser(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.RECORD_NOT_FOUND('User', id));
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(ERROR_MESSAGES.OLD_PASSWORD_IS_WRONG);
    }

    user.password = newPassword;
    return await this.usersRepository.save(user);
  }

  async deleteUserById(id: string): Promise<void> {
    const user: UserEntity = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.RECORD_NOT_FOUND('User', id));
    }

    await this.usersRepository.delete(id);
  }
}
