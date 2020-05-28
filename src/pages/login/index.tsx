import React, { Component } from 'react'
import styles from './index.less'
import { Toast, Flex } from 'antd-mobile'

export default class Login extends Component {
  state = {
    phone: '',
    is_send: false,
    code_list: ['','','','','',''],
    code: '',
  }
  input = React.createRef();

  componentDidMount (){

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
    console.log(phone)
  }

  codeChange = (e) => {
    let value = e.target.value
    let code_list = this.state.code_list
    console.log(value)
    for(let i in value){
      console.log(value[i],'oo')
      code_list[i] = value[i]
    }
    this.setState({code: value, code_list})
  }

  focus = () => {
    this.input.current.focus();
  }

  render() {
    const { phone, is_send, code_list, code } = this.state
    return (
      <div className={styles.login_page}>
        {/* <img alt='' src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png' className={styles.login_logo} />
        <div className={styles.login_main}>
          <div className={styles.main_title}>欢迎来到商家登录台</div>
          <div className={styles.input_box}>
            <input value={phone} onChange={this.phoneChange.bind(this)} type='number' placeholder='请输入手机号' />
          </div>
          <div className={styles.tips}>未注册的手机号验证后自动创建商家账户</div>
          {
            is_send ? <div className={styles.button} style={{ opacity: 1 }} onClick={this.sendCode}>获取验证码</div> : <div className={styles.button}>获取验证码</div>
          }

        </div> */}
        <div className={styles.code_page}>
          <img className={styles.back_img} src={require('@/assets/back_dark.png')} alt=""/>
          <div className={styles.code_title}>请输入短信验证码</div>
          <div className={styles.code_phone}>短信验证码至   152******51</div>
          <Flex className={styles.code_box}>
            {
              code_list.map((item,index) => {
              return <Flex onClick={this.focus} className={item ? styles.code_item_activated : styles.code_item} align='center' justify='center' key={index}>
                {item}
                </Flex>
              })
            }
             <input value={code} onChange={this.codeChange} ref={this.input} />
          </Flex>
        </div>
      </div>
    )
  }
}
