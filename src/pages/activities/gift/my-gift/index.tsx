import React, { Component } from 'react'
import styles from './index.less'
import Header from '@/components/header'
import Item from './item'
export default class MyGift extends Component {
  state = {

  }

  render() {
    return (
      <div className={styles.my_gift_page}>
        <Header title='我的礼品' color='dark' style={{background: '#fff'}}/>
        <Item />
        <Item />
      </div>
    )
  }
}
