/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-16 13:42:37
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-16 15:31:59
 * @FilePath: \testproject\src\store\index.ts
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// webpack 自动全局引入;
const modules = (require as any).context("./reducers", true, /\.ts/);
let stores: any = {};
modules.keys().forEach((key: string) => {
  const store = modules(key).default;
  stores[key.replace(/(\.\/|\.ts)/g, '')] = store;
});
const reducer = combineReducers(stores)
const store = configureStore({ reducer });
export default store