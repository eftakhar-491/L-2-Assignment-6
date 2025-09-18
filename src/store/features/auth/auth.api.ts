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

    verifyOTP: build.mutation({
      query: (otpData) => ({
        url: "/otp/email-otp-verify",
        method: "POST",
        data: otpData,
      }),
    }),
    getMe: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useGetMeQuery,
} = authApi;
