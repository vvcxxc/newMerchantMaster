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
        <Flex className={styles.index_top}>
          <Flex direction='column' justify='center' align='center'>
            <img src="" alt="" />
            <div>扫码验券</div>
          </Flex>
          <Flex direction='column' justify='center' align='center'>
            <img src="" alt="" />
            <div>财务统计</div>
          </Flex>
          <Flex direction='column' justify='center' align='center'>
            <img src="" alt="" />
            <div>核销记录</div>
          </Flex>
          <Flex direction='column' justify='center' align='center'>
            <img src="" alt="" />
            <div>核销记录</div>
          </Flex>
        </Flex>
        <div onClick={this.toAddGift}>跳转</div>
      </div>
    )
  }
}
