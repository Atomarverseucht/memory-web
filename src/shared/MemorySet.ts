export interface MemorySet {
    name: string;
    titlePicture: Card;
    cards?: Card[];
}

export interface Card {
    picture: string;
    altText: string;
}