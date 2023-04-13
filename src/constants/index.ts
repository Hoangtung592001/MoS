export const accessTokenKey = "accessToken";

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export enum PaymenOptionTypeDescriptions {
    Cash = 1,
    Visa = 2,
}

export enum RequestStatus {
    Nothing = 0,
    Pending = 1,
    Fulfilled = 2,
    Rejected = 3,
}

export enum Roles {
    Admin = 1,
    User = 2
}

export const orderStatuses = ['', 'PREPARING', 'PREPARED', 'DELIVERING', 'DELIVERED'];

export const VietNamId = 245;

export const CashPaymentOptionId = 'E3037927-7A79-43A9-91B2-F788406436A6';