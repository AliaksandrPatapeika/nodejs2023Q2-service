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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // /**
  //  * Get all favorite items.
  //  * @returns {FavoritesResponse} Favorites response containing lists of favorite tracks, artists, and albums.
  //  */
  // @Get()
  // getAllFavorites(): FavoritesResponse {
  //   return this.favoritesService.getAllFavorites();
  // }
  //
  // /**
  //  * Create a favorite track with the given ID.
  //  * @param {string} id - Track ID.
  //  */
  // @Post('track/:id')
  // @HttpCode(StatusCodes.CREATED)
  // createTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   return this.favoritesService.createTrack(id);
  // }
  //
  // /**
  //  * Create a favorite artist with the given ID.
  //  * @param {string} id - Artist ID.
  //  */
  // @Post('artist/:id')
  // @HttpCode(StatusCodes.CREATED)
  // createArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   return this.favoritesService.createArtist(id);
  // }
  //
  // /**
  //  * Create a favorite album with the given ID.
  //  * @param {string} id - Album ID.
  //  */
  // @Post('album/:id')
  // @HttpCode(StatusCodes.CREATED)
  // createAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   return this.favoritesService.createAlbum(id);
  // }
  //
  // /**
  //  * Delete a favorite track with the given ID.
  //  * @param {string} id - Track ID.
  //  */
  // @Delete('track/:id')
  // @HttpCode(StatusCodes.NO_CONTENT)
  // deleteTrackById(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ) {
  //   this.favoritesService.deleteTrackById(id);
  // }
  //
  // /**
  //  * Delete a favorite artist with the given ID.
  //  * @param {string} id - Artist ID.
  //  */
  // @Delete('artist/:id')
  // @HttpCode(StatusCodes.NO_CONTENT)
  // deleteArtistById(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ) {
  //   this.favoritesService.deleteArtistById(id);
  // }
  //
  // /**
  //  * Delete a favorite album with the given ID.
  //  * @param {string} id - Album ID.
  //  */
  // @Delete('album/:id')
  // @HttpCode(StatusCodes.NO_CONTENT)
  // deleteAlbumById(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ) {
  //   this.favoritesService.deleteAlbumById(id);
  // }
}
