export interface MemorySet {
    title: Title
    cards: Card[];
}

export type Title = {
    name: string;
    titlePicture: Card;
}

export interface Card {
    picture: string;
    altText: string;
}