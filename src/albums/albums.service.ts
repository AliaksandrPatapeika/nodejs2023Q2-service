import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class AlbumsService {
  constructor(private readonly dbService: DBService) {}

  getAllAlbums() {
    return this.dbService.getAllAlbums();
  }

  getAlbumById(id: string, fav = false) {
    const album = this.dbService.getAlbumById(id);

    if (!album) {
      const Exception = fav ? UnprocessableEntityException : NotFoundException;

      throw new Exception(ERROR_MESSAGES.RECORD_NOT_FOUND('Album', id));
    }

    return album;
  }

  createAlbum(album: CreateAlbumDto) {
    const newAlbum = { id: uuidv4(), ...album };

    if (!album.artistId) {
      newAlbum.artistId = null;
    }

    this.dbService.createAlbum(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = this.getAlbumById(id);

    if (name) {
      album.name = name;
    }

    if (year) {
      album.year = year;
    }

    if (artistId) {
      album.artistId = artistId;
    }

    return album;
  }

  deleteAlbumById(id: string) {
    this.getAlbumById(id);
    this.dbService.deleteAlbumById(id);
  }
}
