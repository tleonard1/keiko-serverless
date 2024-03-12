import { getHandlerPath } from "libs/configHelper/getHandlerPath";
import { nftTableDynamoDBReadPolicies } from "resources/policies";

export const getUser = {
  environment: {  },
  iamRoleStatements: [nftTableDynamoDBReadPolicies],
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
      method: 'GET',
      path: '/user/{id}',
      },
    },
  ],
};