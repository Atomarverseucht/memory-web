export interface MemorySet {
    name: string;
    titlePicture: Card;
    cards?: Card[];
}

export interface Card {
    picture: string;
    altText: string;
}

// später durch Datenbank und Backend ersetzt
export const memSets: MemorySet[] = [
    { name: 'Fruits', titlePicture: { picture: 'https://cdn.pixabay.com/photo/2022/03/17/10/03/lemon-7074240_1280.png', altText: 'lemon' } },
    { name: 'Planets', titlePicture: { picture: 'https://cdn.pixabay.com/photo/2023/09/04/17/04/planet-8233218_1280.png', altText: 'jupiter' } },
    { name: 'Cats', titlePicture: { picture: 'https://cdn.pixabay.com/photo/2018/03/18/18/55/cat-3237903_1280.png', altText: 'cat' } },
    { name: 'Animals', titlePicture: { picture: 'https://cdn.pixabay.com/photo/2026/03/17/12/10/hoggyart-black-and-white-10178638_1280.jpg', altText: 'young dog' } },
    { name: 'Linux Distributions', titlePicture: { picture: 'https://assets.techrepublic.com/uploads/2021/08/tux-new.jpg', altText: 'Tux, the mascot of Linux' } },
    ...Array(17).fill({ name: 'Programming Languages', titlePicture: { picture: 'https://cdn-icons-png.flaticon.com/512/6132/6132220.png', altText: 'logo of scala' } })];