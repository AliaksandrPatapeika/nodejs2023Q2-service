import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Module({
  controllers: [FavoritesController],
  // providers: [FavoritesService, TracksService, ArtistsService, AlbumsService],
  providers: [FavoritesService],
})
export class FavoritesModule {}
