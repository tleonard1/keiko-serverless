import { PARTITION_KEY } from 'resources/dynamoDB';
import { Entity } from 'dynamodb-toolbox';
import { nftTable } from './nftTable';

export const NFTEntity = new Entity({
  name: 'NFT',
  attributes: {
    [PARTITION_KEY]: { type: 'string', partitionKey: true, default: 'Nft' },
    SK: { type: 'string', sortKey: true },
    id: { type: 'string' },
    positionX: { type: 'number' },
    positionY: { type: 'number' },
    imageIndex: { type: 'number' },
  },
  table: nftTable,
} as const);