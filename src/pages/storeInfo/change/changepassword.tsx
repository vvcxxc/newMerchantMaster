/**
 * 修改密码
 */
import React, { Component } from 'react';
import { Flex, Button, WingBlank, Toast, InputItem } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router'

export default class ChangePassword extends Component {
  state = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };
  handleOld = (e : any) => {
    this.setState({old_password : e});
  }
  handleNew = (e : any) => {
    this.setState({new_password : e});
  }
  handleConfirm = (e : any) => {
    this.setState({confirm_password : e});
  }

  /**确认修改 */
  confirm = () => {
    const { old_password, new_password, confirm_password } = this.state;
    request({
      url: 'v3/passwords',
      method: 'put',
      data: {
        old_password,
        confirm_password,
        new_password
      }
    }).then(res => {
      let {code, data} = res;
      if(code == 200){
        Toast.success(data,2, () => {
          router.push('/login');
        });
      }else{
        Toast.fail(data);
      }
    });
  }

  render (){
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }} className={styles.phonePages}>
        <Flex className={styles.inputBox}>
          <InputItem type={'password'} placeholder='请输入原密码' value={this.state.old_password} onChange={this.handleOld} clear />
        </Flex>
        <Flex className={styles.inputBox}>
           <InputItem type={'password'} placeholder='请输入不少于6位的密码' value={this.state.new_password} onChange={this.handleNew} clear />
        </Flex>
        <Flex className={styles.inputBox}>
          <InputItem type={'password'} placeholder='请再次输入新密码' value={this.state.confirm_password} onChange={this.handleConfirm} clear />
        </Flex>
        <WingBlank className={styles.buttons}>
            <Button type="primary" style={{ marginTop: 86 }} onClick={this.confirm}>
              确认修改
            </Button>
        </WingBlank>
      </div>
    )
  }
}
