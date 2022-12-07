/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-07 16:56:24
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-08 17:01:51
 * @FilePath: \testproject\src\utils\baseUrl.ts
 */

interface envOptions {
  [key: string]: string
}
const urlObj:envOptions = {
  "test": "https://t-app-api.greenpowern.com",
  "production": "https://s-gpn-app-api.greenpowern.com",
  "development": "https://t-app-api.greenpowern.com"
}
const BASE_URL =urlObj[(process.env as any).REACT_APP_ENV ];
export default BASE_URL;