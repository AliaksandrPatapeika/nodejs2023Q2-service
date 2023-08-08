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
import { Album } from 'src/interfaces';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { uuidVersion } from 'src/constants';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  /**
   * Get all albums.
   * @returns {Album[]} Array of albums.
   */
  @Get()
  getAllAlbums(): Album[] {
    return this.albumsService.getAllAlbums();
  }

  /**
   * Get an album by its ID.
   * @param {string} id - Album ID.
   * @returns {Album} The album.
   */
  @Get(':id')
  getAlbumById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Album {
    return this.albumsService.getAlbumById(id);
  }

  /**
   * Create a new album.
   * @param {CreateAlbumDto} createAlbum - Album data.
   * @returns {Album} The newly created album.
   */
  @Post()
  @HttpCode(StatusCodes.CREATED)
  createAlbum(@Body() createAlbum: CreateAlbumDto): Album {
    return this.albumsService.createAlbum(createAlbum);
  }

  /**
   * Update an album by its ID.
   * @param {string} id - Album ID.
   * @param {UpdateAlbumDto} updateAlbumDto - Updated album data.
   * @returns {Album} The updated album.
   */
  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  /**
   * Delete an album by its ID.
   * @param {string} id - Album ID.
   * @returns {void}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteAlbumById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): void {
    this.albumsService.deleteAlbumById(id);
  }
}
