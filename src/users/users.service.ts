import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserResponse } from 'src/interfaces';
import { DBService } from 'src/db/db.service';
import { omit } from 'lodash';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DBService) {}

  getAllUsers(): UserResponse[] {
    return this.dbService.getAllUsers().map((user) => omit(user, 'password'));
  }

  getUserById(id: string): UserResponse {
    const user = this.dbService.getUserById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.RECORD_NOT_FOUND('User', id));
    }

    return omit(user, 'password');
  }

  createUser(user: CreateUserDto): UserResponse {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    this.dbService.createUser(newUser);
    return omit(newUser, 'password');
  }

  updateUser(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = this.dbService.getUserById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.RECORD_NOT_FOUND('User', id));
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(ERROR_MESSAGES.OLD_PASSWORD_IS_WRONG);
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();

    return omit(user, 'password');
  }

  deleteUserById(id: string) {
    const user = this.dbService.getUserById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.RECORD_NOT_FOUND('User', id));
    }

    this.dbService.deleteUserById(id);
  }
}
