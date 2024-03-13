import { getHandlerPath } from "libs/configHelper/getHandlerPath";
import { nftTableDynamoDBDeletePolicies, nftTableDynamoDBReadPolicies, userTableDynamoDBReadPolicies, userTableDynamoDBWritePolicies } from "resources/policies";

export const deleteNft = {
  environment: {  },
  iamRoleStatements: [nftTableDynamoDBReadPolicies, nftTableDynamoDBDeletePolicies, userTableDynamoDBReadPolicies, userTableDynamoDBWritePolicies],
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
      method: 'DELETE',
      path: '/nfts/{id}',
      },
    },
  ],
};