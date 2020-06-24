/**title: 我的活动 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, InputItem, Toast } from 'antd-mobile';
import styles from './index.less';
import { getGiftDetails, upDownGift } from '@/services/api'
import router from 'umi/router';
export default class MyGiftDetail extends Component<any> {
  state = {
    info: {
      gift_type: 0,
      gift_name: '',
      worth_money: '',
      pay_money: '',
      total_repertory_num: '',
      total_surplus_num: '',
      each_num: '',
      use_description: '',
      rule_description: '',
      status: 2,
      created_at: '',
      validity_day: '',
      offset_money: '',
      use_min_price: '',
      gift_image: '',
      total_cancel_num: '',
      total_give_num: ''
    }
  };

  componentDidMount() {
    const id = this.props.location.query.id
    getGiftDetails(id).then(res => {
      if (res.data) {
        this.setState({ info: res.data })
      }
    })
  }

  downGift = () => {
    const id = this.props.location.query.id
    upDownGift([id], 1).then(res => {
      console.log(res)
    })
  }

  render() {
    const { info } = this.state
    return (
      <div className={styles.MyGiftDetail}>
        {/* <div className={styles.MyGiftImgBox}>
          <img className={styles.MyGiftImg} src="http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png" alt='' />
        </div> */}
        <div className={styles.MyGiftContent}>
          <div className={styles.giftTitleBox}>
            <div className={styles.giftTitleBoxLeft}>
              <div className={styles.giftTitleLeft}></div>
              <div className={styles.giftTitle}>配送信息</div>
            </div>
            <div className={styles.giftTitleBoxRight}>{info.status == 1 ? '发放中' : '停止发放'}</div>
          </div>
          {/* <div className={styles.giftItem}>
                        <div className={styles.giftKey}>卡券面额</div>
                        <div className={styles.giftInfo}>50元</div>
                    </div> */}
          <div className={styles.giftItem}>
            <div className={styles.giftKey}>卡券名称</div>
            <div className={styles.giftInfo}>{info.gift_name}</div>
          </div>
          <div className={styles.giftItem}>
            <div className={styles.giftKey}>发布时间</div>
            <div className={styles.giftInfo}>{info.created_at}</div>
          </div>
          <div className={styles.giftItem}>
            <div className={styles.giftKey}>卡券类型</div>
            <div className={styles.giftInfo} style={{ color: '#4781FE' }}>{info.gift_type == 1 ? '现金券' : info.gift_type == 2 ? '商品券' : info.gift_type == 3 ? '实物礼品' : null}</div>
          </div>

          {
            info.gift_type == 1 ? (
              <div className={styles.giftItem}>
                <div className={styles.giftKey}>使用门榄</div>
                <div className={styles.giftInfo}>满{info.use_min_price}元可用</div>
              </div>
            ) : (
                <div>
                  <div className={styles.giftItem}>
                    <div className={styles.giftKey}>活动图片</div>
                    <img className={styles.giftImg} src={"http://oss.tdianyi.com/" + info.gift_image} alt='' />
                  </div>

                  <div className={styles.giftItem}>
                    <div className={styles.giftKey}>商品原价</div>
                    <div className={styles.giftInfo}>{info.worth_money}元</div>
                  </div>
                </div>
              )
          }

          <div className={styles.giftItem}>
            <div className={styles.giftKey}>卡券有效期</div>
            <div className={styles.giftInfo}>{info.validity_day}天</div>
          </div>
          <div className={styles.giftItem}>
            <div className={styles.giftKey}>派发形式</div>
            <div className={styles.giftInfo}>{info.each_num}张/份</div>
          </div>
          <div className={styles.giftItem}>
            <div className={styles.giftKey}>使用说明</div>
            <div className={styles.giftInfo}>{info.use_description}</div>
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
            <div className={styles.giftInfo}>{info.total_give_num}张</div>
          </div>
          <div className={styles.giftItem}>
            <div className={styles.giftKey}>核销数量</div>
            <div className={styles.giftInfoBox}>
              <div className={styles.giftInfo}>{info.total_cancel_num}张</div>
              <div className={styles.giftInfoBtn}>查看</div>
            </div>
          </div>
        </div>
        <div className={styles.bottomBox}>
          {
            info.status === 1 ? (
              <div className={styles.bottomContent}>
                <div className={styles.bottomBtnLeft} onClick={this.downGift}>停止发放卡券</div>
                <div className={styles.bottomBtnRight} onClick={() => router.goBack()}>返回卡券列表</div>
              </div>
            ) : (
                <div className={styles.bottomContentCenter}>
                  <div className={styles.bottomBtnCenter} onClick={() => router.goBack()}>返回卡券列表</div>
                </div>
              )
          }

        </div>

      </div>
    )
  }
}
