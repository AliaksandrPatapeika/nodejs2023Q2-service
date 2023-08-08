import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../entities';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getArtistById(
    id: string,
    isFavorites: boolean = false,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      const Exception = isFavorites
        ? UnprocessableEntityException
        : NotFoundException;

      throw new Exception(ERROR_MESSAGES.RECORD_NOT_FOUND('Artist', id));
    }

    return artist;
  }

  async createArtist(artist: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist: ArtistEntity = this.artistRepository.create(artist);

    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist: ArtistEntity = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(
        ERROR_MESSAGES.RECORD_NOT_FOUND('Artist', id),
      );
    }

    if (name) {
      artist.name = name;
    }

    if (grammy !== undefined) {
      artist.grammy = grammy;
    }

    return await this.artistRepository.save(artist);
  }

  async deleteArtistById(id: string): Promise<void> {
    const artist: ArtistEntity = await this.getArtistById(id);
    await this.artistRepository.remove(artist);
  }
}
