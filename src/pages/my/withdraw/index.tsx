// /**title: 提现 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, InputItem, Button, Toast, List } from 'antd-mobile';
import { Form, Input, Checkbox } from 'antd';
import request from '@/services/request';
import Succeed from './succeed';
import router from 'umi/router';
import { createForm } from 'rc-form';
import iconImg from './money_icon.png';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class WithDraw extends Component {
  state = {
    money: '',
    info: {
      id: '',
      bank_name: '',
      bank_info: '',
      bank_user: '',
      money: '',
      subbranch: '',
      bank_img: '',
      withdraw_info: ''
    },
    num: '',
    is_ok: false,
    data: {},
    msg_show: false,

    isOkClick: true
  };

  componentWillMount() {
    request({
      url: 'api/merchant/staff/userBankList',
      method: 'post'
    }).then(res => {
      let { data } = res;
      let str = data[0].bank_info;
      let num = str.substring(str.length - 4);
      this.setState({ info: data[0], num });
    });
  }

  /* 舍去得到两位小数*/
  numFloor = (num: number) => {
    return Math.floor(100 * num) / 100
  }

  /**全部提现 */
  allWithDraw = () => {
    let { info } = this.state;
    let money = this.numFloor(Number(info.money));
    this.setState({ money });
  };

  handleInputChange = (value: any) => {
    if (value == '') {
      this.setState({
        money: 0
      });
    } else {
      this.setState({ money: value })
    }
  };

  /**提现成功的回调 */
  succeedBack = () => {
    this.setState({ is_ok: false });
    this.setState({ money: '' })
  };

  /**去提现列表 */
  goWithDraw = () => {
    router.push('/my/withdraw/list');
  };

  /**提现 */
  WithDraw = async () => {
    let { money } = this.state;
    if (money && Number(money) >= 20) {

      await this.setState({ isOkClick: false })

      request({
        url: 'api/merchant/supplier/withdraw',
        method: 'post',
        data: {
          money
        }
      }).then(res => {
        
        let { message, code } = res;
        if (code == 200) {
          Toast.success(message, 2);
          let { info, num } = this.state;
          let data = {
            money,
            num,
            bank_name: info.bank_name,
            img: info.bank_img
          };
          this.setState({ is_ok: true, data, isOkClick: true });
        } else {
          Toast.fail(message, 2);
          this.setState({ isOkClick: true })
        };
      })
    } else {
      this.setState({ msg_show: true })
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { info, num } = this.state;
    const succeed = this.state.is_ok == true ? <Succeed onChange={this.succeedBack} list={this.state.data} /> : '';
    const top = this.state.info.withdraw_info ? <Flex className={styles.top}>{info.withdraw_info}</Flex> : '';
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }}>
        {
          this.state.msg_show ? <div className={styles.msg_mask} style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: 2, background: "rgb(0,0,0,.7)", top: "0" }}></div>
            : null
        }
        {top}
        <WingBlank>
          {
            this.state.msg_show ? <div className={styles.msg_box}>
              <div className={styles.msg_box_icon}>
                <img className={styles.msg_box_icon_img} src={iconImg} />
              </div>
              <div className={styles.msg_box_toast}>最低提现金额为20元，请重新输入</div>
              <div className={styles.msg_box_button_box}>
                <div className={styles.msg_box_button} onClick={() => { this.setState({ msg_show: false }) }}>关闭</div>

              </div>
            </div> : null
          }


          <Flex className={styles.header}>
            <img src={this.state.info.bank_img} />
            {info.bank_name}
            <span>（{num}）</span>
          </Flex>
          <Flex className={styles.title}>提现余额</Flex>
          <Flex className={styles.input_wrap}>
            <span className={styles.symbol}>￥</span>
            <Flex.Item>
              {/* <InputItem
								type='money'
								placeholder=""
								onChange={this.handleInputChange}
								value={this.state.money}
							/> */}
              <InputItem
                {...getFieldProps('money2', {
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === '.') {
                        return '0.';
                      }
                      this.setState({
                        money: prev
                      })
                      return prev;
                    }
                    this.setState({
                      money: v
                    })
                    return v;
                  },
                })}
                type='money'
                ref={el => this.inputRef = el}
                clear
                value={this.state.money}
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
              ></InputItem>
            </Flex.Item>
          </Flex>
          <Flex className={styles.withdraw_sum}>
            可提现金额{info.money}
            <span className={styles.withdraw_all} onClick={this.allWithDraw}>
              全部提现
						</span>
          </Flex>
          {
            this.state.isOkClick ? (
              <Button type="primary" style={{ marginTop: 60 }} onClick={this.WithDraw}>
                提现
              </Button>
            ) : (
                <Button type="primary" style={{ marginTop: 60 }}>
                  提现
                </Button>
              )
          }
          <Button
            onClick={this.goWithDraw}
            type="primary"
            style={{ marginTop: 46, background: '#fff', color: '#21418A', fontSize: '0.28rem' }}
          >
            提现记录
					</Button>
          <div className={styles.toast} >
            <div className={styles.toast_title}>温馨提示 :</div>
            <div className={styles.toast_content}>1、金额限制: 最低提现金额为20元。</div>
            <div className={styles.toast_content}>2、银行卡到账时间: T+1（第二个工作日）。</div>
            <div className={styles.toast_content}>3、提现进度查询位置: “首页-资产管理-提现进度”</div>
            <div className={styles.toast_content}>4、因网银转账的规则限制，提现金额小数仅能精确到小数点后2位。</div>
          </div>
        </WingBlank>
        {succeed}
      </div>
    );
  }
}

export default createForm()(WithDraw);
// import React, { Component } from 'react';
// import { List, InputItem } from 'antd-mobile';
// import { createForm } from 'rc-form';

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let moneyKeyboardWrapProps;
// if (isIPhone) {
//   moneyKeyboardWrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

// class WithDraw extends React.Component {
//   state = {
//     type: 'money',
//     moneyValue: 0
//   }

//   render() {
//     const { getFieldProps } = this.props.form;
//     const { type } = this.state;
//     return (
//       <div>
//         <List>
//           <div>---{this.state.moneyValue}</div>
//           <InputItem
//             {...getFieldProps('money2', {
//               normalize: (v, prev) => {

//                 if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
//                   if (v === '.') {
//                     return '0.';
//                   }
//                   this.setState({
//                     moneyValue : prev
//                   })
//                   return prev;
//                 }
//                 this.setState({
//                   moneyValue : v
//                 })
//                 return v;
//               }
//             })}
//             type={type}
//             placeholder="money format"
//             ref={el => this.inputRef = el}
//             onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
//             clear
//             moneyKeyboardWrapProps={moneyKeyboardWrapProps}
//           >数字键盘</InputItem>
//         </List>
//       </div>
//     );
//   }
// }

// export default createForm()(WithDraw);
