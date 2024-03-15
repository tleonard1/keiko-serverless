import { getHandlerPath } from "libs/configHelper/getHandlerPath";
import { nftUserPoolConfirmPolicies } from "resources/policies";
import { userPoolClientId } from "resources";

export const confirm = {
    environment: { USER_POOL_CLIENT_ID: userPoolClientId },
    iamRoleStatements: [nftUserPoolConfirmPolicies],
    handler: getHandlerPath(__dirname),
    events: [
        {
          httpApi: {
            method: 'post',
            path: '/confirm',
          },
        },
    ],
};
