import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DBModule,
    UsersModule,
    AlbumsModule,
    TracksModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
