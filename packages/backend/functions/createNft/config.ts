import { getHandlerPath } from "libs/configHelper/getHandlerPath";
import { nftTableDynamoDBWritePolicies, userTableDynamoDBReadPolicies, userTableDynamoDBWritePolicies } from "resources/policies";

export const createNft = {
    environment: {  },
    iamRoleStatements: [nftTableDynamoDBWritePolicies, userTableDynamoDBReadPolicies, userTableDynamoDBWritePolicies],
    handler: getHandlerPath(__dirname),
    events: [
        {
          httpApi: {
            method: 'post',
            path: '/nfts/{ownerUserId}',
          },
        },
    ],
};