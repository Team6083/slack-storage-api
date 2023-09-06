import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { MongoModule } from './mongo/mongo.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [MessageModule, MongoModule, SlackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
