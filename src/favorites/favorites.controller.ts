import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesResponse } from 'src/interfaces';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';
import { uuidVersion } from 'src/constants';

/**
 * Controller responsible for managing favorite items.
 */
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  /**
   * Get all favorite items.
   * @returns {Promise<FavoritesResponse>} Favorites response containing lists of favorite tracks, artists, and albums.
   */
  @Get()
  async getFavorites(): Promise<FavoritesResponse> {
    return this.favoritesService.getFavorites();
  }

  /**
   * Create a favorite track with the given ID.
   * @param {string} id - Track ID.
   */
  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async addTrackById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.favoritesService.addTrackById(id);
  }

  /**
   * Create a favorite artist with the given ID.
   * @param {string} id - Artist ID.
   */
  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async addArtistById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.favoritesService.addArtistById(id);
  }

  /**
   * Create a favorite album with the given ID.
   * @param {string} id - Album ID.
   */
  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async addAlbumById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.favoritesService.addAlbumById(id);
  }

  /**
   * Delete a favorite track with the given ID.
   * @param {string} id - Track ID.
   */
  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrackById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteTrackById(id);
  }

  /**
   * Delete a favorite artist with the given ID.
   * @param {string} id - Artist ID.
   */
  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtistById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteArtistById(id);
  }

  /**
   * Delete a favorite album with the given ID.
   * @param {string} id - Album ID.
   */
  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbumById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteAlbumById(id);
  }
}
