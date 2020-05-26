import React, { useState } from 'react'
import { Flex, Icon } from 'antd-mobile'
import styles from './index.less'

export default function ListItem() {


  return (
    <div className={styles.list_item_box}>
      <Flex className={styles.item_main}>
        <div className={styles.main_img}>
          <img src="http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png" alt="" />
        </div>
        <Flex className={styles.main_details} direction='column'>
          <div className={styles.item_name}>慕斯蛋糕商品名称慕斯蛋糕商品ss</div>
          <Flex className={styles.item_progress_box} align='center'>
            <div className={styles.progress}>
              <div className={styles.line}></div>
            </div>
            <div className={styles.item_progress_label}>
              <span style={{ color: '#2C3E50' }}>56</span>/100
            </div>
          </Flex>
          <Flex className={styles.money_box} align='baseline'>
            <div className={styles.new_money}>￥7.8</div>
            <div className={styles.old_money}>￥79.8</div>
          </Flex>

          <Flex className={styles.item_button} align='center' justify='center'>
            详情<Icon type='right' color='#fff' />
          </Flex>

        </Flex>
      </Flex>

      <Flex className={styles.number_box}>
        <Flex className={styles.borderRight} direction='column' align='center' justify='center'>
          <div className={styles.number_name}>订单总数</div>
          <div className={styles.number}>79</div>
        </Flex>
        <Flex className={styles.borderRight} direction='column' align='center' justify='center'>
          <div className={styles.number_name}>订单总数</div>
          <div className={styles.number}>79</div>
        </Flex>
        <Flex direction='column' align='center' justify='center'>
          <div className={styles.number_name}>订单总数</div>
          <div className={styles.number}>79</div>
        </Flex>
      </Flex>
    </div>
  )
}
