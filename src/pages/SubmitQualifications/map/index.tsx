import React, { Component } from 'react'
import styles from './index.less'
import { Flex, PickerView } from 'antd-mobile'
import { Map, Marker, MouseTool } from 'react-amap';
import wx from "weixin-js-sdk";
import getWxSign from '@/services/getwxSign'
import request from '@/services/request';
import SelectCity from '@/components/selectCity'
import router from 'umi/router';

declare let AMap: any;



export default class MapPage extends Component<any> {
  geocoder: any
  mapSearch: any
  events = {
    created: (instance: any) => {
      const _this = this
      instance.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: false,        //显示定位按钮，默认：true
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
            city: "010",//城市，默认：“全国”
            extensions: 'all'
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
      this.geocoder && this.geocoder.getAddress([location.longitude, location.latitude], (status: string, result: any) => {
        const { city_list: list } = this.state
        if (status === 'complete') {
          if (result.regeocode) {
            let { value } = this.state
            const { addressComponent, formattedAddress } = result.regeocode
            value.county.id = addressComponent.adcode;
            value.county.name = addressComponent.district;
            let { province, city } = addressComponent
            for (let i in list) {
              if (list[i].name == province) {
                value.province.id = list[i].id
                value.province.name = list[i].name
                let city_list = list[i].city
                for (let a in city_list) {
                  if (city_list[a].name == city) {
                    value.city.id = city_list[a].id
                    value.city.name = city_list[a].name
                  }
                }
              }
            }

            this.setState({ location, value, store_address: formattedAddress, city_list: list, address_name: result.regeocode.pois[0].name })

          }
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
    city_list: [],
    is_show: false,
    store_address: '广东省广州市海珠区广州塔',
    value: { province: { id: 440000, name: '广东省' }, city: { id: 440100, name: '广州市' }, county: { id: 440105, name: '海珠区' } },
    search_list: [],
    is_search: false,
    address_name: '广州塔'
  }

  componentDidMount() {
    console.log('1111~~~',JSON.parse(localStorage.getItem('SubmitQualifications')) );

    let storage = JSON.parse(localStorage.getItem('SubmitQualifications')) || {};
    if (storage.store_address) {
      let location = {
        latitude: storage.lat,
        longitude: storage.lng,
      }
      request({ url: '/json/regions', method: 'GET' }).then(res => {
        let list = res.data
        let value = { province: { id: 0, name: '' }, city: { id: 0, name: '' }, county: { id: storage.county_id } }
        for (let i in list) {
          if (list[i].id == storage.province_id) {
            value.province.name = list[i].name
            value.province.id = list[i].id
            let city = list[i].city

            for (let a in city) {
              if (city[a].id == storage.city_id) {
                value.city.name = city[i].name
                value.city.id = city[i].id
                let district = city[i].district

                for (let b in district) {
                  if (district[b].id == storage.county_id) {
                    value.county.name = district[i].name
                    value.county.id = district[i].id
                  }
                }

              }
            }

          }
        }
        this.setState({ location, value, city_list: res.data, address: storage.store_address })
      })
    } else {
      this.getCity()

    }

  }

  getCity = async () => {
    let { data: list } = await request({ url: '/json/regions', method: 'GET' })
    this.setState({ city_list: list })
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
            const lnglat = [location.longitude, location.latitude]
            this.geocoder && this.geocoder.getAddress(lnglat, (status: string, result: any) => {
              console.log(result, 'rr')
              if (status === 'complete') {
                if (result.regeocode) {
                  let { value } = this.state
                  const { addressComponent, formattedAddress } = result.regeocode
                  value.county.id = addressComponent.adcode;
                  value.county.name = addressComponent.district;
                  let { province, city } = addressComponent
                  for (let i in list) {
                    if (list[i].name == province) {
                      value.province.id = list[i].id
                      value.province.name = list[i].name
                      let city_list = list[i].city
                      for (let a in city_list) {
                        if (city_list[a].name == city) {
                          value.city.id = city_list[a].id
                          value.city.name = city_list[a].name
                        }
                      }
                    }
                  }

                  this.setState({ location, value, store_address: formattedAddress, city_list: list, address_name: result.regeocode.pois[0].name })

                }
              }
            })
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
      city: this.state.value.city.name,
      extensions: 'all'
      // city: this.state.city_name //城市
    });
    if (value) {
      this.mapSearch.search(value, (status, result) => {
        console.log(status, result)
        if (status === 'complete') {
          let search_list = []
          let list = result.poiList.pois
          for (let i in list) {
            let address = ''
            if (list[i].adname != list[i].address) {
              address = list[i].pname + list[i].cityname + list[i].adname + list[i].address + list[i].name
            } else {
              address = list[i].pname + list[i].cityname + list[i].adname + list[i].name
            }
            list[i].address = address
            search_list.push(list[i])
          }
          this.setState({ search_list, is_search: true })
        }
      })
    } else {
      this.setState({ search_list: [], is_search: false })
    }

  }

  setProvinceCity = (type: string, list: any, province: string | number, city: string | number, county?: string | number) => {
    let value = { province: { name: '', id: 0 }, city: { name: '', id: 0 }, county: { name: '', id: 0 } }
    if (type === 'name') {
      for (let i in list) {
        if (list[i].name == province) {
          value.province.id = list[i].id
          value.province.name = list[i].name
          let city_list = list[i].city
          for (let a in city_list) {
            if (city_list[a].name == city) {
              value.city.id = city_list[a].id
              value.city.name = city_list[a].name
              if (county) {
                let county_list = city_list[a].district
                for (let b in county_list) {
                  if (county_list[b].name == county) {
                    value.county.name = county_list[b].name
                    value.county.id = county_list[b].id
                  }
                }
              }

            }
          }
        }
      }
    } else if (type === 'id') {
      for (let i in list) {
        if (list[i].id == province) {
          value.province.id = list[i].id
          value.province.name = list[i].name
          let city_list = list[i].city
          for (let a in city_list) {
            if (city_list[a].id == city) {
              value.city.id = city_list[a].id
              value.city.name = city_list[a].name
              if (county) {
                let county_list = city_list[a].district
                for (let b in county_list) {
                  if (county_list[b].id == county) {
                    value.county.name = county_list[b].name
                    value.county.id = county_list[b].id
                  }
                }
              }

            }
          }
        }
      }
    }
    return value
  }


  selectCity = (type: string, city: any) => {
    console.log(type, city)
    let { value } = this.state
    if (type === 'selected') {
      this.setState({ value: { ...value, ...city }, is_show: false }, () => {
        let address = this.state.value.province.name + this.state.value.city.name + this.state.value.county.name
        this.geocoder = new AMap.Geocoder({})
        this.geocoder.getLocation(address, (status, result) => {
          console.log(status, result)
          if (status === 'complete') {
            this.setState({
              location: { latitude: result.geocodes[0].location.lat, longitude: result.geocodes[0].location.lng }, store_address: address, address_name: address
            })
          }

        })
      })

    } else {
      this.setState({ is_show: false })
    }
  }

  chooseItem = (item: any) => {
    let { city_list } = this.state
    let value = this.setProvinceCity('name', city_list, item.pname, item.cityname)
    value.county.name = item.adname
    value.county.id = item.adcode
    console.log(item)
    this.setState({ location: { latitude: item.location.lat, longitude: item.location.lng }, value, address_name: item.name, store_address: item.address, is_search: false })

  }

  submit = () => {
    const { value, store_address, location } = this.state;    
    let storage = JSON.parse(localStorage.getItem('SubmitQualifications')) || {}
    storage.storeAddress = store_address;
    storage.province_id = value.province.id;
    storage.city_id = value.city.id;
    storage.county_id = value.county.id;
    storage.lng = location.longitude;
    storage.lat = location.latitude;
    localStorage.setItem('SubmitQualificationsTime', JSON.stringify(new Date().getTime()));
    localStorage.setItem('SubmitQualifications', JSON.stringify(storage));
    router.goBack()
  }

  render() {

    const { location, value, is_show, store_address, search_list, is_search, address_name } = this.state
    const plugins = [
      // 'Scale',
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          // onCreated(ins: any) { console.log(ins)},
        },
      }
    ];
    return (
      <div className={styles.map_page}>
        <div id='container' className={styles.container}>
          <Flex className={styles.search_box}>
            <Flex className={styles.select_city} onClick={() => this.setState({ is_show: true, is_search: false })}>
              <div className={styles.city_name}>{value.city.name}</div>
              <img src={require('@/assets/down.png')} alt="" />
            </Flex>
            <div className={styles.input_box}>
              <input type="text" onChange={this.inputChange} />
            </div>
            {
              is_search ? <div className={styles.search_list}>
                {
                  search_list.map(item => {
                    return (
                      <Flex className={styles.search_item} key={item.id} onClick={this.chooseItem.bind(this, item)}>
                        <img src={require('@/assets/address.png')} alt="" />
                        <Flex className={styles.address_info} direction='column' align='start'>
                          <div className={styles.address_name}>{item.name}</div>
                          <div className={styles.address}>{item.address}</div>
                        </Flex>
                      </Flex>
                    )
                  })
                }

              </div> : null
            }

          </Flex>
          <div className={styles.map_box}>
            <Map version={'1.4.15'} center={location} events={this.events} amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'} zoom={16} plugins={plugins} >
              {
                location ? <Marker position={location} /> : null
              }

            </Map>
          </div>

          <Flex className={styles.address_box} justify='between'>
            <Flex className={styles.address} direction='column' align='start'>
              <div className={styles.address_name}>{address_name}</div>
              <div>{store_address}</div>
            </Flex>
            <Flex align='center' justify='center' onClick={this.submit} className={styles.address_button}>确认</Flex>
          </Flex>
          {
            is_show ? <SelectCity list={this.state.city_list} value={[value.province.name, value.city.name, value.county.name]} onChange={this.selectCity} /> : null
          }



        </div>
      </div>
    )
  }
}
