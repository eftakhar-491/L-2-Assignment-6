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
  }),
});

export const { usePriceAndDetailsMutation, useRequestRideMutation } = rideApi;
