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
