import { getHandlerPath } from "libs/configHelper/getHandlerPath";
import { userTableDynamoDBReadPolicies } from "resources/policies";

export const getUserBalance = {
    environment: {  },
    iamRoleStatements: [userTableDynamoDBReadPolicies],
    handler: getHandlerPath(__dirname),
    events: [
        {
          httpApi: {
            method: 'get',
            //path: '/balance/{id}',
            path: '/getbalance/{id}',
          },
        },
    ],
};