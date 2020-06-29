import React, { useState } from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'
import router from 'umi/router'

interface Props {
  item: any
}


export default function Item({ item, }: Props) {

  const goTo = (e: any,type: string) => {
    if (type === 'get') {
      router.push('/activities/gift/gift-get-record')
    } else {
      router.push('/activities/gift/gift-verification-record')
    }
    e.stopPropagation()
  }

  const toDetail = () => {
    router.push('/activities/gift/detail-gift?id=' + item.id)
  }


  return (
    <Flex className={styles.item} align='start' justify='between' onClick={toDetail}>
      <Flex align='start'>
        <div className={styles.item_img_box}>
          <div className={styles.item_label}>{item.gift_type === 1 ? '现金券' : item.gift_type === 2 ? '商品券' : item.gift_type === 3 ? '实物券' : ''}</div>
          {
            item.gift_image ? <img src={'http://tmwl.oss-cn-shenzhen.aliyuncs.com/' + item.gift_image} alt="" /> : <img src={require('@/assets/activities/cash-coupon.png')} alt="" />
          }

        </div>
        <div className={styles.info_box}>
          <div className={styles.info_title}>{item.gift_name}</div>
          <div className={styles.info_text}>剩余库存：{item.total_surplus_num}份（{item.each_num}张/份）</div>
          <div className={styles.info_text}>已派发：{item.total_give_num}份</div>
          <div className={styles.info_text}>已核销：{item.total_cancel_num}张 <div onClick={(e) => goTo(e,'verification')}>查看</div></div>
          <div className={styles.info_text}>有效期：自领取日{item.validity_day}天有效</div>
        </div>
      </Flex>
      <div className={styles.action_box}>
        <div className={styles.status}>{item.status === 1 ? '发放中' : '停止派发'}</div>
        <div className={styles.button}>增加库存</div>
        <div className={styles.button} onClick={(e) => goTo(e,'get')}>领用记录</div>
      </div>
    </Flex>
  )
}
