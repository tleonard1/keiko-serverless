import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({})

export const main = async (event: {body: string}): Promise<{ statusCode: number; body: string }> => {
    const { username, password, email } = JSON.parse(event.body) as { username?: string, password?: string, email?: string }
    console.log(event.body)


    if (username === undefined || password === undefined || email === undefined) {
        return Promise.resolve({ statusCode: 400, body: 'Missing username, email or password' });
    }

    await client.send(
        new SignUpCommand({
          ClientId: process.env.USER_POOL_CLIENT_ID,
          Username: username,
          Password: password,
          UserAttributes: [
            {
              Name: 'email',
              Value: email,
            },
          ],
        }),
    );
    
    return { statusCode: 200, body: 'User created!' };
};