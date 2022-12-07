/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-02 09:50:59
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-16 13:45:17
 * @FilePath: \testproject\src\index.tsx
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './assets/styles/index.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
//  </React.StrictMode>
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
