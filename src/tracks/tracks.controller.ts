import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { StatusCodes } from 'http-status-codes';
import { Track } from 'src/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  /**
   * Get all tracks.
   * @returns {Track[]} Array of tracks.
   */
  @Get()
  getAllTracks(): Track[] {
    return this.tracksService.getAllTracks();
  }

  /**
   * Get a track by its ID.
   * @param {string} id - Track ID.
   * @returns {Track} The track.
   */
  @Get(':id')
  getTrackById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Track {
    return this.tracksService.getTrackById(id);
  }

  /**
   * Create a new track.
   * @param {CreateTrackDto} createTrack - Track data.
   * @returns {Track} The newly created track.
   */
  @Post()
  @HttpCode(StatusCodes.CREATED)
  createTrack(@Body() createTrack: CreateTrackDto): Track {
    return this.tracksService.createTrack(createTrack);
  }

  /**
   * Update a track by its ID.
   * @param {string} id - Track ID.
   * @param {UpdateTrackDto} updateTrack - Updated track data.
   * @returns {Track} The updated track.
   */
  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrack: UpdateTrackDto,
  ): Track {
    return this.tracksService.updateTrack(id, updateTrack);
  }

  /**
   * Delete a track by its ID.
   * @param {string} id - Track ID.
   * @returns {void}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTrackById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.tracksService.deleteTrackById(id);
  }
}
