// ---- Types ----
export interface IBook {
  _id?:string,
  title: string;
  author: string;
  genre: "FICTION" | "NON-FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}


export interface IBorrowBookRequest {
  book: string;      // bookId
  quantity: number;
  dueDate: string;   // ISO date string
}

export interface IBorrowBookResponse {
  success: boolean;
  message: string;
  data: any; // or you can define BorrowBook interface if you want
}

export interface IBorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}
