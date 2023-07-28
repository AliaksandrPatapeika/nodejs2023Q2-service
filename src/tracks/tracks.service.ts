import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DBService) {}

  getAllTracks() {
    return this.dbService.getAllTracks();
  }

  getTrackById(id: string, fav = false) {
    const track = this.dbService.getTrackById(id);

    if (!track) {
      const Exception = fav ? UnprocessableEntityException : NotFoundException;

      throw new Exception(ERROR_MESSAGES.RECORD_NOT_FOUND('Track', id));
    }

    return track;
  }

  createTrack(track: CreateTrackDto) {
    const newTrack = { id: uuidv4(), ...track };
    this.dbService.createTrack(newTrack);
    return newTrack;
  }

  updateTrack(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ) {
    const track = this.getTrackById(id);

    if (name) {
      track.name = name;
    }

    if (duration !== undefined) {
      track.duration = duration;
    }

    if (artistId !== undefined) {
      track.artistId = artistId;
    }

    if (albumId !== undefined) {
      track.albumId = albumId;
    }

    return track;
  }

  deleteTrackById(id: string) {
    this.getTrackById(id);
    this.dbService.deleteTrackById(id);
    this.dbService.deleteFavoriteTrackById(id);
  }
}
