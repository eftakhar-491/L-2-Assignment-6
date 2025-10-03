import { baseApi } from "@/store/baseApi";

const rideApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    priceAndDetails: build.mutation({
      query: (data) => ({
        url: "/ride/price-and-details",
        method: "POST",
        data: data,
      }),
    }),
    requestRide: build.mutation({
      query: (data) => ({
        url: "/ride/request-ride",
        method: "POST",
        data: data,
      }),
    }),
    rideAccept: build.mutation({
      query: ({ _id, ...data }) => ({
        url: `/ride/ride-accept/${_id}`,
        method: "PATCH",
        data: data,
      }),
    }),
    ridePickedup: build.mutation({
      query: ({ _id, ...data }) => ({
        url: `/ride/ride-picked-up-otp-send/${_id}`,
        method: "PATCH",
        data: data,
      }),
    }),
    rideOtpVerify: build.mutation({
      query: ({ _id, ...data }) => ({
        url: `/ride/ride-otp-verify/${_id}`,
        method: "PATCH",
        data: data,
      }),
    }),
    rideComplete: build.mutation({
      query: ({ _id, ...data }) => ({
        url: `/ride/ride-complete/${_id}`,
        method: "PATCH",
        data: data,
        invalidates: ["getRide"],
      }),
    }),
  }),
});

export const {
  usePriceAndDetailsMutation,
  useRequestRideMutation,
  useRideAcceptMutation,
  useRidePickedupMutation,
  useRideOtpVerifyMutation,
  useRideCompleteMutation,
} = rideApi;
