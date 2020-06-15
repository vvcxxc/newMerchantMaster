import React, { Component } from 'react'
import styles from './index.less'
import { Map, Marker, MouseTool } from 'react-amap';
import wx from "weixin-js-sdk";
import getWxSign from '@/services/getwxSign'
export default class MapPage extends Component {
  state = {
    is_map: false
  }

  componentWillMount() {
    // let html = document.getElementsByTagName('html')
    // // html[0].style.fontSize = '1px'
    // html[0].style.fontSize = '100px'
    // this.setState({is_map: true})
    // document.getElementsByTagName('meta')[1].content = 'initial-scale=1.0, user-scalable=no'
  }

  componentDidMount() {


    getWxSign().then(res => {
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: [
          "getLocation",
          "openLocation"
        ]
      });

      wx.ready(() => {
        wx.getLocation({
          type: 'gcj02',
        })
      })



    })
  }


  render() {
    return (
      <div className={styles.map_page}>
        <div id='container' className={styles.container}>
          <div className={styles.search_box}>213</div>
          <Map version={'1.4.15'} amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'} zoom={20} />
        </div>
      </div>
    )
  }
}
