import React, { Component } from 'react';
import router from 'umi/router';
import request from '@/services/request';
import { List, WingBlank, Flex, Button, Toast } from 'antd-mobile';

const Item = List.Item;
export default class MyInfo extends Component {
  state = {
    account_mobile: ''
  };
  componentDidMount (){
    request({
      url: 'v3/user',
      method: 'get',
    }).then(res => {
      let { data } = res;
      this.setState({
        username: data.account_name,
        account_mobile: data.mobile
      });
    })
  };

   /**修改密码去 */
  toChangePassword = () => {
    router.push('/storeInfo/change/changepassword')
  }
  /**去换绑手机 */
  toChangePhone = () => {
    router.push({
      pathname: '/storeInfo/change/changephone',
      query: {
        account_mobile: this.state.account_mobile
      }
    })
  }

  /**去店铺信息 */
  toStoreInfo = () => {
    router.push({
      pathname: '/storeInfo'
    })
  }

  /**退出登录 */
  logOut = () => {
    request({
      url: 'v3/logout',
      method: 'post',
    }).then(res => {
      let { data, code } = res;
      if (code == 200){
        Toast.success(data,2,()=>{
          localStorage.removeItem('token');
          router.push('/login');
        })
      }
    })
  }

  render (){
    const { account_mobile } = this.state
    return (
      <div style={{width: '100%', height: '100%', background: '#f8f8f8'}}>
        <List style={{marginTop:'22px'}}>
          <WingBlank>
            <Item extra="修改" arrow="horizontal" onClick={this.toChangePassword} style={{height: '1rem'}}>修改账户密码</Item>
            <Item extra={account_mobile} arrow="horizontal" onClick={this.toChangePhone} style={{height: '1rem'}}>换绑手机</Item>
          </WingBlank>
        </List>

        <List style={{marginTop:'22px'}}>
          <WingBlank>
            <Item arrow="horizontal" onClick={this.toStoreInfo} style={{height: '1rem'}}>我的店铺</Item>
          </WingBlank>
        </List>

        <WingBlank style={{marginTop: 200}}>
          <Button type='ghost' onClick={this.logOut}>退出登录</Button>
        </WingBlank>
      </div>
    )
  }
}
