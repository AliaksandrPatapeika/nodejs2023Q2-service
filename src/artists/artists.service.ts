import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBService } from 'src/db/db.service';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DBService) {}

  getAllArtists() {
    return this.dbService.getAllArtists();
  }

  getArtistById(id: string, fav = false) {
    const artist = this.dbService.getArtistById(id);

    if (!artist) {
      const Exception = fav ? UnprocessableEntityException : NotFoundException;

      throw new Exception(ERROR_MESSAGES.RECORD_NOT_FOUND('Artist', id));
    }

    return artist;
  }

  createArtist(artist: CreateArtistDto) {
    const newArtist = { id: uuidv4(), ...artist };
    this.dbService.createArtist(newArtist);
    return newArtist;
  }

  updateArtist(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = this.getArtistById(id);

    if (name) {
      artist.name = name;
    }

    if (grammy !== undefined) {
      artist.grammy = grammy;
    }

    return artist;
  }

  deleteArtistById(id: string) {
    this.getArtistById(id);
    this.dbService.deleteArtistById(id);
    const tracks = this.dbService.getAllTracksByArtistId(id);
    const albums = this.dbService.getAllAlbumsByArtistId(id);

    if (tracks) {
      tracks.map((track) => {
        track.artistId = null;
        return track;
      });
    }

    if (albums) {
      albums.map((album) => {
        album.artistId = null;
        return album;
      });
    }

    this.dbService.deleteFavoriteArtistById(id);
  }
}
