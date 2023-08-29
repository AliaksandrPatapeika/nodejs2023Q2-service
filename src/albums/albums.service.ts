import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity, ArtistEntity } from '../entities';
import { ArtistsService } from '../artists/artists.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
  ) {}

  async getAllAlbums(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getAlbumById(
    id: string,
    isFavorites: boolean = false,
  ): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.albumRepository.findOneBy({ id });

    if (!album) {
      const Exception = isFavorites
        ? UnprocessableEntityException
        : NotFoundException;

      throw new Exception(ERROR_MESSAGES.RECORD_NOT_FOUND('Album', id));
    }

    return album;
  }

  async createAlbum({
    name,
    year,
    artistId,
  }: CreateAlbumDto): Promise<AlbumEntity> {
    const artist: ArtistEntity = artistId
      ? await this.artistService.getArtistById(artistId)
      : null;
    const newAlbum: AlbumEntity = this.albumRepository.create({
      name,
      year,
      artist,
    });

    return await this.albumRepository.save(newAlbum);
  }

  async updateAlbum(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.getAlbumById(id);

    if (name) {
      album.name = name;
    }

    if (year) {
      album.year = year;
    }

    if (artistId) {
      album.artist = artistId
        ? await this.artistService.getArtistById(artistId)
        : null;
    }

    return await this.albumRepository.save(album);
  }

  async deleteAlbumById(id: string): Promise<void> {
    const album: AlbumEntity = await this.getAlbumById(id);
    await this.albumRepository.remove(album);
  }
}
