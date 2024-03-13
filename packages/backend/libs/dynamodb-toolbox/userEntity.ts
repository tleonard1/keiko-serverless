import { PARTITION_KEY } from 'resources/dynamoDB';
import { Entity } from 'dynamodb-toolbox';
import { userTable } from './userTable';

export const UserEntity = new Entity({
  name: 'USER',
  attributes: {
    [PARTITION_KEY]: { type: 'string', partitionKey: true, default: 'User' },
    SK: { type: 'string', sortKey: true },
    balance: { type: 'number', default: 0}
  },
  table: userTable,
} as const);
