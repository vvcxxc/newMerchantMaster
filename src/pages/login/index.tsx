import React, { Component } from 'react'
import styles from './index.less'
import { Toast, Flex } from 'antd-mobile'
import { sendVerificationCode, verifyPhoneCode, phoneLogin } from './service'
import router from 'umi/router';

let timer = null;
export default class Login extends Component {
  state = {
    phone: '',
    is_send: false,
    code_list: ['', '', '', '', '', ''],
    code: '',
    blink_idx: null, // 光标位置
    is_confirm: false, // 确认按钮颜色
    step: 1, // 登录步骤1是输入手机号，2是输入验证码
    time: 5,
    code_key: '', // 校验短信需要
    expired_at: '', // 验证码有效期
    permitCode: '', // 短信校验通过码,所有需要验证短信接口需要

  }
  input = React.createRef();

  componentDidMount() {

  }

  phoneChange = (e: any) => {
    let value = e.target.value
    const reg = /^\d{0,11}$/
    const reg1 = /^1[3456789]\d{9}$/
    if ((reg.test(value))) {
      if (reg1.test(value)) {
        this.setState({ is_send: true })
      } else {
        this.setState({ is_send: false })
      }
      this.setState({ phone: value })
    }
  }

  sendCode = () => {
    const { phone } = this.state
    if (phone) {
      Toast.loading('')
      sendVerificationCode(phone).then(res => {
        Toast.hide()
        this.countDown()
        this.setState({
          code_key: res.data.code_key,
          expired_at: res.data.expired_at,
          step: 2,
          code: '',
          code_list: ['', '', '', '', '', ''],
          is_confirm: false
        }, () => {
          this.input.current.focus();
          const { code } = this.state
          this.setState({ blink_idx: code.length })
        })
      }).catch(err => {
        Toast.hide()
      })


    } else {
      Toast.fail('请输入手机号')
    }

  }

  codeChange = (e) => {
    let value = e.target.value
    const reg = /^\d{0,6}$/
    let code_list = ['', '', '', '', '', '']
    if (reg.test(value)) {
      for (let i in value) {
        code_list[i] = value[i]
      }

      this.setState({ code: value, code_list, blink_idx: value.length, is_confirm: value.length === 6 })
    }
  }

  // 获取焦点
  focus = (e: any) => {
    this.input.current.focus();
    const { code } = this.state
    this.setState({ blink_idx: code.length })
    e.stopPropagation()
  }

  // 模拟失去焦点
  onBlur = () => {
    this.setState({ blink_idx: null })
  }

  // 倒计时
  countDown = () => {
    let time = this.state.time
    if (time > 1) {
      timer = setInterval(() => {
        if (time < 1) {
          clearInterval(timer)
          return
        }
        time = time - 1
        this.setState({ time })
      }, 1000)
    }
  }

  login = () => {
    const { code, code_key } = this.state
    Toast.loading('登录中')
    verifyPhoneCode(code_key, code).then(res => {
      let permitCode = res.data.permitCode
      phoneLogin(permitCode).then(res => {
        Toast.hide()
        localStorage.setItem('token', 'Bearer ' +  res.data.access_token)
        router.push('/')
      }).catch(err => {
        Toast.hide()
        Toast.fail(err.message)
      })
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.message)
    })
  }


  componentWillUnmount() {
    clearInterval(timer)
  }


  render() {
    const { phone, is_send, code_list, code, blink_idx, is_confirm, step, time } = this.state
    return (
      <div className={styles.login_page}>
        {
          step === 1 ? (
            <div>
              <img alt='' src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/WfrcXymYKCNMTFJMGyCCrZz3RcfWw8yt.png' className={styles.login_logo} />
              <div className={styles.login_main}>
                <div className={styles.main_title}>欢迎来到商家登录台</div>
                <div className={styles.input_box}>
                  <input value={phone} onChange={this.phoneChange.bind(this)} type='number' placeholder='请输入手机号' />
                </div>
                <div className={styles.tips}>未注册的手机号验证后自动创建商家账户</div>
                {
                  is_send ? <div className={styles.button} style={{ opacity: 1 }} onClick={this.sendCode}>获取验证码</div> : <div className={styles.button}>获取验证码</div>
                }

              </div>
            </div>
          ) : (
              <div className={styles.code_page} onClick={this.onBlur}>
                <img className={styles.back_img} src={require('@/assets/back_dark.png')} alt="" onClick={() => this.setState({ step: 1 })} />
                <div className={styles.code_title}>请输入短信验证码</div>
                <div className={styles.code_phone}>短信验证码至   {phone.substring(0, 3)}******{phone.substring(phone.length - 2, phone.length)}</div>
                <Flex className={styles.code_box} onClick={this.focus}>
                  {
                    code_list.map((item, index) => {
                      return <Flex className={item ? styles.code_item_activated : styles.code_item} align='center' justify='center' key={index}>
                        {item}
                        {
                          index == blink_idx ? <div className={styles.animation}></div> : null
                        }
                      </Flex>
                    })
                  }
                  <input  className={styles.code_box_input}  value={code} onChange={this.codeChange} ref={this.input} />
                </Flex>
                {
                  time === 0 ? <div className={styles.send_code}>重新发送</div> : <div className={styles.send_code} style={{ color: '#98A6AD' }}>{time}秒后重新发送</div>
                }

                <div className={styles.button_box}>
                  {
                    is_confirm ? <Flex className={styles.button} style={{ opacity: 1 }} align='center' justify='center' onClick={this.login}>
                      确认
                      </Flex> : <Flex className={styles.button} align='center' justify='center'>
                        确认
                      </Flex>
                  }

                </div>

              </div>
            )
        }


      </div>
    )
  }
}
