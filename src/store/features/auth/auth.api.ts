import { baseApi } from "@/store/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        data: credentials,
      }),
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
