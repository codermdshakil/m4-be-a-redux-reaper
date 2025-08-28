
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath:"baseApi",
  baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api"}),
  tagTypes:["book"],
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
  })
});

export const {useGetBooksQuery, useCreateBookMutation} = baseApi;
