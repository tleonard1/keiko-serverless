const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb'); 

import { randomUUID } from "crypto";

const client = new DynamoDBClient({ region: 'eu-west-1' });

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const main = async (): Promise<any> => {
    const id = randomUUID();
    
    const Item = {
        PK: { S: 'Nft' },
        SK: { S: id },
        id: { S: id },
        positionX: { N: randomIntFromInterval(5, 90).toString() },
        positionY: { N: randomIntFromInterval(10, 90).toString() },
        imageIndex: { N: Math.floor(Math.random() * 5).toString() },
    }

    const input = {
        TableName: process.env.NFT_TABLE_NAME,
        Item,
    };

    const command = new PutItemCommand(input);
    await client.send(command);

    return {id, positionX: Item.positionX.N, positionY: Item.positionY.N, imageIndex: Item.imageIndex.N}
};