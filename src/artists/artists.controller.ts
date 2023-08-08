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
import { Artist } from 'src/interfaces';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  /**
   * Get all artists.
   * @returns {Artist[]} Array of artists.
   */
  @Get()
  getAllArtists(): Artist[] {
    return this.artistsService.getAllArtists();
  }

  /**
   * Get an artist by its ID.
   * @param {string} id - Artist ID.
   * @returns {Artist} The artist.
   */
  @Get(':id')
  getArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Artist {
    return this.artistsService.getArtistById(id);
  }

  /**
   * Create a new artist.
   * @param {CreateArtistDto} createArtist - Artist data.
   * @returns {Artist} The newly created artist.
   */
  @Post()
  @HttpCode(StatusCodes.CREATED)
  createArtist(@Body() createArtist: CreateArtistDto): Artist {
    return this.artistsService.createArtist(createArtist);
  }

  /**
   * Update an artist by its ID.
   * @param {string} id - Artist ID.
   * @param {UpdateArtistDto} updateArtistDto - Updated artist data.
   * @returns {Artist} The updated artist.
   */
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  /**
   * Delete an artist by its ID.
   * @param {string} id - Artist ID.
   * @returns {void}
   */
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.artistsService.deleteArtistById(id);
  }
}
