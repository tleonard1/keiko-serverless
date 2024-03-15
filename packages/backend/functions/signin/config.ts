import { getHandlerPath } from "libs/configHelper/getHandlerPath";
import { nftUserPoolSigninPolicies } from "resources/policies";
import { userPoolClientId } from "resources";

export const signin = {
    environment: { USER_POOL_CLIENT_ID: userPoolClientId },
    iamRoleStatements: [nftUserPoolSigninPolicies],
    handler: getHandlerPath(__dirname),
    events: [
        {
          httpApi: {
            method: 'post',
            path: '/signin',
          },
        },
    ],
};
