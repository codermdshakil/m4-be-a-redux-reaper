
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath:"baseApi",
  baseQuery:fetchBaseQuery({baseUrl:"https://b2-a3-server.vercel.app/api"}),
  tagTypes:["book"],
  endpoints: (builder) => ({
    // get method
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),
    
    // // POST method
    // createTask: builder.mutation({
    //   query: (taskData) => ({
    //     url: "/tasks",
    //     method: "POST",
    //     body: taskData,
    //   }),
    //   invalidatesTags: ["book"],
    // }),
  })
})