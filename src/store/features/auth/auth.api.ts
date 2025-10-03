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
    logout: build.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
          invalidatesTags: ["User"],
        };
      },
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
        providesTags: ["User"],
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
