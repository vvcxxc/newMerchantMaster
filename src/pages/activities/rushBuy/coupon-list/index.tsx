import React, { Component } from 'react'
import Select from '../components/select'
import ListItem from '../components/list-item'
import Header from '@/components/header'
import styles from './index.less'
import { Flex } from 'antd-mobile'
import router from 'umi/router'

export default class CouponList extends Component {
  state = {
    is_add: false
  }

  // 加载更多
  onMore = () => {

  }

  // 添加优惠券
  addCoupon = () => {
    console.log(444)
    this.setState({is_add: true})
  }


  goToAdd = (type: string) => {
    if(type === 'money'){
      router.push('/activities/coupon/add-money')
    }else {
      router.push('/activities/coupon/add-coupon')
    }
  }

  render (){
    const { is_add } = this.state
    const add = (
      <Flex className={styles.header_icon} direction='column' onClick={this.addCoupon}>
        <div className={styles.icon_box}></div>
        <div>添加</div>
      </Flex>
    )
    return (
      <div className={styles.list_page}>
        <Header title='抢购活动' color='dark' style={{background: '#fff'}} rightRender={()=> add} />
        <Select />
        <div className={styles.list}>
          <ListItem />
        </div>
        {
          is_add ? <Flex className={styles.add_mark} align='center' justify='center'>
          <Flex className={styles.add_box} direction='column' align='center'>
            <div className={styles.add_title}>请选择商品类型</div>
            <img src={require('@/assets/close.png')} alt="" onClick={()=>this.setState({is_add: false})}/>
            <Flex className={styles.add_item_activated} onClick={this.goToAdd.bind(this,'coupon')} align='center' justify='center'>商品券</Flex>
            <Flex className={styles.add_item} onClick={this.goToAdd.bind(this,'money')} align='center' justify='center'>现金券</Flex>
          </Flex>
        </Flex> : null
        }

      </div>
    )
  }
}
