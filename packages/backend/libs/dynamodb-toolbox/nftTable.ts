import { Table } from "dynamodb-toolbox";
import { PARTITION_KEY, SORT_KEY } from "resources/dynamoDB";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const marshallOptions = { convertEmptyValues: true };

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    // NOTE: this is required to be true in order to use the bigint data type.
    wrapNumbers: false, // false, by default.
}

const translateConfig = { marshallOptions, unmarshallOptions }

// Instantiate a DocumentClient
export const DocumentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}), translateConfig)
  

export const nftTable = new Table({
    name: process.env.NFT_TABLE_NAME || 'MISSING_NFT_TABLE_NAME',
    partitionKey: PARTITION_KEY,
    sortKey: SORT_KEY,
    DocumentClient,
});
