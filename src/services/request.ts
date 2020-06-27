
import axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import { Toast } from 'antd-mobile';
import { phoneLogin } from './api'
import QS from 'qs';

interface Options extends AxiosRequestConfig {
  /**替换的主机域名 */
  host?: string;
}

declare global {
  interface Window { api: string; }
}

const host = window.api ? window.api : 'http://test.api.supplier.tdianyi.com/';

/**发起请求
 *
 * 使用axios为底层方法
 *
 * 必要参数参考axios
 */
export default function request(options: Options) {
  const token = localStorage.getItem('token');
  options.headers = { ...options.headers, Authorization: token };
  if (!options.url.includes('http')) {
    options.url = options.host ? options.host + options.url : host + options.url;
  }
  return axios(options)
    .then(res => {
      console.log(res.data, 'datata')
      return res.data
    })
    .catch(async err => {
      Toast.hide();
      if (err.response && err.response.status === 401) {
        const permitCode = localStorage.getItem('permitCode');
        if (permitCode) {
          // 刷新登录
          try {
            let option = options
            let res = await phoneLogin(permitCode)
            if (res.data) {
              localStorage.setItem('token', 'Bearer ' + res.data.access_token)
              return request(option)
            }
          } catch (error) {
            router.push('/login');
          }

        } else {
          router.push('/login');
        }
      }
      if (err.response && err.response.status !== 401) {
        if (err.response.data.code && err.response.data.code === 10103) {
          router.push('/login');
          return
        }
        Toast.fail(err.response.data.message, 1);
        return new Promise(() => { });
      }
    });
}
