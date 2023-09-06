import { Inject, Injectable } from '@nestjs/common';
import { Collection, Document } from 'mongodb';

interface QueryParams {
    limit?: number;
    before?: number;
}

const processTsAndSort = [
    {
        '$addFields': {
            'ts_num': {
                '$toDouble': '$ts'
            }
        }
    },
    {
        '$sort': {
            'ts_num': -1
        }
    }
];

@Injectable()
export class MessageService {
    constructor(@Inject('message_collection') private col: Collection) { }

    async getHistory(channel: string, params?: QueryParams) {
        const aggregate: Document[] = [
            {
                '$match': {
                    'thread_ts': {
                        '$exists': false
                    },
                    'channel': channel
                }
            },
            ...processTsAndSort,
        ];

        if (params.before) {
            aggregate.push({
                '$match': {
                    'ts_num': {
                        '$lt': params.before
                    }
                }
            });
        }

        if (params.limit) {
            aggregate.push({
                '$limit': params.limit
            });
        }

        // sort from old to new
        aggregate.push({
            '$sort': {
                'ts_num': 1
            }
        });

        // remove ts_num
        aggregate.push({
            '$unset': 'ts_num'
        });

        return this.col.aggregate(aggregate).toArray();
    }

    async getThread(channel: string, thread_ts: string, params?: QueryParams) {
        const aggregate: Document[] = [
            {
                '$match': {
                    'channel': channel,
                    '$or': [
                        {
                            'thread_ts': thread_ts,
                        },
                        {
                            'ts': thread_ts,
                        },
                    ],
                }
            },
            ...processTsAndSort,
        ];

        if (params.limit) {
            aggregate.push({
                '$limit': params.limit
            });
        }

        // sort from old to new
        aggregate.push({
            '$sort': {
                'ts_num': 1
            }
        });

        // remove ts_num
        aggregate.push({
            '$unset': 'ts_num'
        });

        return this.col.aggregate(aggregate).toArray();
    }
}
