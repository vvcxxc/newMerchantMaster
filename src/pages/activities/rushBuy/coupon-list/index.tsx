import React, { Component } from 'react'
import Select from '../components/select'
import ListItem from '../components/list-item'
import styles from './index.less'

export default class CouponList extends Component {
  state = {

  }

  // 加载更多
  onMore = () => {

  }





  render (){
    return (
      <div className={styles.list_page}>
        <Select />
        <div className={styles.list}>
          <ListItem />
        </div>
      </div>
    )
  }
}
