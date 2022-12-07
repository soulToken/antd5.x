/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-10-21 15:14:09
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-07 17:09:38
 * @FilePath: \testproject\src\utils\request.ts
 */
import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import BASE_URL from "./baseUrl";

// 创建一个 axios 实例
const service = (axios as any).create({
  baseURL: BASE_URL, // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error: any) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response: AxiosResponse) {
    console.log(response);
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    return dataAxios;
  },
  function (error: any) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
