import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";
import { UserEntity } from "libs/dynamodb-toolbox/userEntity";


const getNft = async (id: string) => {
    return (await NFTEntity.get({PK: 'Nft', SK: id})).Item
}

const getUser = async (userId: string) => {
    return (await UserEntity.get({PK: 'User', SK: userId})).Item;
}

const updateUserBalance = async (userId: string, price: number) => {
    const user = await getUser(userId)
    if (user?.balance) {
        user.balance += price ?? 0;
        await UserEntity.put(user);
    }
}

export const main = async (event: { pathParameters: { id: string }}): Promise<void> => {

    const nft = await getNft(event.pathParameters.id)
    if (!nft) {
        throw new Error('Nft not found');
    }

    await updateUserBalance(nft.ownerUserId ?? "", nft.price ?? 0);
    
    await NFTEntity.delete({SK: event.pathParameters.id});
};