/**
 * title: 使用规则
 */
import React, { useState, useEffect } from 'react'
import styles from './index.less';
import { WingBlank, Flex, Toast, Tabs, Icon } from 'antd-mobile';
import { connect } from 'dva';


export default connect(({ addCoupon }: any) => addCoupon)(
    function CouponRules(props: any) {
        const list = props.coupon_allUseNotice;
        const [seleectList, setSeleectList] = useState(list)
        const [inputText, setInputText] = useState('')

        useEffect(() => {
            let tempRules = [];
            for (let i in seleectList) {
                if (seleectList[i].select) { tempRules.push(seleectList[i].value) }
            }
            props.dispatch({
                type: 'addCoupon/setCoupon',
                payload: {
                    coupon_allUseNotice: seleectList,
                    coupon_useNotice: tempRules
                }
            });
        }, [seleectList])

        const handleSelect = (index: number) => {
            let temp = seleectList;
            temp[index].select = !temp[index].select;
            setSeleectList([...temp])
        }
        const changeInput = (e: any) => {
            setInputText(e.target.value)
        }
        const addSelect = () => {
            let temp = seleectList;
            temp.push({ id: temp.length, value: inputText, select: true })
            setSeleectList([...temp])
        }


        return (
            <div className={styles.CouponRules}>
                <div className={styles.CouponRulesTitle}>使用须知</div>
                {
                    seleectList.map((item: any, index: any) => {
                        return (
                            <div className={styles.CouponRulesItem} key={item.id}>
                                <div className={styles.CouponRulesText}>{item.value}</div>
                                <div className={item.select ? styles.CouponRulesBtnSelect : styles.CouponRulesBtn} onClick={() => handleSelect.bind(index)}>
                                    <div className={styles.CouponRulesBtnCircle}></div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={styles.CouponRulesInputBox}>
                    <input className={styles.CouponRulesInputInput} value={inputText} onChange={(e) => changeInput(e)} placeholder="自定义" />
                    <div className={styles.CouponRulesInputBtn} onClick={addSelect}>添加</div>
                </div>
            </div>

        );

    })
