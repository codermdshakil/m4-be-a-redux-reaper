import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/api/tasks",
    }),
    createTask: builder.mutation({
      query: (taskData) => ({
        url:"/api/tasks",
        method:"POST",
        body:taskData
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = baseApi;
