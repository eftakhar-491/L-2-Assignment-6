import { baseApi } from "@/store/baseApi";

const driverApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDriverNearestRides: build.mutation({
      query: (location) => ({
        url: "/driver/get-driver-nearest-rides",
        method: "POST",
        data: location,
      }),
    }),
  }),
});

export const { useGetDriverNearestRidesMutation } = driverApi;
