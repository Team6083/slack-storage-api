import { Controller, Get, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }

    @Get(':channel')
    async history(
        @Param() params: any,
        @Query('before') beforeStr: string | undefined, @Query('limit') limitStr: string | undefined
    ) {
        const before = parseFloat(beforeStr);
        const limit = parseInt(limitStr);
        return this.messageService.getHistory(params.channel, {
            limit: Number.isNaN(limit) ? undefined : limit,
            before: Number.isNaN(before) ? undefined : before,
        });
    }

    @Get(':channel/:thread_ts')
    async thread(
        @Param() params: any,
        @Query('before') beforeStr: string | undefined, @Query('limit') limitStr: string | undefined
    ) {
        const before = parseFloat(beforeStr);
        const limit = parseInt(limitStr);
        return this.messageService.getThread(params.channel, params.thread_ts,
            {
                limit: Number.isNaN(limit) ? undefined : limit,
                before: Number.isNaN(before) ? undefined : before,
            });
    }
}
