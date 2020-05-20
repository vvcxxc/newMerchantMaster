/**
 * 门店地址
 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button, Icon, InputItem, PickerView } from 'antd-mobile';
import { Map, Marker, MouseTool } from 'react-amap';
import request from '@/services/request';
import axios from 'axios';
import wx from "weixin-js-sdk";
import { connect } from 'dva';
import router from 'umi/router';
import Cookies from 'js-cookie';
declare const Environment: string
export default connect(({ createStore }: any) => createStore)(
  class MapPage extends Component<any> {
    geocoder: any;
    msearch: any;
    state = {
      city_list: [],
      // 城市选择页
      is_show: false,
      // picker的value
      value: ['广东省', '广州市', '天河区'],
      // picker选好的值
      city: ['广东省', '广州市', '天河区'],
      // 城市名称
      city_name: '广州',
      // 省市区
      province: '',
      // 经纬度
      location: {
        longitude: 113.3348617553711,
        latitude: 23.18288803100586
      },
      address: '',
      is_map: true,
      search_list: [{
        name: '',
        address: ''
      }],
      searchList: [{
        name: '',
        address: ''
      }],
      // 行政区
      district: '',
      search: '',
      search_words: '',
      is_search: true,

      // 添加点击选中样式
      active_style: {
        color: '#FF6654'
      },
      index: null,
      active_best_style: {
        color: '#FF6654'
      },
      addressItem: {}
    };

    componentDidMount() {
      axios({
        url: 'http://api.tdianyi.com/v3/district',
        method: 'get'
      }).then(res => {
        this.setState({
          city_list: res.data.data
        })
      });
      let userAgent = navigator.userAgent;
      let isIos = userAgent.indexOf('iPhone') > -1;
      let url: any;
      if (isIos) {
        url = sessionStorage.getItem('url');
      } else {
        url = location.href;
      }
      request({
        url: 'wechat/getShareSign',
        method: 'get',
        params: {
          url
        }
      }).then(res => {
        let _this: any = this;
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
            success: function (res: any) {
              let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              let location = {
                latitude,
                longitude
              };
              console.log(res)
              if(Cookies.get('handleAddress')) {
                let address = Cookies.get('handleAddress') || ""
                address = address.replace(/\"/g,"")
                let location = JSON.parse(Cookies.get('handleLocation'))
                console.log(address,'sss')
                _this.setState({ location,address });
                _this.props.dispatch({
                  type: 'createStore/setStore',
                  payload: {
                    location,
                    address
                  }
                })
                _this.createSearch(address);
                return
              }
              console.log(Cookies.get('handleAddress'))
              const lnglat = [longitude, latitude]
              _this.geocoder && _this.geocoder.getAddress(lnglat, (status: string, result: any) => {
                if (status === 'complete') {
                  if (result.regeocode) {
                    _this.createSearch(result);
                    let res = result.regeocode.addressComponent
                    let province = res.province + res.city + res.district;
                    console.log(result,'result.regeocode')
                    _this.setState({
                      province,
                      location,
                      value: [res.province, res.city, res.district],
                      city: [res.province, res.city, res.district],
                      district: result.regeocode.addressComponent.district,
                      address: result.regeocode.formattedAddress || '未知地点',
                      city_name: result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
                    });
                    _this.props.dispatch({
                      type: 'createStore/setStore',
                      payload: {
                        location,
                      }
                    })
                  } else {
                    _this.setState({
                      address: '未知地点'
                    });
                  }
                } else {
                  _this.setState({
                    address: '未知地点'
                  });

                }
              })
            },
          });

        })
      });
    }

    handleChangeCity = (e: any) => {
      this.setState({ value: e })
    }

    pickerCityClose = () => {
      this.setState({ is_show: false, value: [] });
    }
    pickerCityOpen = () => {
      this.setState({ is_show: true })
    }
    pickerCityOk = () => {
      let { value } = this.state;
      let city_name = value[1];
      let province = '';
      for (let i = 0; i < value.length; i++) {
        province += value[i]
      }

      let that = this;
      let keywords = province;
      this.msearch = new AMap.PlaceSearch({
        pageSize: 5,
        pageIndex: 1,
        // city: '广州'
        city: city_name //城市
      });
      this.msearch.search(keywords, function (status: any, result: any) {
        let one = result.poiList.pois[0]
        let location = {
          longitude: one.location.lng,
          latitude: one.location.lat
        }
        that.setState({
          address: one.address,
          district: one.address,
          searchList: result.poiList.pois,
          location
        })

      })





      this.setState({
        is_show: false,
        city: this.state.value,
        city_name,
        province
      })
    };
    /**地图页初始化搜索 */
    createSearch = (result: any) => {
      // alert('ok')
      let _this = this;
      // if(Environment == 'local'){
      //   setTimeout(()=>{
      //     this.msearch = new AMap.PlaceSearch({
      //       pageSize: 5,
      //       pageIndex: 1,
      //       city: '广州市'
      //     });

      //     this.msearch.search('大石', function (status: any, result: any) {
      //       _this.setState({
      //         searchList: result.poiList.pois
      //       })
      //     })
      //   },2000)

      //   return
      // }
      let keywords = {}
      if(typeof(result) != 'string'){
        let { city, district, street } = result.regeocode.addressComponent
        this.msearch = new AMap.PlaceSearch({
          pageSize: 5,
          pageIndex: 1,
          city
        });
        keywords = city + district + street;
      }else {
        keywords = result
        this.msearch = new AMap.PlaceSearch({
          pageSize: 5,
          pageIndex: 1,
          // city
        });
      }

      this.msearch.search(keywords, function (status: any, result: any) {
        console.log(result.poiList.pois,'searchList')
        _this.setState({
          searchList: result.poiList.pois
        })
      })
    }


    search = (e: any) => {
      let that = this;
      let keywords = e;
      this.msearch = new AMap.PlaceSearch({
        pageSize: 10,
        pageIndex: 1,
        // city: '广州'
        city: this.state.city_name //城市
      });
      this.setState({ search_words: e });
      this.msearch.search(keywords, function (status: any, result: object) {
        if (result.poiList) {
          console.log(result.poiList.pois,'result.poiList.pois')
          that.setState({
            is_search: true,
            search_list: result.poiList.pois
          })
        } else {
          that.setState({
            search_list: [],
            is_search: false
          })
        }

      })
    }

    chooseOne = async (item: any, idx: any) => {
      if(item.name){

        let location = {
          longitude: item.location.lng,
          latitude: item.location.lat
        }
        await this.setState({
          index: idx,
          active_best_style: {},
          addressItem: item,
        })
        let name = item.name;
        let province = this.state.city[0];
        let address = item.address;
        let city = this.state.city_name;
        let Address = province + city + address + name;
        // this.createSearch(Address);
        // Cookies.set("handleAddress", JSON.stringify(Address), { expires: 1 });
        // Cookies.set("handleLocation", JSON.stringify(location), { expires: 1 });
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            location,
            address: Address,
            map: {
              address: Address
            }
          }
        })
      }
    }
    chooseBest = async () => {
      await this.setState({
        index: null,
        active_best_style: {
          color: '#FF6654'
        },
        addressItem: {}
      })
      console.log(3232)
      let location = this.state.location;
      let address = this.props.address;
      if(location && address){
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            location,
            address,
            map: {
              address
            }
          }
        })
      }
      // Cookies.set("handleAddress", JSON.stringify(address), { expires: 1 });
      // Cookies.set("handleLocation", JSON.stringify(location), { expires: 1 });


      // router.push('/createStore')
    }

    chooseSearch = (item: any) => {
      let _this = this;
      let location = {
        longitude: item.location.lng,
        latitude: item.location.lat
      }
      AMap.plugin('AMap.Geocoder', () => {
        _this.geocoder = new AMap.Geocoder({
          city: "010"//城市，默认：“全国”
        })
      })
      console.log(item,'sss')
      let lnglat = [location.longitude, location.latitude]
      _this.geocoder && _this.geocoder.getAddress(lnglat, (status: any, result: any) => {
        console.log(result.regeocode,'sss')
        let res = result.regeocode.addressComponent
        let province = res.province + res.city + res.district;
        _this.setState({
          province,
          value: [res.province, res.city, res.district],
          city: [res.province, res.city, res.district],
          district: result.regeocode.addressComponent.district,
          address: province + item.address + item.name || '未知地点',
          city_name: result.regeocode.addressComponent.city || result.regeocode.addressComponent.province,
          // 选择地点后回到地图
          is_map: true,
          location
        }, () => {
          let address = this.state.address;
          // this.props.onChange(location,address);
          this.createSearch(address);
          Cookies.set("handleAddress", JSON.stringify(address), { expires: 1 });
          Cookies.set("handleDetailAddress", JSON.stringify(address), { expires: 1 });
          Cookies.set("handleLocation", JSON.stringify(location), { expires: 1 });
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              location,
              address,
              map: {
                address
              }
            }
          })
          // router.push('/createStore')
        });
      })

    }


    clickAddress = () => {
      this.setState({ is_map: !this.state.is_map }, () => {
        if(!this.state.is_map) {
          this.refs.searchREF.focus()
        }
      })
    }

    handleSaveAddress = () => {
      const { addressItem } = this.state;
      if (JSON.stringify(addressItem) == "{}") {
        let location = this.state.location;
        let address = this.state.address;
        Cookies.set("handleAddress", JSON.stringify(address), { expires: 1 });
        Cookies.set("handleDetailAddress", JSON.stringify(address), { expires: 1 });
        Cookies.set("handleLocation", JSON.stringify(location), { expires: 1 });
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            location,
            address,
            map: {
              address
            }
          }
        })
      } else {
        let location = {
          longitude: addressItem.location.lng,
          latitude: addressItem.location.lat
        }
        let name = addressItem.name;
        let province = this.state.city[0];
        let address = addressItem.address;
        let city = this.state.city_name;
        let Address = province + city + address + name;
        Cookies.set("handleAddress", JSON.stringify(Address), { expires: 1 });
        Cookies.set("handleDetailAddress", JSON.stringify(Address), { expires: 1 });
        Cookies.set("handleLocation", JSON.stringify(location), { expires: 1 });
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            location,
            address: Address,
            map: {
              address: Address
            }
          }
        })
      }

      router.push('/createStore')
    }


    render() {
      const picker = this.state.is_show == true ? (
        <div className={styles.picker}>
          <Flex className={styles.picker_buttons}>
            <span onClick={this.pickerCityClose}>取消</span>
            <span onClick={this.pickerCityOk}>完成</span>
          </Flex>
          <PickerView
            onChange={this.handleChangeCity}
            data={this.state.city_list}
            value={this.state.value}
          />
        </div>
      ) : (
          ''
        );
      const { city_name, province } = this.state;
      const { location } = this.props;

      let that = this;
      const plugins = [
        'Scale',
        {
          name: 'ToolBar',
          options: {
            visible: true,  // 不设置该属性默认就是 true
            onCreated(ins: any) { },
          },
        }
      ];

      // let onComplete=(data: any)=>{
      //   let res = data.addressComponent;
      //   let province = res.province + res.city + res.district;
      //   that.setState({
      //       province,
      //       city: [res.province, res.city, res.district],
      //       value: [res.province, res.city, res.district],
      //       location: {
      //         latitude: data.position.getLat(),
      //         longitude: data.position.getLng()
      //       }
      //   })
      // };
      // let onError = ()=>{
      //     alert('定位失败');
      // };
      const _this = this;
      const events = {
        created: (instance: any) => {
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
            // AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
          });
          AMap.plugin('AMap.Geocoder', () => {
            _this.geocoder = new AMap.Geocoder({
              city: "010"//城市，默认：“全国”
            })
          })
          AMap.plugin('AMap.PlaceSearch', () => {
            this.msearch = new AMap.PlaceSearch({
              pageSize: 10,
              pageIndex: 1,
              city: this.state.city_name //城市
            });
          })
        },
        click: (e: any) => {
          console.log(333)
          this.setState({
            location: {
              longitude: e.lnglat.lng,
              latitude: e.lnglat.lat
            }
          });
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              location: {
                longitude: e.lnglat.lng,
                latitude: e.lnglat.lat
              }
            }
          })
          const lnglat = e.lnglat;
          _this.geocoder && _this.geocoder.getAddress(lnglat, (status: any, result: any) => {
            if (status === 'complete') {
              if (result.regeocode) {
                _this.createSearch(result);
                let res = result.regeocode.addressComponent
                let province = res.province + res.city + res.district;
                _this.setState({
                  province,
                  value: [res.province, res.city, res.district],
                  city: [res.province, res.city, res.district],
                  district: result.regeocode.addressComponent.district,
                  address: result.regeocode.formattedAddress || '未知地点',
                  city_name: result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
                });
              } else {
                _this.setState({
                  address: '未知地点'
                });
              }
            } else {
              _this.setState({
                address: '未知地点'
              });
            }
          })
        },
      };


      const list_item = this.state.search_list.map((item, idx) => {
        return (
          <div className={styles.list_item} key={idx} onClick={this.chooseSearch.bind(this, item)}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.address}>{item.address}</p>
          </div>
        )
      });
      const is_sear = this.state.is_search == true ? (
        <div>{list_item}</div>
      ) : (
          <Flex justify='around' style={{ color: '#999' }}>"{this.state.search_words}"无搜索结果，请确认您填写的地址</Flex>
        )
      const searchList = this.state.searchList.length ? this.state.searchList.map((item, idx) => {
        return (
          <div className={styles.list_item} key={idx} onClick={this.chooseOne.bind(this, item, idx)} style={idx == this.state.index ? this.state.active_style : {}}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.address}>{item.address}</p>
          </div>
        )
      }) : null


      const map = this.state.is_map == true ? (
        <div className={styles.box}>
          <WingBlank>
            <Flex className={styles.inputWrap}>

              <div className={styles.city}>
                <div className={styles.city_name} onClick={this.pickerCityOpen}>{city_name}</div>
                <div className={styles.icon}>
                  <Icon type='down' color='#000' size='xxs' />
                </div>
              </div>

              <Flex className={styles.inputBox} >
                <Flex onClick={this.clickAddress} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Icon type='search' color='#000' size='xxs' className={styles.search_icon} />
                  <span className={styles.search_address}>搜索地址</span>
                </Flex>
              </Flex>

              <button className={styles.save_address} onClick={this.handleSaveAddress.bind(this)}>保存</button>
            </Flex>
          </WingBlank>
          <Flex direction='column'>
            <div className={styles.mapBox}>
              {console.log('location',location)}
              {
                events ?
                 <Map events={events} amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'} plugins={plugins} zoom={18} center={location}>
                {
                  location ? (
                    <Marker position={location} />
                  ) : null
                }
              </Map>
              : null
              }

            </div>
            {picker}
            <div className={styles.searchList}>
              <div className={styles.list_item} onClick={this.chooseBest} style={this.state.active_best_style}>
                <p className={styles.name}>{this.state.address}</p>
                <p className={styles.address}>{this.state.district}</p>
                <div className={styles.iconMap}><img src={require("./iconMap.png")} /></div>
              </div>
              {searchList}
            </div>
          </Flex>

        </div>
      ) : (
          <div className={styles.box}>
            <WingBlank>
              <Flex className={styles.inputWrap}>

                <div className={styles.city}>
                  <div className={styles.city_name} onClick={this.pickerCityOpen}>{city_name}</div>
                  <div className={styles.icon}>
                    <Icon type='down' color='#000' size='xxs' />
                  </div>
                </div>

                <Flex className={styles.inputBox_search}>
                  <Flex>
                    <InputItem
                      placeholder='搜索地址'
                      style={{ textAlign: 'center' }}
                      onChange={this.search}
                      ref="searchREF"
                    />
                  </Flex>
                </Flex>
                <div className={styles.search_close} onClick={this.clickAddress}>取消</div>
              </Flex>
            </WingBlank>
            {/* <Flex direction='column'>
              <div className={styles.mapBox}>
                <Map events={events} amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'} plugins={plugins} zoom={18} center={location}>
                  {
                    location ? (
                      <Marker position={location} />
                    ) : null
                  }
                </Map>
              </div>
              {picker}
              <div className={styles.searchList}>
                <div className={styles.list_item} onClick={this.chooseBest} style={this.state.active_best_style}>
                  <p className={styles.name}>{this.state.address}</p>
                  <p className={styles.address}>{this.state.district}</p>
                  <div className={styles.iconMap}><img src={require("./iconMap.png")} /></div>
                </div>
                {searchList}
              </div>
            </Flex> */}
            <div className={styles.list}>
              {is_sear}
            </div>
            {picker}
          </div>
        )



      return (
        <div>{map}</div>
      )
    }
  }
)


