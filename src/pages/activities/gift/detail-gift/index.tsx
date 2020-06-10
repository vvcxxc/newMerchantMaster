/**title: 我的活动 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, InputItem, Toast } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request'
import router from 'umi/router';
export default class MyGiftDetail extends Component<any> {
    state = {

    };

    render() {

        return (
            <div className={styles.MyGiftDetail}>
                <div className={styles.MyGiftImgBox}>
                    <img className={styles.MyGiftImg} src="http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png" />
                </div>
                <div className={styles.MyGiftContent}>
                    <div className={styles.giftTitleBox}>
                        <div className={styles.giftTitleBoxLeft}>
                            <div className={styles.giftTitleLeft}></div>
                            <div className={styles.giftTitle}>配送信息</div>
                        </div>
                        <div className={styles.giftTitleBoxRight}>卡券发放中</div>
                    </div>
                    {/* <div className={styles.giftItem}>
                        <div className={styles.giftKey}>卡券面额</div>
                        <div className={styles.giftInfo}>50元</div>
                    </div> */}
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>卡券名称</div>
                        <div className={styles.giftInfo}>这是一个慕斯蛋糕券</div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>发布时间</div>
                        <div className={styles.giftInfo}>2019-10-10 15:30:45</div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>卡券类型</div>
                        <div className={styles.giftInfo}>兑换券</div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>商品原价</div>
                        <img className={styles.giftImg} src="http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png" />
                    </div>
                    {/* <div className={styles.giftItem}>
                        <div className={styles.giftKey}>使用门榄</div>
                        <div className={styles.giftInfo}>满199元可用</div>
                    </div> */}
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>商品原价</div>
                        <div className={styles.giftInfo}>99元</div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>卡券有效期</div>
                        <div className={styles.giftInfo}>至2020-02-02</div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>派发形式</div>
                        <div className={styles.giftInfo}>10张/份</div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>使用说明</div>
                        <div className={styles.giftInfo}>这是一份使用说明</div>
                    </div>
                </div>
                <div className={styles.MyGiftContent}>
                    <div className={styles.giftTitleBox}>
                        <div className={styles.giftTitleBoxLeft}>
                            <div className={styles.giftTitleLeft}></div>
                            <div className={styles.giftTitle}>数据统计</div>
                        </div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>派送数量</div>
                        <div className={styles.giftInfo}>100份；1000张</div>
                    </div>
                    <div className={styles.giftItem}>
                        <div className={styles.giftKey}>核销数量</div>
                        <div className={styles.giftInfoBox}>
                            <div className={styles.giftInfo}>300张</div>
                            <div className={styles.giftInfoBtn}>查看</div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomBox}>
                    <div className={styles.bottomContent}>
                        <div className={styles.bottomBtnLeft}>停止发放卡券</div>
                        <div className={styles.bottomBtnRight}>返回卡券列表</div>
                    </div>
                    <div className={styles.bottomContentCenter}>
                        <div className={styles.bottomBtnCenter}>返回卡券列表</div>
                    </div>
                </div>

            </div>
        )
    }
}
