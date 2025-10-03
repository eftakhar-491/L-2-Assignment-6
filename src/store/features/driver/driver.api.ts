import { baseApi } from "@/store/baseApi";

const driverApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDriverNearestRides: build.mutation({
      query: (location) => ({
        url: "/driver/get-driver-nearest-rides",
        method: "POST",
        data: location,
        invalidatesTags: ["getRide"],
      }),
    }),
    getMyAcceptedRide: build.query({
      query: (location) => ({
        url: "/driver/my-rides",
        method: "GET",
        data: location,
      }),
    }),
  }),
});

export const { useGetDriverNearestRidesMutation, useGetMyAcceptedRideQuery } =
  driverApi;
