/**title: 小熊敬礼 */

import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon, Toast, Grid, Modal } from 'antd-mobile';
import router from 'umi/router';

export default class Index extends Component {
  state = {

  }

  toAddGift = () => {
    router.push('/activities/myGift/create')
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.bj}></div>
        <div className={styles.main}>
          <Flex className={styles.index_top} justify='between'>
            <Flex className={styles.index_top_item} direction='column' justify='center' align='center'>
              <img src={require('@/assets/index/code.png')} alt="" />
              <div>扫码验券</div>
            </Flex>
            <Flex className={styles.index_top_item} direction='column' justify='center' align='center'>
              <img src={require('@/assets/index/finance.png')} alt="" />
              <div>财务统计</div>
            </Flex>
            <Flex className={styles.index_top_item} direction='column' justify='center' align='center'>
              <img src={require('@/assets/index/record.png')} alt="" />
              <div>核销记录</div>
            </Flex>
            <Flex className={styles.index_top_item} direction='column' justify='center' align='center'>
              <img src={require('@/assets/index/code.png')} alt="" />
              <div>核销记录</div>
            </Flex>
          </Flex>

          {/* <div className={styles.audit_box}>
          <div className={styles.audit_box_title}>资料审核中</div>
          <div className={styles.audit_box_tips}>请留意短信提醒，3个工作日出结果</div>

          <Flex className={styles.audit_record_box} justify='between'>
            <div className={styles.audit_store_item}>
              <div className={styles.audit_item_title}>门店信息</div>
              <div className={styles.audit_item_text}>审核通过</div>
            </div>
            <div className={styles.audit_license_item}>
              <div className={styles.audit_item_title}>营业执照</div>
              <div className={styles.audit_item_text}>审核通过</div>
            </div>
            <div className={styles.audit_id_card_item}>
              <div className={styles.audit_item_title}>身份证</div>
              <div className={styles.audit_item_text}>审核通过</div>
            </div>
          </Flex>

          <Flex className={styles.audit_button_box} align='center' justify='center'>
            <Flex className={styles.audit_button} justify='between'>
              查看原因并修改
              <img src={require('@/assets/index/right-arrow.png')} alt=""/>
            </Flex>
          </Flex>

        </div> */}

          <div className={styles.no_store_box}>
            <div className={styles.no_store_tips}>您没有入驻门店哦！</div>
            <div className={styles.no_store_button}>入驻门店 >></div>
          </div>


          <div className={styles.content_box}>
            <Flex className={styles.title}>我的业务</Flex>
            <Flex className={styles.business_box} justify='between'>
              <Flex className={styles.business_item} direction='column' align='center' justify='center'>
                <img src={require('@/assets/index/rush-buy.png')} alt="" />
                <div>抢购活动</div>
              </Flex>
              <Flex className={styles.business_item} direction='column' align='center' justify='center'>
                <img src={require('@/assets/index/gift.png')} alt="" />
                <div>礼品</div>
              </Flex>
              <Flex className={styles.business_item} direction='column' align='center' justify='center'>
                <img src={require('@/assets/index/more.png')} alt="" />
                <div>更多</div>
              </Flex>
            </Flex>
          </div>

          <div className={styles.content_box}>
            <Flex className={styles.title} justify='between'>
              <div>门店数据</div>
              <Flex className={styles.time_box} justify='between'>
                <div style={{ color: '#3789FD' }}>今日</div>
                <div>昨日</div>
                <div>近7天</div>
              </Flex>
            </Flex>
            <Flex className={styles.record_box} justify='between'>
              <Flex className={styles.record_item} direction='column' justify='center'>
                <div className={styles.record_number}>32000.00</div>
                <div className={styles.record_title}>实收金额</div>
              </Flex>
              <Flex className={styles.record_item} style={{ background: 'rgba(55,137,253,0.09)' }} direction='column' justify='center'>
                <div className={styles.record_number}>32000.00</div>
                <div className={styles.record_title}>交易笔数</div>
              </Flex>

            </Flex>
          </div>

        </div>



      </div>
    )
  }
}
