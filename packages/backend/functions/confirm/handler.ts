import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({})

export const main = async (event: {body: string}): Promise<{ statusCode: number; body: string }> => {
    const { username, code } = JSON.parse(event.body) as { username?: string, code?: string }

    if (username === undefined || code === undefined) {
        return Promise.resolve({ statusCode: 400, body: 'Missing username, email or password' });
    }

    await client.send(
        new ConfirmSignUpCommand({
          ClientId: process.env.USER_POOL_CLIENT_ID,
          Username: username,
          ConfirmationCode: code,
        }),
    );
    
    return { statusCode: 200, body: 'User confirmed!' };
};