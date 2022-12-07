/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-16 13:45:36
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-16 14:15:39
 * @FilePath: \testproject\src\store\reducers\user.ts
 */
import {
    createSlice,//创建切片
} from '@reduxjs/toolkit'
const user = createSlice({
  name: "user",
  initialState: {
    count:1
  },
  reducers:{ //改变action的方法   action:{payload:接受传进来的值}
    add:(state,{payload})=>{
        state.count = state.count+payload.value
    }
  }
});
export const {add} = user.actions;
export default user.reducer;