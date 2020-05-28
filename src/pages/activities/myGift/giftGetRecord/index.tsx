/**title: 我的活动 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request'
import router from 'umi/router';
export default class GiftGetRecord extends Component<any> {
    state = {

    };

    render() {

        return (
            <div className={styles.giftGetRecord}>

                <div className={styles.getgiftGetRecordItem}>
                    <div className={styles.giftGetRecordItemTopBox}>
                        <div className={styles.giftGetRecordItemTopTitle}>XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家</div>
                        <div className={styles.giftGetRecordItemTopTime}>进行中</div>
                    </div>
                    <div className={styles.giftGetRecordItemText}>XX拼团活动</div>
                    <div className={styles.giftGetRecordItemText}>领取数量：200个</div>
                    <div className={styles.giftGetRecordItemText}>核销数量：72个</div>
                    <div className={styles.giftGetRecordItemText}>领取时间：2018/02/06 18:00</div>
                </div>

                <div className={styles.getgiftGetRecordItem}>
                    <div className={styles.giftGetRecordItemTopBox}>
                        <div className={styles.giftGetRecordItemTopTitle}>XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家XX商家</div>
                        <div className={styles.giftGetRecordItemTopTime}>进行中</div>
                    </div>
                    <div className={styles.giftGetRecordItemText}>XX拼团活动</div>
                    <div className={styles.giftGetRecordItemText}>领取数量：200个</div>
                    <div className={styles.giftGetRecordItemText}>核销数量：72个</div>
                    <div className={styles.giftGetRecordItemText}>领取时间：2018/02/06 18:00</div>
                </div>

                <div className={styles.moreBox}>
                    <img className={styles.moreIcon} src="http://oss.tdianyi.com/front/GQr5D7QZwJczZ6RTwDapaYXj8nMbkenx.png" />
                    <div className={styles.moreText}>点击查看更多</div>

                </div>

{/* 
                <div className={styles.gift-nodata-box}>
                    <div className={styles.gift-nodata}>
                        <img className={styles.gift-nodata-img} src="http://oss.tdianyi.com/front/k8ZSCiyS82z8NdnFeKfHSwChcdSfsXwd.png" />
                        <div className={styles.gift-nodata-info}>暂无邀请数据，快去逛逛吧</div>
                    </div>
                </div> */}

            </div>
        )
    }
}
