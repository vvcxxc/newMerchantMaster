import React, { Component } from 'react'
import styles from './index.less'
import { Flex, PickerView } from 'antd-mobile'
import { Map, Marker, MouseTool } from 'react-amap';
import wx from "weixin-js-sdk";
import getWxSign from '@/services/getwxSign'
import request from '@/services/request';
import SelectCity from '@/components/selectCity'

declare let AMap: any;



export default class MapPage extends Component<any> {
  geocoder: any
  mapSearch: any
  events = {
    created: (instance: any) => {
      console.log(this, 'this')
      const _this = this
      instance.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(14, 130),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        instance.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.plugin('AMap.PlaceSearch')
        AMap.plugin('AMap.Geocoder', () => {
          _this.geocoder = new AMap.Geocoder({
            city: "010"//城市，默认：“全国”
          })
        })

      });
    },
    click: (e: any) => {
      let location = {
        latitude: e.lnglat.lat,
        longitude: e.lnglat.lng,
      }
      this.setState({ location })
      this.geocoder.getAddress([location.longitude, location.latitude], (status: string, result: any) => {
        // console.log(status, result)
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          let address = result.regeocode.formattedAddress
          console.log(result.regeocode)
        }
      })
    }
  }

  state = {
    is_map: false,
    location: {
      latitude: 23.106321,
      longitude: 113.324518,
    },
    city_list: []
  }

  componentDidMount() {

    request({
      url: '/json/regions',
      method: 'GET'
    }).then(res => {
      // let list = JSON.stringify(res.data)
      // let a = list.replace(/name/g, "label")
      // let b = a.replace(/id/g, "value")
      // let c = b.replace(/city/g, "children")
      // console.log(JSON.parse(c))
      this.setState({ city_list: res.data })
    })

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
          success: (res: any) => {
            let location = {
              latitude: res.latitude,
              longitude: res.longitude
            }
            this.setState({ location })

          }
        })
      })



    })
  }

  inputChange = (e: any) => {
    console.log(e.target.value)
    const value = e.target.value
    this.mapSearch = new AMap.PlaceSearch({
      pageSize: 10,
      pageIndex: 1,
      city: '广州'
      // city: this.state.city_name //城市
    });
    this.mapSearch.search(value, (status, result) => {
      console.log(status, result)
    })
  }

  render() {

    const { location } = this.state
    const plugins = [
      // 'Scale',
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          onCreated(ins: any) { },
        },
      }
    ];
    return (
      <div className={styles.map_page}>
        <div id='container' className={styles.container}>
          <Flex className={styles.search_box}>
            <Flex className={styles.select_city}>
              广州市
              <img src={require('@/assets/down.png')} alt="" />
            </Flex>
            <div className={styles.input_box}>
              <input type="text" onChange={this.inputChange} />
            </div>
          </Flex>
          <div className={styles.map_box}>
            <Map version={'1.4.15'} center={location} events={this.events} amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'} zoom={16} plugins={plugins} >
              {
                location ? <Marker position={location} /> : null
              }

            </Map>
          </div>

          <div className={styles.address_box}>

          </div>
          <SelectCity list={this.state.city_list}/>


        </div>
      </div>
    )
  }
}
