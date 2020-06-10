/** title: 选择礼品 */
import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import Item from './item'
import { getGiftList } from '../service'
import styles from './index.less'
import { connect } from 'dva';
import { RemoveDup, } from '@/utils/common'
import router from 'umi/router'

export default connect(({ gift }: any) => gift)(
  class GiftList extends Component<any> {
    state = {
      gift_list: [],
      id: [],
      item_id: '',
      sum: '',
      type: '',
      list: [],
      total: 0,

    }

    componentDidMount() {


    }

    // 再次进入时请求数据
    getList = async() => {

    }


    chooseItem = (action: string, item: object) => {

    }


    submit = () => {
      const {gift_list, list} = this.state
      for(let i in gift_list){
        gift_list[i].is_choose = false
      }
      this.props.dispatch({
        type: 'gift/setData',
        payload: {
          // gift_list,
          list
        }
      })
      router.goBack()
    }

    loadMore = () => {
      const { page, total_pages } = this.props
      const {gift_list} = this.state
      if(page != total_pages){
        getGiftList(1, page + 1).then(res => {
          this.props.dispatch({
            type: 'gift/setData',
            payload: {
              // gift_list: [...gift_list, ...res.data],
              page: page + 1
            }
          })
          this.setState({ gift_list: [...gift_list,...res.data] })
        })
      }

    }
    cancel = () => {
      router.goBack()
    }

    render() {
      const { gift_list, total } = this.state
      const { total_pages,page } = this.props
      return (
          <div className={styles.gift_list}>
          <Flex className={styles.list_header} justify='end'>已选{total}份礼品</Flex>
          <div style={{marginBottom: 200}}>
            {
              gift_list.map(item => {
                if(item.total_surplus_num == 0 && item.occupation_number == 0){
                  return null
                }else {
                  return <Item key={item.id} gift={item} onChange={this.chooseItem} />
                }
              })
            }
            {
              page >= total_pages ? <div className={styles.more}>暂无更多数据</div> : <div className={styles.more} onClick={this.loadMore}>点击加载更多</div>
            }

          </div>
          <Flex className={styles.button_box} align='center' justify='between'>
            <Flex className={styles.cancel} align='center' justify='center' onClick={this.cancel }>取消</Flex>
            <Flex className={styles.submit} align='center' justify='center' onClick={this.submit}>提交活动</Flex>
          </Flex>
        </div>

      )
    }
  }
)

