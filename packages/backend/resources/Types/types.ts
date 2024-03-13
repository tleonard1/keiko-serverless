

export type UserType = {
    PK: string,
    SK: string,
    balance?: number | undefined,
}

export type NftType = {
    SK: string,
    id: string,
    ownerUserId: string,
    price: number,
    positionX: number,
    positionY: number,
    imageIndex: number,
}