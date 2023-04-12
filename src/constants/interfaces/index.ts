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

export interface Exception {
    id?: string;
    exceptionMessageType?: string;
    description: string;
}

export interface Order {

}

export interface Publisher {
    id: string;
    name: string;
}

export interface BookCondition {
    id: number;
    name: string;
}

export interface Book {
    id: string;
    title: string;
    authorId: string;
    author: Author;
    publisherId: string;
    publisher: Publisher;
    bookConditionId: number;
    quantity: number;
    price: number;
    sellOfRate: number;
    edition: number;
    bookImage: BookImage
}

export interface PaymentOptionTypeDescription {
    id: string;
    name: string;
    description: string;
}

export interface PaymentOption {
    id: string;
    cardNumber: string;
    expiryDate: Date;
    nameOnCard: string;
    paymentOptionTypeDescriptionId: number;
    paymentOptionTypeDescription: PaymentOptionTypeDescription;
}

export interface Address {
    id: string;
    fullName: string;
    addressLine: string;
    telephone: string;
    longitude: number;
    latitude: number;
    distance: number;
}