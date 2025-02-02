export interface BookData {
    kind: string,
    totalItems: number,
    items: any[]
}

export interface Book {
    _id: string,
    title: string,
    author: string,
    description: string,
    quantity: number,
    maxQuantity: number,
    thumbnail: string,
    ratings: number,
    publisher: string,
    genres: string[]
}

export interface BorrowedBook {
    _id: string,
    bookId: string,
    userId: string,
    issuedTimestamp: Date,
    dueDate: Date,
    returnTimestamp: Date,
    status: string,
    overdueDuration: number,
    isLate: boolean,
}

export interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    contatctNo: string;
    isVerified: Boolean;
    isMember: Boolean;
    createdAt: Date;
}