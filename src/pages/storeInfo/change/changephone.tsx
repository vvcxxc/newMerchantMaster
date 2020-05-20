import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button, Toast, InputItem } from 'antd-mobile';
import request from '@/services/request';
import router from 'umi/router'


let timer = null;
export default class ChangePhone extends Component {
  state = {
    steps: true,
    /**旧手机号 */
    old_phone: '',
    /**第一步验证码 */
    code1: '',
    /**新手机号 */
    new_phone: '',
    /**第二部验证码 */
    code2: '',
    is_ok: true,
    wait: '',
    errorCode1: false,
    errorPhone2: false,
    errorCode2: false
  };
  componentDidMount() {
    this.setState({
      old_phone: this.props.location.query.account_mobile
    })
  }
  handleCode1 = (e: any) => {
    this.setState({ code1: e })
  }
  handleNew = (e: any) => {
    this.setState({ new_phone: e })
  }
  handleCode2 = (e: any) => {
    this.setState({ code2: e })
  }
  /**下一步 */
  confirm1 = () => {
    if (!this.state.code1||this.state.code1.length!=6) {
      this.setState({ errorCode1: true });
      return
    } else {
      this.setState({ errorCode1: false });
    }
    const { old_phone, code1 } = this.state;
    request({
      url: 'v3/phones/step_one',
      method: 'get',
      params: {
        phone: old_phone,
        verify_code: code1
      }
    }).then(res => {
      const { code, data } = res;
      clearInterval();
      if (code == 200) {
        Toast.success(data)
        clearInterval(timer);
        this.setState({ steps: false, is_ok: true, wait: '' });
      } else {
        Toast.fail(data);
      }
    })

  }

  /**完成 */
  confirm2 = () => {
    let haveerr = false;
    if (!this.state.new_phone || !(/^1[3456789]\d{9}$/.test(this.state.new_phone))) {
      this.setState({ errorPhone2: true });
      haveerr = true;
    } else {
      this.setState({ errorPhone2: false });
    }
    if (!this.state.code2||this.state.code2.length!=6) {
      this.setState({ errorCode2: true });
      haveerr = true;
      return
    } else {
      this.setState({ errorCode2: false });
    }
    if (haveerr) {
      return;
    }
    const { new_phone, code2 } = this.state;
    request({
      url: 'v3/phones/step_two',
      method: 'put',
      data: {
        phone: new_phone,
        verify_code: code2
      }
    }).then(res => {
      const { code, data } = res;
      if (code == 200) {
        Toast.success(data, 2, () => {
          router.goBack();
        })
      } else {
        Toast.fail(data);
      }
    })
  }

  /**
 * 获取验证码1
 */
  getCode = (phone: string) => {
    let wait = 60;
    if (phone) {
      Toast.loading('',6000)
      request({
        url: 'v3/verify_code',
        method: 'get',
        params: {
          phone: phone,
        }
      }).then(res => {
        let { code } = res;
        if (code == 200) {
          timer = setInterval(() => {
            Toast.hide()
            if (wait == 0) {
              this.setState({ is_ok: true, wait: '' });
              clearInterval(timer);
            } else {
              wait--;
              this.setState({ is_ok: false, wait });
            }
          }, 1000);
        } else {
        Toast.hide()
          Toast.fail(res.data)
        }
      }).catch(()=>{
        Toast.hide()
      });
    } else {
      Toast.fail('请输入手机号', 1)
    }
  }



  render() {
    const code = this.state.is_ok == true ? (
      <div className={styles.code} onClick={this.getCode.bind(this, this.state.old_phone)}>获取验证码</div>
    ) : (
        <div className={styles.code} style={{ color: '#999' }}>{this.state.wait}</div>
      )

    const codes = this.state.is_ok == true ? (
      <div className={styles.code} onClick={this.getCode.bind(this, this.state.new_phone)}>获取验证码</div>
    ) : (
        <div className={styles.code} style={{ color: '#999' }}>{this.state.wait}</div>
      )


    const step1 = this.state.steps == true ? (
      <div className={styles.phonePages}>
        <Flex className={styles.header}>
          <Flex className={styles.actives}>
            <div className={styles.num}>1</div>验证身份
          </Flex>
          <Flex className={styles.no_actives}>
            <div className={styles.num}>2</div>验证新手机
          </Flex>
        </Flex>
        <Flex className={styles.inputRow}>
          当前手机号：{this.state.old_phone}
        </Flex>
        <Flex className={styles.inputRow}>
          <InputItem type="text" placeholder="请输入验证码" value={this.state.code1} onChange={this.handleCode1} maxLength={6} clear />
          {code}
        </Flex>
        {
          this.state.errorCode1 ? <div className={styles.errorLine}>请输入正确6位数字验证码</div> : null
        }

        <WingBlank className={styles.buttons}>
          <Button type="primary" style={{ marginTop: 86 }} onClick={this.confirm1}>
            下一步
          </Button>
        </WingBlank>
      </div>
    ) : (
        <div className={styles.phonePages}>
          <Flex className={styles.header}>
            <Flex className={styles.no_actives}>
              <div className={styles.num}>1</div>验证身份
            </Flex>
            <Flex className={styles.actives}>
              <div className={styles.num}>2</div>验证新手机
            </Flex>
          </Flex>

          <Flex className={styles.inputRow}>
            <InputItem type="text" placeholder="请输入新手机号" value={this.state.new_phone} onChange={this.handleNew} />
          </Flex>
          {
            this.state.errorPhone2 ? <div className={styles.errorLine}>请输入正确11位手机号码</div> : null
          }
          <Flex className={styles.inputRow}>
            <InputItem type="text" placeholder="请输入验证码" value={this.state.code2} maxLength={6} onChange={this.handleCode2} />
            {codes}
          </Flex>
          {
            this.state.errorCode2 ? <div className={styles.errorLine}>请输入正确6位数字验证码</div> : null
          }
          <WingBlank className={styles.buttons}>
            <Button type="primary" style={{ marginTop: 86 }} onClick={this.confirm2}>
              确认修改
            </Button>
          </WingBlank>
        </div>
      )
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }}>
        {step1}
      </div>
    )
  }
}
