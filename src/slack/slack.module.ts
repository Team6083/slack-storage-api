import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { WebClient } from '@slack/web-api';
import { SlackController } from './slack.controller';

@Module({
  providers: [{
    provide: SlackService,
    useFactory: async () => {
      return new SlackService(new WebClient(process.env.SLACK_TOKEN));
    },
  }],
  exports: [SlackService],
  controllers: [SlackController]
})
export class SlackModule { }
