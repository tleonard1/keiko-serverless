import { UserEntity } from "libs/dynamodb-toolbox/userEntity";

export const main = async (event: { pathParameters: { userId: string }}): Promise<any> => {
    const primaryKey = {PK: 'Nft', SK: event.pathParameters.userId}
    const response = await UserEntity.get(primaryKey)
    return response
};