import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";
import { UserEntity } from "libs/dynamodb-toolbox/userEntity";
import { randomUUID } from "crypto";

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const main = async (event: { pathParameters: { ownerUserId: string }}): Promise<any> => {
    const id = randomUUID();

    const Item = {
        SK: id,
        id: id,
        ownerUserId: event.pathParameters.ownerUserId,
        price: randomIntFromInterval(1, 100),
        positionX: randomIntFromInterval(5, 90),
        positionY: randomIntFromInterval(10, 90),
        imageIndex: Math.floor(Math.random() * 5),
    }

        
    let User = await UserEntity.get({PK: 'User', SK: event.pathParameters.ownerUserId});
    if (!User.Item) {
        const user = {
            PK: 'User',
            SK: event.pathParameters.ownerUserId,
            balance: 100,
        }
        await UserEntity.put(user);
    }
    else if(User.Item.balance) {
        User.Item.balance += Item.price;
        await UserEntity.put(User.Item);
    }

    await NFTEntity.put(Item);
    return Item;
};