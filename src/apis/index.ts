/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-10-21 15:18:41
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-03 11:27:31
 * @FilePath: \testproject\src\apis\index.ts
 */
import request from "../utils/request";
interface searchObj {
  size: number;
  page: number;
  sn: string;
}
export const deviceDataList = (data: searchObj) => {
  return request({
    url: "/device/energy/data/list",
    method: "post",
    data,
  });
};
