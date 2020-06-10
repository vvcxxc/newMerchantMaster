/**title: 核销记录 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, InputItem, Toast } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request'
import router from 'umi/router';
export default class GiftVerificationRecord extends Component<any> {
    state = {

    };

    render() {

        return (
            <div className={styles.giftVerificationRecord}>
                <div className={styles.verificationItem}>
                    <img className={styles.verificationImg} alt='' src="http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png" />
                    <div className={styles.verificationItemRight}>
                        <div className={styles.ItemTopBox}>
                            <div className={styles.ItemTopTitle}>券的名称券的名称券的名称券的名称券的名称</div>
                            <div className={styles.ItemTopTime}>2018-12-06 18:00</div>
                        </div>
                        <div className={styles.ItemText}>核销会员：会员的昵称</div>
                        <div className={styles.ItemText}>订单号：AB12345678901234</div>
                    </div>
                </div>

                <div className={styles.verificationItem}>
                    <img className={styles.verificationImg} alt='' src="http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png" />
                    <div className={styles.verificationItemRight}>
                        <div className={styles.ItemTopBox}>
                            <div className={styles.ItemTopTitle}>券的名称券的名称券的名称券的名称券的名称</div>
                            <div className={styles.ItemTopTime}>2018-12-06 18:00:00</div>
                        </div>
                        <div className={styles.ItemText}>核销会员：会员的昵称</div>
                        <div className={styles.ItemText}>订单号：AB12345678901234</div>
                    </div>
                </div>

            </div>
        )
    }
}
