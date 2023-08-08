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
import { AlbumEntity } from '../entities';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { uuidVersion } from 'src/constants';

/**
 * Controller responsible for managing albums.
 */
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  /**
   * Get all albums.
   * @returns {Promise<AlbumEntity[]>} An array of albums.
   */
  @Get()
  async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumsService.getAllAlbums();
  }

  /**
   * Get an album by its ID.
   * @param {string} id - Album ID.
   * @returns {Promise<AlbumEntity>} The requested album.
   */
  @Get(':id')
  async getAlbumById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<AlbumEntity> {
    return this.albumsService.getAlbumById(id);
  }

  /**
   * Create a new album.
   * @param {CreateAlbumDto} createAlbumDto - Album data.
   * @returns {Promise<AlbumEntity>} The newly created album.
   */
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  /**
   * Update an album by its ID.
   * @param {string} id - Album ID.
   * @param {UpdateAlbumDto} updateAlbumDto - Updated album data.
   * @returns {Promise<AlbumEntity>} The updated album.
   */
  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  /**
   * Delete an album by its ID.
   * @param {string} id - Album ID.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbumById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.albumsService.deleteAlbumById(id);
  }
}
