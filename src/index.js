import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'

import{
  LocaleProvider
}from 'antd'

import zhCN from 'antd/lib/locale-provider/zh_CN';

import store from './store'
import * as http from "@/api"

React.Component.prototype.http = http

ReactDOM.render(
  <Provider store = {store}>
    <LocaleProvider locale={zhCN}>   
      <App />
    </LocaleProvider>
  </Provider>,

  document.getElementById('root')
);
