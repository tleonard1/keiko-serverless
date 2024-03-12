import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";

export const main = async (): Promise<any> => {
    // const primaryKey = {PK: 'Nft', SK: '*'}
    // const response = await NFTEntity.getParams(primaryKey)
    const response = (await NFTEntity.query('Nft')).Items;

    return response;
};