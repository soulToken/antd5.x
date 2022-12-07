/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-04 11:13:15
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-04 15:16:00
 * @FilePath: \testproject\src\types\index.ts
 */
export  interface pagination {
  current: number | undefined,
  pageSize: number | undefined,
  total: number | undefined
}
//首页列表数据
export interface DataType {
  key: string,
  dataIndex: string,
  title: string,
}