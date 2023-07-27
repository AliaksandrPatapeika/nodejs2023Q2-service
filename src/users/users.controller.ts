import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UserResponse } from 'src/interfaces';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { uuidVersion } from 'src/constants';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users.
   * @returns {UserResponse[]} Array of users.
   */
  @Get()
  getAllUsers(): UserResponse[] {
    return this.usersService.getAllUsers();
  }

  /**
   * Get a user by its ID.
   * @param {string} id - User ID.
   * @returns {UserResponse} The user.
   */
  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): UserResponse {
    return this.usersService.getUserById(id);
  }

  /**
   * Create a new user.
   * @param {CreateUserDto} createUserDto - User data.
   * @returns {UserResponse} The newly created user.
   */
  @Post()
  @HttpCode(StatusCodes.CREATED)
  createUser(@Body() createUserDto: CreateUserDto): UserResponse {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Update a user by its ID.
   * @param {string} id - User ID.
   * @param {UpdateUserDto} updateUserDto - Updated user data.
   * @returns {UserResponse} The updated user.
   */
  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserResponse {
    return this.usersService.updateUser(id, updateUserDto);
  }

  /**
   * Delete a user by its ID.
   * @param {string} id - User ID.
   * @returns {void}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteUserById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ) {
    this.usersService.deleteUserById(id);
  }
}
