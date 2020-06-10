import React, { useState } from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'
import router from 'umi/router'

export default function Item() {

  const goTo = (type: string) => {
    if(type === 'get'){
      router.push('/activities/gift/gift-get-record')
    }else {
      router.push('/activities/gift/gift-verification-record')
    }
  }


  return (
    <Flex className={styles.item} align='start' justify='between' >
      <Flex align='start'>
        <div className={styles.item_img_box}>
          <div className={styles.item_label}>实物券</div>
          <img src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png' alt="" />
        </div>
        <div className={styles.info_box}>
          <div className={styles.info_title}>很便宜的寿司</div>
          <div className={styles.info_text}>剩余库存：100份（5张/份）</div>
          <div className={styles.info_text}>已派发：100份</div>
          <div className={styles.info_text}>已核销：50张 <div onClick={()=>goTo('verification')}>查看</div></div>
          <div className={styles.info_text}>有效期至：2020-02-02</div>
        </div>
      </Flex>
      <div className={styles.action_box}>
        <div className={styles.status}>发放中</div>
        <div className={styles.button}>增加库存</div>
        <div className={styles.button} onClick={()=>goTo('get')}>领用记录</div>
      </div>
    </Flex>
  )
}
