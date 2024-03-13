import { UserEntity } from "libs/dynamodb-toolbox/userEntity";

export const main = async (event: { pathParameters: { id: string }}): Promise<any> => {
    const primaryKey = {PK: 'User', SK: event.pathParameters.id}
    const response = (await UserEntity.get(primaryKey)).Item?.balance
    return response
};