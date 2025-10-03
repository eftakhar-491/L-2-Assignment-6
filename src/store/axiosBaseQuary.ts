import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { logout, setUser } from "./slice/authSlice";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];

      api?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, api }) => {
    try {
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
        headers,
      });
      console.log(url, method, data, params, headers);
      return { data: result.data };
    } catch (axiosError) {
      console.log(url, method, data, params, headers);
      console.log(axiosError);
      if (url === "/user/me") {
        const result = await axiosInstance({
          url: "/auth/refresh-token",
          method: "GET",
          data,
          params,
          headers,
        });
        console.log(result);
        if (result?.data?.success) {
          const retryResult = await axiosInstance({
            url: url,
            method,
            data,
            params,
            headers,
          });
          api.dispatch(
            setUser({
              user: retryResult.data.user,
              token: retryResult.data.token,
            })
          );
        }
      } else {
        api.dispatch(logout());
      }
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export default axiosBaseQuery;
