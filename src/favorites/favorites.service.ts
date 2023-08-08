import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { DBService } from 'src/db/db.service';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class FavoritesService {
  constructor(
    private dbService: DBService,
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}

  getAllFavorites() {
    const { tracks, artists, albums } = this.dbService.getAllFavorites();

    const tracksArr =
      tracks && tracks.length
        ? tracks.map((id) => this.tracksService.getTrackById(id))
        : [];

    const artistsArr =
      artists && artists.length
        ? artists.map((id) => this.artistsService.getArtistById(id))
        : [];

    const albumsArr =
      albums && albums.length
        ? albums.map((id) => this.albumsService.getAlbumById(id))
        : [];

    return { tracks: tracksArr, albums: albumsArr, artists: artistsArr };
  }

  createTrack(trackId: string) {
    this.tracksService.getTrackById(trackId, true);
    this.dbService.createFavoriteTrack(trackId);
  }

  createArtist(artistId: string) {
    this.artistsService.getArtistById(artistId, true);
    this.dbService.createFavoriteArtist(artistId);
  }

  createAlbum(albumId: string) {
    this.albumsService.getAlbumById(albumId, true);
    this.dbService.createFavoriteAlbum(albumId);
  }

  deleteTrackById(trackId: string) {
    const favTrack = this.dbService.getFavoriteTrackById(trackId);

    if (!favTrack) {
      throw new NotFoundException(
        ERROR_MESSAGES.RECORD_NOT_IN_FAVORITES('Track', trackId),
      );
    }

    this.dbService.deleteFavoriteTrackById(trackId);
  }

  deleteArtistById(artistId: string) {
    const favArtist = this.dbService.getFavoriteArtistById(artistId);

    if (!favArtist) {
      throw new NotFoundException(
        ERROR_MESSAGES.RECORD_NOT_IN_FAVORITES('Artist', artistId),
      );
    }

    this.dbService.deleteFavoriteArtistById(artistId);
  }

  deleteAlbumById(albumId: string) {
    const favAlbum = this.dbService.getFavoriteAlbumById(albumId);

    if (!favAlbum) {
      throw new NotFoundException(
        ERROR_MESSAGES.RECORD_NOT_IN_FAVORITES('Album', albumId),
      );
    }

    this.dbService.deleteFavoriteAlbumById(albumId);
  }
}
