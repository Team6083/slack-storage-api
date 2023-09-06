import { Global, Module, Provider } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const mongoClient: Provider = {
    provide: 'mongo_client',
    useFactory: async () => {
        const client = new MongoClient(process.env.DATABASE_URL);
        await client.connect();
        return client;
    },
}

@Global()
@Module({
    providers: [
        mongoClient,
        {
            provide: 'message_collection',
            useFactory: (client: MongoClient) => {
                return client.db().collection('messages');
            },
            inject: ['mongo_client']
        }
    ],
    exports: [
        'message_collection'
    ],
})
export class MongoModule { }
