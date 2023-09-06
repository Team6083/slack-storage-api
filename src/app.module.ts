import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [MessageModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
