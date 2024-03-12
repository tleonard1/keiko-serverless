import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";

export const main = async (event: { pathParameters: { ownerUserId: string }}): Promise<any> => {
    //const primaryKey = {PK: 'Nft', SK: event.pathParameters.ownerUserId}
    //const response = await NFTEntity.getParams(primaryKey)
    
    const response = (await NFTEntity.query('Nft')).Items || [];
    const filteredItems = response.filter((item: any) => item.ownerUserId === event.pathParameters.ownerUserId); 
    return filteredItems;

};