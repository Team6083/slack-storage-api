import { Injectable } from '@nestjs/common';
import { ConversationsInfoResponse, UsersInfoResponse, WebClient } from '@slack/web-api';



@Injectable()
export class SlackService {
    constructor(private slackWebAPI: WebClient) {
        this.userCache = new Map();
        this.conversationInfoCache = new Map();
    }

    private userCache: Map<string, { ts: Date, data: UsersInfoResponse }>;

    async getUser(user: string) {
        const cache = this.userCache.get(user);
        if (cache && Date.now() - cache.ts.getTime() < 60 * 1000) {
            return cache.data;
        }

        const result = await this.slackWebAPI.users.info({
            user
        });

        this.userCache.set(user, {
            ts: new Date(),
            data: result,
        });

        return result;
    }

    private conversationInfoCache: Map<string, { ts: Date, data: ConversationsInfoResponse }>;

    async getConversationInfo(channel: string) {
        const cache = this.conversationInfoCache.get(channel);
        if (cache && Date.now() - cache.ts.getTime() < 60 * 1000) {
            return cache.data;
        }

        const result = await this.slackWebAPI.conversations.info({
            channel,
            include_num_members: true,
        });

        this.conversationInfoCache.set(channel, {
            ts: new Date(),
            data: result,
        });

        return result;
    }
}
