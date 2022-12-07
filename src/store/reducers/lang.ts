/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-16 13:45:36
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-16 14:51:13
 * @FilePath: \testproject\src\store\reducers\lang.ts
 */
import {
    createSlice,//创建切片
} from '@reduxjs/toolkit'
const lang = createSlice({
  name: "lang",
  initialState: {
    currentLocale: window.localStorage.getItem('currentLocale') || 'zh'
  },
  reducers:{ //改变action的方法   action:{payload:接受传进来的值}
    changeLang:(state,{payload})=>{
      state.currentLocale = payload.locale;
      window.localStorage.setItem("currentLocale", state.currentLocale)
    }
  }
});
export const {changeLang} = lang.actions;
export default lang.reducer;