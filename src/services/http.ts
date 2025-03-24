/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL env variable is not defined");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const user: any = session?.user;
    //console.log('user', user);
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    //config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmJ6am9icy5zYWJhZy54eXoiLCJpYXQiOjE3MjMzNzk4NTMsImV4cCI6MTcyMzM4MzQ1MywiZGF0YSI6eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn19.JnV1o067Z898EpL_1ZAVMxP7R9S6gRWP_s4q5RIOaKI`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  get(endpoint: string, data?: any) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint: string, data?: any) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data?: any) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint: string, data?: any) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(
  endpoint: string,
  method = "get",
  data = null,
  authorization = null
) {
  try {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${BASE_URL}${endpoint}`;

    const res = await axiosInstance({
      url,
      method,
      data,
      params: method === "GET" ? data : null,
    });

    let result = res.data;

    // console.log('res.headers', res.headers);
    //console.log(`${BASE_URL}${endpoint}`, res.data);

    if (res.headers["x-wp-total"] && res.headers["x-wp-totalpages"]) {
      result = {
        data: res.data,
        total: res.headers["x-wp-total"],
        totalPages: res.headers["x-wp-totalpages"],
      };
    }

    //console.log(`${BASE_URL}${endpoint}`, result);
    return result;
  } catch (err: any) {
    // if (err?.response?.status == 401) {
    //     signOut({
    //         callbackUrl: '/login',
    //     });
    // }
    throw err;
  }
}

export function wpQueryParams(obj: any) {
  if (!obj) return "";
  if (Object.keys(obj).length == 0) return "";

  // console.log('obj', obj);

  // if some key is multiple values replace with string of comma separated values
  // Object.keys(obj).forEach(key => {
  //     if (Array.isArray(obj[key])) {
  //         obj[key] = obj[key].join(',');
  //     }
  // });

  const params = new URLSearchParams(obj);
  return "?" + params;
}
