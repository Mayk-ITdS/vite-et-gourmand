import { useCallback } from "react";
import api from "../utils/api";
import type { RequestOptions } from "@/types/requestOptions";
const useAxiosWithAuth = () => {
  const request = useCallback(
    async <T>(options: RequestOptions): Promise<T> => {
      const { method, data, params, headers, url } = options;
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authorization token found");
        }
        const res = await api.request<T>({
          url: url,
          method,
          data,
          params,
          headers: { Authorization: `Bearer ${token}`, ...headers },
        });

        return res.data;
      } catch (err) {
        throw new Error(`${err}`);
      }
    },
    []
  );
  return request;
};
export default useAxiosWithAuth;
