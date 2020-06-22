/**title: 小熊敬礼 */

import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon, Toast, Grid, Modal } from 'antd-mobile';
import router from 'umi/router';
import AuditResult from '@/components/auditResult'
import {getAuditId, getAuditRecord} from '@/services/api'
export default class Index extends Component {
  state = {
    is_record: true, // 是否有审核记录
    type: {
      store_type: 1, // 1-未填写，2-待审，3-通过，4-拒绝
      business_type: 1, // 1-未填写，2-待审，3-通过，4-拒绝
      identity_type: 1, // 1-未填写，2-待审，3-通过，4-拒绝
      examine_type: 1, // 1-未填写，2-待审，3-通过，4-拒绝
    },

  }

  componentDidMount (){
    getAuditId().then(res => {
      if(res.data.status){
        getAuditRecord(res.data.id).then(res => {
          if(res.data){
            let type = {
              store_type: res.data.store_type,
              business_type: res.data.business_type,
              identity_type: res.data.identity_type,
              examine_type: res.data.examine_type
            }
            this.setState({is_record: true, type})
          }else {
            this.setState({is_record: false})
          }

        })
      }else {
        this.setState({is_record: false})
      }
    })
  }

  toAddGift = () => {
    router.push('/activities/myGift/create')
  }



  render() {
    const { is_record, type } = this.state
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

          <AuditResult is_record={is_record} types={type} />


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
