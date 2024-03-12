import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";

export const main = async (event: { pathParameters: { id: string }}): Promise<any> => {
    const response = await NFTEntity.delete({SK: event.pathParameters.id});
    return response;
};