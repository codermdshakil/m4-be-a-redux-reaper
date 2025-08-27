import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/api/tasks",
    }),
    postTask: builder.mutation({
      query: () => "/api/tasks",
    }),
  }),
});

export const { useGetTasksQuery } = baseApi;
