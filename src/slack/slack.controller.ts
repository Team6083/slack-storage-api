import { Controller, Get, Param } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {

    constructor(private slackService: SlackService) { }

    @Get('user/:id')
    user(@Param() param: any) {
        return this.slackService.getUser(param.id);
    }

    @Get('conversation/:id')
    conversation(@Param() param: any) {
        return this.slackService.getConversationInfo(param.id);
    }

}
