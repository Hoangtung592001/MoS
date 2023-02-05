export interface Author {
    id: string;
    name: string;
}

export interface BookImage {
    id: string;
    url: string;
}

export interface ProductItem {
    id: string;
    title: string;
    author: Author;
    bookImage: BookImage;
}