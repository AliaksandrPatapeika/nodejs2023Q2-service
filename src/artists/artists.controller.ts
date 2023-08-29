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
import { ArtistEntity } from '../entities';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { uuidVersion } from 'src/constants';

/**
 * Controller responsible for managing artists.
 */
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  /**
   * Get all artists.
   * @returns {Promise<ArtistEntity[]>} An array of artists.
   */
  @Get()
  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistsService.getAllArtists();
  }

  /**
   * Get an artist by its ID.
   * @param {string} id - Artist ID.
   * @returns {Promise<ArtistEntity>} The requested artist.
   */
  @Get(':id')
  async getArtistById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<ArtistEntity> {
    return this.artistsService.getArtistById(id);
  }

  /**
   * Create a new artist.
   * @param {CreateArtistDto} createArtistDto - Artist data.
   * @returns {Promise<ArtistEntity>} The newly created artist.
   */
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.createArtist(createArtistDto);
  }

  /**
   * Update an artist by its ID.
   * @param {string} id - Artist ID.
   * @param {UpdateArtistDto} updateArtistDto - Updated artist data.
   * @returns {Promise<ArtistEntity>} The updated artist.
   */
  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  /**
   * Delete an artist by its ID.
   * @param {string} id - Artist ID.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtistById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.artistsService.deleteArtistById(id);
  }
}
