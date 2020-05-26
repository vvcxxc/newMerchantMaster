/** title:订单记录 */
import React, { Component } from 'react'
import styles from './index.less'
import { Flex, Icon } from 'antd-mobile'

export default class OrderList extends Component {
  state = {

  }

  render() {
    return (
      <div className={styles.list_page}>
        <Flex className={styles.tabs_box}>
          <Flex justify='center' className={styles.bottomRight} >已核销</Flex>
          <Flex justify='center' className={styles.bottomRight} >未核销</Flex>
          <Flex justify='center'>已退款</Flex>
        </Flex>
        <div className={styles.list}>
          <Flex className={styles.item}>
            <img className={styles.item_img} src="http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png" alt="" />
            <Flex className={styles.item_main} justify='between'>
              <div className={styles.item_left}>
                <div>张三</div>
                <div>68365523440023400</div>
              </div>
              <div className={styles.item_right}>
                <div className={styles.money}>+109.00</div>
                <div className={styles.time}>2020/11/30</div>
              </div>
              <div className={styles.icon_right}>
                <Icon type='right' color='#CBCDCF' />
              </div>
            </Flex>
          </Flex>

          <Flex className={styles.item}>
            <img className={styles.item_img} src="http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png" alt="" />
            <Flex className={styles.item_main} justify='between'>
              <div className={styles.item_left}>
                <div>张三</div>
                <div>68365523440023400</div>
              </div>
              <div className={styles.item_right}>
                <div className={styles.money}>+109.00</div>
                <div className={styles.time}>2020/11/30</div>
              </div>
              <div className={styles.icon_right}>
                <Icon type='right' color='#CBCDCF' />
              </div>
            </Flex>
          </Flex>

        </div>
      </div>
    )
  }
}
