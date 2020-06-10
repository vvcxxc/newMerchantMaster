/**title: 添加礼品 */
import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import GiftItem from './item'
import { connect } from 'dva'
import router from 'umi/router'
import styles from './index.less'

export default connect(({ gift }: any) => gift)(
  class Gift extends Component<any> {
    state = {
      number: 0
    }


    componentDidMount() {

    }

    addGift = () => {
      router.push('/activities/gift/gift-list')
    }


    submit = () => {

      router.goBack()
    }

    render() {
      const { total } = this.props
      return (
        <div className={styles.gift_page}>
          <Flex className={styles.gift_header} align='center' justify='between'>
            <div>
              <img className={styles.header_img} src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/YkrCDnRhAH2ip5kAbys5sCSHMBXrQJG6.png' alt='' />
            派送数量：{total}
            </div>
            <Flex className={styles.add_gift} align='center' justify='center' onClick={this.addGift}>添加礼品</Flex>

          </Flex>
          <div style={{ marginBottom: 200 }}>
            <GiftItem />
            <GiftItem />
            <GiftItem />
          </div>

          <Flex className={styles.button_box} align='center' justify='between'>
            <Flex className={styles.cancel} align='center' justify='center' onClick={() => router.goBack()}>取消</Flex>
            <Flex className={styles.submit} align='center' justify='center' onClick={this.submit}>确认</Flex>
          </Flex>
        </div>
      )
    }
  }
)

