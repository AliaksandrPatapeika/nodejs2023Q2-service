import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UserEntity } from '../entities';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { uuidVersion } from 'src/constants';

/**
 * Controller responsible for managing users.
 */
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users.
   * @returns {Promise<UserEntity[]>} An array of users.
   */
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  /**
   * Get a user by its ID.
   * @param {string} id - User ID.
   * @returns {Promise<UserEntity>} The requested user.
   */
  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  /**
   * Create a new user.
   * @param {CreateUserDto} createUserDto - User data.
   * @returns {Promise<UserEntity>} The newly created user.
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Update a user by its ID.
   * @param {string} id - User ID.
   * @param {UpdateUserDto} updateUserDto - Updated user data.
   * @returns {Promise<UserEntity>} The updated user.
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  /**
   * Delete a user by its ID.
   * @param {string} id - User ID.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteUserById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.usersService.deleteUserById(id);
  }
}
