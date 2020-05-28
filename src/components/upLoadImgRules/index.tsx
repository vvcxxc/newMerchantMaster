import React, { Component } from 'react';
import styles from './index.less';

interface Props {
    onClose: any;
}
export default class CouponImgRules extends Component<Props> {
    closeBox = () => {
        this.props.onClose && this.props.onClose()
    }
    render() {
        return (
            <div className={styles.couponImgRulesMask}>
                <div className={styles.couponImgRulesBox}>
                    <div className={styles.couponImgRulesTitleBox}>
                        <div className={styles.couponImgRulesTitle}>图片要求</div>
                        <img className={styles.couponImgRulesClose} onClick={this.closeBox} src="http://oss.tdianyi.com/front/CPbjhZZiAEPjP8hwEP5z2QRFeeWMT4xf.png" />
                    </div>
                    <div className={styles.couponImgRulesArea}>
                        <div className={styles.couponImgRulesTitle}>图片宽度</div>
                        <div className={styles.couponImgRulesMsg}>480px≤图片宽度≤1500px（手机端图片宽度 建议上传750px</div>
                        <div className={styles.couponImgRulesTitle}>图片高度</div>
                        <div className={styles.couponImgRulesMsg}>0＜图片高度≤2500px</div>
                        <div className={styles.couponImgRulesTitle}>图片大小</div>
                        <div className={styles.couponImgRulesMsg}>图片大小≤10M</div>
                        <div className={styles.couponImgRulesTitle}>数量限制</div>
                        <div className={styles.couponImgRulesMsg}>商品图片：3张     详情图片：6张</div>
                        <div className={styles.couponImgRulesTitle}>视频比例</div>
                        <div className={styles.couponImgRulesMsg}>1：1或16：9</div>
                        <div className={styles.couponImgRulesTitle}>视频时长</div>
                        <div className={styles.couponImgRulesMsg}>≤15秒</div>
                    </div>
                    <div className={styles.couponImgRulesBtnBox} onClick={this.closeBox} >
                        <div className={styles.couponImgRulesBtn}>我知道了</div>
                    </div>
                </div>
            </div>


        )
    }
}
