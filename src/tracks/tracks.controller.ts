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
import { TrackEntity } from '../entities';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';
import { uuidVersion } from 'src/constants';

/**
 * Controller responsible for managing tracks.
 */
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  /**
   * Get all tracks.
   * @returns {Promise<TrackEntity[]>} An array of tracks.
   */
  @Get()
  async getAllTracks(): Promise<TrackEntity[]> {
    return this.tracksService.getAllTracks();
  }

  /**
   * Get a track by its ID.
   * @param {string} id - Track ID.
   * @returns {Promise<TrackEntity>} The requested track.
   */
  @Get(':id')
  async getTrackById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<TrackEntity> {
    return this.tracksService.getTrackById(id);
  }

  /**
   * Create a new track.
   * @param {CreateTrackDto} createTrackDto - Track data.
   * @returns {Promise<TrackEntity>} The newly created track.
   */
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return this.tracksService.createTrack(createTrackDto);
  }

  /**
   * Update a track by its ID.
   * @param {string} id - Track ID.
   * @param {UpdateTrackDto} updateTrackDto - Updated track data.
   * @returns {Promise<TrackEntity>} The updated track.
   */
  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  /**
   * Delete a track by its ID.
   * @param {string} id - Track ID.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrackById(
    @Param('id', new ParseUUIDPipe({ version: uuidVersion })) id: string,
  ): Promise<void> {
    await this.tracksService.deleteTrackById(id);
  }
}
