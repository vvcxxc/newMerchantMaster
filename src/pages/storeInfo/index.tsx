/**
 * 门店信息
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, InputItem, List, Picker, ImagePicker, Button, Toast} from 'antd-mobile';
import router from 'umi/router';
import request from '@/services/request';
import MapPage from '@/components/map/index';
import upload from '@/services/oss';

const Item = List.Item;
export default class StoreInfo extends Component {
  state = {
    store_name: '',
    address: '',
    detailAddress: '',
    house_num: '',
    phone: '',
    value: [],
    manage_type: '',
    manage_list: [],
    store_head: [],
    store_img1: [],
    store_img2: [],
    store_img3: [],

    store_door_header_img: '',
    store_img_one: '',
    store_img_two: '',
    is_map: false,
    account_mobile: '',

    is_header: true,
    is_one: true,
    is_two: true,
    location: {
      longitude: 0,
      latitude: 0
    },
    email: '',
    preview: ''
  };
  componentDidMount (){
    /**获取经营品类 */
    request({
      url: 'v3/manage_type',
      method: 'get',
    }).then( res => {
      let { data } = res;
      this.setState({ manage_list : data });
    });
    request({
      url: 'v3/stores',
      method: 'get',
    }).then(res => {
      let {data} = res;
      let location = {
        longitude: data.xpoint,
        latitude: data.ypoint
      }
      this.setState({
        email: data.email,
        location,
        store_name: data.name,
        phone: data.tel,
        address: data.gaode_address,
        detailAddress: data.address,
        value: [data.manage_type],
        store_door_header_img: data.store_door_header_img,
        store_img_two: data.store_img_two,
        store_img_one: data.store_img_one,
        account_mobile: data.account_mobile,
        manage_type: data.manage_type,
        house_num: data.house_num
      },()=>{});
    })
  }


  /**经营类型的选择 */
  Checkout = (v : any) => {
    this.setState({ manage_type : v[0] });
    this.setState({ value : v });
  }
  /**设置门头照 */
  Storechange = (files: any) => {
    // this.setState({
    //   store_head: files,
    // });
    Toast.loading('')
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        Toast.hide()
        let store_door_header_img = res.data.path;
        this.setState({ store_head: files ,store_door_header_img})
      })
    }else {
      Toast.hide()
      this.setState({store_head: files, store_door_header_img: ''})
    }

  }
  /**设置环境照 */
  StoreImg1 = (files: any) => {
    // this.setState({
    //   store_img1: files,
    // });
    Toast.loading('')
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        Toast.hide()
        let store_img_one = res.data.path;
        this.setState({store_img1: files, store_img_one})
      })
    }else {
      Toast.hide()
      this.setState({store_img1: files, store_img_one: ''})
    }

  }
  StoreImg2 = (files: any) => {
    // this.setState({
    //   store_img2: files,
    // });
    Toast.loading('')
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        Toast.hide()
        let store_img_two = res.data.path;
        this.setState({ store_img2: files, store_img_two})
      })
    }else {
      Toast.hide()
      this.setState({store_img2: files, store_img_two: ''})
    }
  }


  handleStoreName = (e: any) => {
    this.setState({store_name: e})
  }
  handleHouseNum = (e: any) => {
    this.setState({house_num: e})
  }
  handlePhone = (e: any) => {
    this.setState({phone: e})
  }
  handleEmail = (e: any) => {
    if (e.includes(" ")) {
      e = e.replace(/ /g, "")
    }
    if(e.includes("＠")) {
      e = e.replace(/＠/g, "@")
    }
    this.setState({email: e});
  }


  /**地图的回调 */
  mapChange = (location: object, address: string) => {
    this.setState({
      location,
      address,
      detailAddress: address,
      is_map: false
    })
  }
  /**打开地图 */
  openMap = () => {
    this.setState({is_map: true});
  }

  closeHeaderImg = () => {
    this.setState({
      is_header: false,
      store_door_header_img: ''
    })
  }
  closeImgOne = () => {
    this.setState({
      is_one: false,
      store_img_one: ''
    })
  }
  closeImgTwo = () => {
    this.setState({
      is_two: false,
      store_img_two: ''
    })
  }

  handleChange = (val:any) => {
    this.setState({
      detailAddress: val
    })
  }


  save = () => {
    const { store_name, address, detailAddress ,house_num, phone, store_img_one, store_img_two, store_door_header_img, manage_type, location, email} = this.state;
    request ({
      url: 'v3/stores',
      method: 'put',
      data: {
        email,
        store_name,
        address:detailAddress,
        gaode_address: address,
        phone,
        manage_type,
        store_door_header_img,
        store_img_one,
        store_img_two,
        house_num,
        xpoint: location.longitude,
        ypoint: location.latitude
      }
    }).then(res => {
      let { code, data } = res;
      if(code == 200){
        Toast.success(data.msg,2,() => {
          router.goBack();
        });
      }else{
        Toast.fail(data.msg);
      }
    })
  }

  render (){
    const { store_head, store_img1, store_img2, store_name, address,detailAddress, house_num, phone, email, store_img_one, store_img_two, store_door_header_img} = this.state;
    const map = this.state.is_map == true ? (
      <MapPage onChange={this.mapChange} location={this.state.location} address={this.state.address}/>
    ) : (
      ''
    );

    const header_img = this.state.is_header == true ? (
      <div className={styles.header_img}>
        <img src={'http://oss.tdianyi.com/' + store_door_header_img} />
        <div className={styles.close} onClick={this.closeHeaderImg}>{''}</div>
      </div>
    ) : (
      <ImagePicker
        className={styles.img_picker}
        style={{ width: '100%'}}
        files={store_head}
        multiple={false}
        length={1}
        selectable={store_head.length < 1}
        onChange={this.Storechange}
      />
    );
    const store_one = this.state.is_one == true ? (
      <div className={styles.header_img}>
        <img src={'http://oss.tdianyi.com/' + store_img_one} />
        <div className={styles.close} onClick={this.closeImgOne}>{''}</div>
      </div>
    ) : (
      <ImagePicker
        className={styles.img_picker}
        style={{ width: '100%'}}
        files={store_img1}
        multiple={false}
        length={1}
        selectable={store_img1.length < 1}
        onChange={this.StoreImg1}
      />
    );
    const store_two = this.state.is_two == true ? (
      <div className={styles.header_img}>
        <img src={'http://oss.tdianyi.com/' + store_img_two} />
        <div className={styles.close} onClick={this.closeImgTwo}>{''}</div>
      </div>
    ) : (
      <ImagePicker
        className={styles.img_picker}
        style={{ width: '100%'}}
        files={store_img2}
        multiple={false}
        length={1}
        selectable={store_img2.length < 1}
        onChange={this.StoreImg2}
      />
    );



    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }}>
        <WingBlank className={styles.inputBox}>
          <List>
            <InputItem placeholder='门店名称' value={store_name} onChange={this.handleStoreName} clear>门店名称</InputItem>
            <InputItem placeholder='门店定位' onClick={this.openMap} value={address}>门店定位</InputItem>
            <InputItem placeholder='详细地址' onChange={this.handleChange} value={detailAddress}>详细地址</InputItem>
            <InputItem placeholder='请输入详细门牌号，如：5栋2楼401' value={house_num} onChange={this.handleHouseNum} clear>门牌号</InputItem>
            <InputItem placeholder='门店电话' value={phone} onChange={this.handlePhone} clear>门店电话</InputItem>
            <InputItem placeholder='邮箱' value={email} onChange={this.handleEmail} clear>邮箱</InputItem>
            <Flex className={styles.pickers}>
              <Picker
                style={{width : '100%', fontSize: '28px'}}
                data={this.state.manage_list}
                cols={1}
                onOk={this.Checkout}
                value={this.state.value}
              >
                <List.Item arrow="horizontal">经营品类</List.Item>
              </Picker>
            </Flex>
            <Flex className={styles.picker_img}>
              <div className={styles.picker_title}>
                门头照
              </div>
              <div>
                {header_img}
              </div>
            </Flex>
            <Flex className={styles.picker_img}>
              <div className={styles.picker_title}>环境照</div>
              <Flex style={{width: 'auto'}}>
                {store_one}
                {store_two}

              </Flex>
            </Flex>
          </List>
          <Button type='primary' className={styles.button} onClick={this.save}>保存</Button>
        </WingBlank>
        {map}
      </div>
    )
  }
}
