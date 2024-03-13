import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";
import { UserEntity } from "libs/dynamodb-toolbox/userEntity";
import { randomUUID } from "crypto";

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const createUser = async (userId: string, nftPrice: number) => {
    const user = {
        PK: 'User',
        SK: userId,
        balance: 1000 - nftPrice,
    }
    await UserEntity.put(user);
}

const createNewNft = async (userId: string) => {
    const id = randomUUID();

    const Item = {
        SK: id,
        id: id,
        ownerUserId: userId,
        price: randomIntFromInterval(1, 100),
        positionX: randomIntFromInterval(5, 90),
        positionY: randomIntFromInterval(10, 90),
        imageIndex: Math.floor(Math.random() * 5),
    }

    await NFTEntity.put(Item);
    return Item
}

const getUser = async (userId: string) => {
    return (await UserEntity.get({PK: 'User', SK: userId})).Item;
}

const updateUserBalance = async (userId:string, price: number) => {
    let user = await getUser(userId)
    // Create User if not exists
    if (!user) {
        await createUser(userId, price)
    }
    //update user if exists
    else if(user.balance) {
        user.balance -= price;
        await UserEntity.put(user);
    }
}


export const main = async (event: { pathParameters: { ownerUserId: string }}): Promise<any> => {

    // Create new NFT with ownerUserId
    const nft = await createNewNft(event.pathParameters.ownerUserId)

    // Update User balance
    await updateUserBalance(event.pathParameters.ownerUserId, nft.price)

    return nft;
};