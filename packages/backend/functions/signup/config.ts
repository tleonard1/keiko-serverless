import { getHandlerPath } from "libs/configHelper/getHandlerPath";
import { nftUserPoolSignupPolicies } from "resources/policies";
import { userPoolClientId } from "resources";

export const signup = {
    environment: { USER_POOL_CLIENT_ID: userPoolClientId },
    iamRoleStatements: [nftUserPoolSignupPolicies],
    handler: getHandlerPath(__dirname),
    events: [
        {
          httpApi: {
            method: 'post',
            path: '/signup',
          },
        },
    ],
};
