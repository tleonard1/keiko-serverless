import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";
import { randomUUID } from "crypto";

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const main = async (): Promise<any> => {
    const id = randomUUID();
    
    const Item = {
        SK: id,
        id: id,
        positionX: randomIntFromInterval(5, 90),
        positionY: randomIntFromInterval(10, 90),
        imageIndex: Math.floor(Math.random() * 5),
    }

    await NFTEntity.put(Item);
    return Item;
};