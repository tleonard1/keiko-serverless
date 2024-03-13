import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";
import {UserEntity } from "libs/dynamodb-toolbox/userEntity";

export const main = async (event: { pathParameters: { id: string }}): Promise<any> => {

    let Nft = await NFTEntity.get({PK: 'Nft', SK: event.pathParameters.id});
    if (!Nft.Item) {
        throw new Error('Nft not found');
    }
    else if(Nft.Item.ownerUserId) {
        const User = (await UserEntity.get({PK: 'User', SK: Nft.Item.ownerUserId})).Item;
        if (User?.balance) {
            User.balance += Nft.Item.price ?? 0;
            await UserEntity.put(User);
        }
    }

    const response = await NFTEntity.delete({SK: event.pathParameters.id});
    return response;
};