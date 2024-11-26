import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TravelsModule } from './travels/travels.module';

@Module({
  imports: [TravelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
