import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";
import { UserEntity } from "libs/dynamodb-toolbox/userEntity";
import { randomUUID } from "crypto";
import { UserType, NftType } from "resources/Types/types";

const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getUser = async (userId: string): Promise<UserType | undefined> => {
    const user = (await UserEntity.get({PK: 'User', SK: userId})).Item
    return user;
}

const createUser = async (userId: string): Promise<UserType> => {
    const user = {
        PK: 'User',
        SK: userId,
        balance: 1000,
    }

    await UserEntity.put(user);
    return user
}

const getOrCreateUser = async (userId: string): Promise<UserType> => {
    const user = await getUser(userId);

    if (user !== undefined) {
        return user
    }

    const userCreated = await createUser(userId)
    return userCreated
}

const createNewNft = async (userId: string, price: number): Promise<NftType> => {
    const id = randomUUID();

    const Item = {
        SK: id,
        id: id,
        ownerUserId: userId,
        price: price,
        positionX: randomIntFromInterval(5, 90),
        positionY: randomIntFromInterval(10, 90),
        imageIndex: Math.floor(Math.random() * 5),
    }

    await NFTEntity.put(Item);
    return Item
}

const updateUserBalance = async (user: UserType, price: number): Promise<void> => {
    if (user.balance == undefined) {
        return 
    }

    user.balance -= price;
    await UserEntity.put(user);
}

const checkBalance = (user: UserType, price: number): boolean => {
    if (user.balance == undefined){    
        return false
    }
    return (user.balance >= price)
}

export const main = async (event: { pathParameters: { ownerUserId: string }}): Promise<any> => {
    const userId = event.pathParameters.ownerUserId
    const price = randomIntFromInterval(1, 100)

    const user = await getOrCreateUser(userId)

    if (!checkBalance(user, price)) {
        return 0;
    }

    // Create new NFT with ownerUserId
    const nft = await createNewNft(userId, price)
    
    // Update User balance
    await updateUserBalance(user, nft.price)
    
    return nft;
};