import React, { Component } from 'react'
import styles from './index.less'
import Header from '@/components/header'
import Item from './item'
import { getMyGiftList } from '@/services/api'
import { Flex } from 'antd-mobile'
export default class MyGift extends Component {
  state = {
    list: [],
    page: 0,
    is_more: false
  }

  componentDidMount() {
    getMyGiftList(1).then(res => {
      console.log(res,'rrr')
      if (res.meta.pagination.total_pages === 1) {
        this.setState({ is_more: false })
      }
      this.setState({ list: res.data })
    })
  }

  loadMore = () => {
    const { page, is_more, list } = this.state
    if (is_more) {
      this.setState({ page: page + 1 }, () => {
        getMyGiftList(this.state.page).then(res => {
          if (res.meta.pagination.total_pages === this.state.page) {
            this.setState({ is_more: false })
          }
          this.setState({ list: [...list, ...res.data] })
        })
      })

    }
  }


  render() {
    const { list, is_more } = this.state
    return (
      <div className={styles.my_gift_page}>
        <Header title='我的礼品' color='dark' style={{ background: '#fff' }} />
        {
          list.map((item: any) => {
            return <Item item={item} key={item.id} />
          })
        }
        <Flex className={styles.load_more} align='center' justify='center' onClick={this.loadMore}>
          {is_more ? '加载更多' : '暂无更多数据'}
        </Flex>
      </div>
    )
  }
}
