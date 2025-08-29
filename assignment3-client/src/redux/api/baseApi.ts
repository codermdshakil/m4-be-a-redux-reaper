import type {
  IBook,
  IBorrowBookRequest,
  IBorrowBookResponse,
  IBorrowSummary,
} from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    // get method
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),

    // POST method
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),

    // get a single book details
    getSingleBook: builder.query<IBook, string>({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["book"],
    }),

    // update method
    updateSingleBook: builder.mutation<
      any,
      { bookId: string; updatedData: Partial<IBook> }
    >({
      query: ({ bookId, updatedData }) => ({
        url: `/books/${bookId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["book"],
    }),

    // DELETE method
    deleteBook: builder.mutation({
      query: (bookId: string) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),

    // borrow book
    borrowBook: builder.mutation<IBorrowBookResponse, IBorrowBookRequest>({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["book"], 
    }),

    // borrow summary
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "/borrow",
      providesTags: ["book"],  
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
  useUpdateSingleBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
