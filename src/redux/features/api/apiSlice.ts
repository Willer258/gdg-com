import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";


console.log(import.meta.env.VITE_APP_API_URL)
export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_URL}`,
    // prepareHeaders: (headers, { getState }) => {
    //   const userInfo: any = (getState() as RootState).authSlice.userInfo;
    //   if (userInfo) {
    //     headers.set("authorization", `Bearer ${userInfo.jwt.token}`);
    //   }
    //   return headers;
    // },
    // credentials: "include",
  }),

  tagTypes: [
  "members","events"
  ],
  endpoints: (builder) => ({}),
});