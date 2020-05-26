import React, { useState } from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.less'
interface Props {
  onChange: ()=>any
}

export default function GiftModal(props:Props) {
  const handleAction = () => {
    props.onChange()
  }
  return (
    <div className={styles.mark}>
      <div className={styles.modal_box}>
        <div className={styles.header_box}>
          <Flex className={styles.title} align='center'>
            <div>礼品信息</div>
          </Flex>
          <Flex className={styles.header_main}>
            <img className={styles.gift_img} src="http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png" alt="" />
            <Flex className={styles.header_info} direction='column' justify='between' align='start'>
              <div>礼品名称：现金券</div>
              <div>礼品面额：￥123.00</div>
            </Flex>
          </Flex>
        </div>

        <div className={styles.gift_main}>
          <Flex className={styles.wrap} justify='between'>
            <div>使用门槛</div>
            <div className={styles.wrap_name}>消费满200元可用</div>
          </Flex>
          <Flex className={styles.wrap} justify='between'>
            <div>使用门槛</div>
            <div className={styles.wrap_name}>消费满200元可用</div>
          </Flex>
          <Flex className={styles.wrap} justify='between'>
            <div>使用门槛</div>
            <div className={styles.wrap_name}>消费满200元可用</div>
          </Flex>
          <Flex className={styles.wrap} justify='between'>
            <div>使用门槛</div>
            <div className={styles.wrap_name}>消费满200元可用</div>
          </Flex>

          <div className={styles.store_box}>
            <Flex className={styles.title} align='center'>
              <div>适用店铺</div>
            </Flex>
            <Flex>
              <img className={styles.store_img} src="http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png" alt="" />
              <Flex className={styles.store_info} direction='column' align='start'>
                <div className={styles.store_name}>店铺名</div>
                <div className={styles.address}>
                  <div>广州市海珠区大干围海珠创意产业园10栋402</div>
                  <div>800m</div>
                </div>

              </Flex>
            </Flex>
          </div>
        </div>

        <Flex onClick={handleAction} align='center' justify='center' className={styles.button}>
          知道了
        </Flex>

      </div>
    </div>
  )
}
