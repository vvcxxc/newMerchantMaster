/**
 * title: 使用规则
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, Toast, Tabs, Icon } from 'antd-mobile';
import { connect } from 'dva';

interface Props {
    location: any,
    dispatch: any,
    details: any,
    Finance: any
}
let timer: any;
export default connect(({ finance }: any) => finance)(
    class CouponRules extends Component<Props> {
        state = {
            list: [
                { id: 0, valve: '团购用户不可以享受其他商家优惠', select: true },
                { id: 1, valve: '团购用户不可以享受其他商家优惠', select: true },
                { id: 2, valve: '团购用户不可以享受其他商家优惠团购用户不可以享受其他商家优惠团购用户不可以享受其他商家优惠', select: true },
                { id: 3, valve: '团购用户不可以享受其他商家优惠', select: true }
            ],
            inputText: '',
        };

        
        handleSelect = (index: number) => {
            let temp = this.state.list;
            temp[index].select = !temp[index].select;
            this.setState({ list: temp })
        }
        changeInput = (e: any) => {
            this.setState({ inputText: e.target.value })
        }
        addSelect = () => {
            let temp = this.state.list;
            temp.push({ id: temp.length, valve: this.state.inputText, select: true })
            this.setState({ list: temp })
        }
        render() {
            return (
                <div className={styles.CouponRules}>
                    <div className={styles.CouponRulesTitle}>使用须知</div>
                    {
                        this.state.list.map((item: any, index: any) => {
                            return (
                                <div className={styles.CouponRulesItem} key={item.value}>
                                    <div className={styles.CouponRulesText}>{item.valve}</div>
                                    <div className={item.select ? styles.CouponRulesBtnSelect : styles.CouponRulesBtn} onClick={this.handleSelect.bind(this, index)}>
                                        <div className={styles.CouponRulesBtnCircle}></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={styles.CouponRulesInputBox}>
                        <input className={styles.CouponRulesInputInput} value={this.state.inputText} onChange={this.changeInput.bind(this)} placeholder="自定义" />
                        <div className={styles.CouponRulesInputBtn} onClick={this.addSelect}>添加</div>
                    </div>
                </div>

            );
        }
    })
