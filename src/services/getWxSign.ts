
import axios from 'axios';

export default function getWxSign() {
  let userAgent = navigator.userAgent;
  let isIos = userAgent.indexOf('iPhone') > -1;
  let url: any;
  if (isIos) {
    url = sessionStorage.getItem('url');
  } else {
    url = window.location.href;
  }
  return axios({
    url: 'http://test.api.supplier.tdianyi.com/wechat/getShareSign',
    method: 'get',
    params: {
      url
    }
  })
}
