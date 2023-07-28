import { Album, Track, User } from 'src/interfaces';

export class DBService {
  private users: User[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find(({ id: userId }) => id === userId);
  }

  createUser(user: User) {
    this.users.push(user);
  }

  deleteUserById(id: string) {
    this.users = this.users.filter(({ id: userId }) => id !== userId);
  }

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find(({ id: artistId }) => id === artistId);
  }

  createAlbum(album: Album) {
    this.albums.push(album);
  }

  deleteAlbumById(id: string) {
    this.albums = this.albums.filter(({ id: artistId }) => id !== artistId);
  }

  getAllTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find(({ id: trackId }) => id === trackId);
  }

  createTrack(track: Track) {
    this.tracks.push(track);
  }

  deleteTrackById(id: string) {
    this.tracks = this.tracks.filter(({ id: trackId }) => id !== trackId);
  }
}
