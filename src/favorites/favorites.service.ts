import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FavoritesEntity,
  TrackEntity,
  ArtistEntity,
  AlbumEntity,
} from '../entities';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  ) {}

  async getFavorites(): Promise<FavoritesEntity> {
    const [favorites] = await this.favoritesRepository.find();
    if (!favorites) {
      return await this.favoritesRepository.save(
        this.favoritesRepository.create(),
      );
    }
    return favorites;
  }

  async modifyFavoriteList(
    favorites: FavoritesEntity,
    items: string,
    itemToAdd: any,
  ): Promise<void> {
    const itemIndex = favorites[items].findIndex(
      (item): boolean => item.id === itemToAdd.id,
    );

    if (itemIndex !== -1) {
      favorites[items].splice(itemIndex, 1);
    } else {
      favorites[items].push(itemToAdd);
    }

    await this.favoritesRepository.save(favorites);
  }

  async addTrackById(trackId: string): Promise<void> {
    const track: TrackEntity = await this.tracksService.getTrackById(
      trackId,
      true,
    );
    const favorites: FavoritesEntity = await this.getFavorites();
    await this.modifyFavoriteList(favorites, 'tracks', track);
  }

  async addArtistById(artistId: string): Promise<void> {
    const artist: ArtistEntity = await this.artistsService.getArtistById(
      artistId,
      true,
    );
    const favorites: FavoritesEntity = await this.getFavorites();
    await this.modifyFavoriteList(favorites, 'artists', artist);
  }

  async addAlbumById(albumId: string): Promise<void> {
    const album: AlbumEntity = await this.albumsService.getAlbumById(
      albumId,
      true,
    );
    const favorites: FavoritesEntity = await this.getFavorites();
    await this.modifyFavoriteList(favorites, 'albums', album);
  }

  async deleteItemById(
    favorites: FavoritesEntity,
    items: string,
    id: string,
    type: string,
  ): Promise<void> {
    const itemIndex = favorites[items].findIndex(
      (item): boolean => item.id === id,
    );

    if (itemIndex !== -1) {
      favorites[items].splice(itemIndex, 1);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new NotFoundException(
        ERROR_MESSAGES.RECORD_NOT_IN_FAVORITES(type, id),
      );
    }
  }

  async deleteTrackById(trackId: string): Promise<void> {
    const favorites: FavoritesEntity = await this.getFavorites();
    await this.deleteItemById(favorites, 'tracks', trackId, 'Track');
  }

  async deleteArtistById(artistId: string): Promise<void> {
    const favorites: FavoritesEntity = await this.getFavorites();
    await this.deleteItemById(favorites, 'artists', artistId, 'Artist');
  }

  async deleteAlbumById(albumId: string): Promise<void> {
    const favorites: FavoritesEntity = await this.getFavorites();
    await this.deleteItemById(favorites, 'albums', albumId, 'Album');
  }
}
