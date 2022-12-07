/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-02 09:50:59
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-12-07 17:54:50
 * @FilePath: \gpn-sn-search\src\App.tsx
 */

import './App.less'
import { Routes, Route } from 'react-router-dom'
import Home from './views/home/index'
import About from './views/about/index'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import { IntlProvider } from 'react-intl'
// FormattedMessage
import { useEffect } from 'react'
import en from '@/i8n/locales/en'
import zh from '@/i8n/locales/zh'
import { useSelector } from 'react-redux'
function App() {
  const { currentLocale } = useSelector((state: any) => state.lang) //指向index.js下的test
  useEffect(() => {
    console.log(currentLocale)
  }, [currentLocale])
  const getMessageForLocale = (localeType: string) => {
    switch (localeType) {
      case 'en':
        return en
      case 'zh':
        return zh
    }
  }
  const getAntdForLocale = (localeType: string) => {
    switch (localeType) {
      case 'en':
        return enUS
      case 'zh':
        return zhCN
    }
  }
  return (
    <>
      <IntlProvider
        messages={getMessageForLocale(currentLocale)}
        locale={currentLocale}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00b96b',
            },
          }}
          locale={getAntdForLocale(currentLocale)}
        >
          {/* <div className='text-c'>
              <Link to="/">Home</Link>
              <Link className='ml10' to="/about">about</Link>
            </div> */}
          {/* <FormattedMessage key="appModule" id="appModule" /> */}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </ConfigProvider>
      </IntlProvider>
    </>
  )
}

export default App
