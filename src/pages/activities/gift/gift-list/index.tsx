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
      let { id, sum, type } = this.props.location.query
      const { gift_list, list } = this.props
      if (this.props.list.length == 0) {
        type = Number(type)
        let list = []
        switch (type) {
          case 1:
            list = [{ title: '发起拼团', list: [], gift_list: [] }, { title: '参团有礼', list: [], gift_list: [] }, { title: '成团有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
          case 2:
            list = [{ title: '购买有礼', list: [], gift_list: [] }, { title: '助力有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
          case 3:
            list = [{ title: '购买有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
          case 4:
            list = [{ title: '购买有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
        }
        // console.log(list[id].title)
        // document.title = list[id].title
        this.props.dispatch({
          type: 'gift/setData',
          payload: {
            list,
          }
        })
        this.setState({ list },()=>{
          this.getList()
          this.computeSum()
        })
      }else {
        this.setState({ list },()=>{
          this.getList()
          this.computeSum()
        })
      }



      this.setState({ item_id: id, sum, type })

    }

    // 再次进入时请求数据
    getList = async() => {
      const { page, total_pages } = this.props
      const { list } = this.state
      let regPos = /^[1-9]+[0-9]*]*$/;
      let new_list: any = []
      let total = 1
      if(regPos.test(page) && regPos.test(total_pages)) {
        if (page <= total_pages){
          for(let i = 1; i <= page; i ++){
            try {
              let res = await getGiftList(1, i)
              total = res.meta.pagination.total_pages
              new_list.push(...res.data)
              // let g_list = this.compareList(gift_list, new_list)

            } catch (error) {

            }

          }
          this.props.dispatch({
            type: 'gift/setData',
            payload: {
              total_pages: total
            }
          })
          this.giftList( new_list, list)
        }
      }

    }

    //  将gift_list和list比对
    giftList = (gift_list: any, list: any) => {
      let giftList = [...gift_list]
      let id = this.props.location.query.id
      let now_list = list[id].list // 当前list
      let all_list = [] // 其他list
      for (let i in list){
        if(i != id){
          all_list.push(...list[i].list)
        }
      }
      all_list = [...now_list,...all_list]
      for (let i in giftList){
        giftList[i].occupation_number = 0

        for (let a in now_list){
          if(giftList[i].id == now_list[a].gift_id){
            giftList[i].is_choose = true
            giftList[i].occupation_number = now_list[a].repertory_num
          }
        }
        for (let a in all_list){
          if(giftList[i].id == all_list[a].gift_id){
            giftList[i].total_surplus_num = Number(giftList[i].total_surplus_num) - Number(all_list[a].repertory_num)
          }
        }
      }
      this.setState({gift_list: giftList})
    }

    chooseItem = (action: string, item: object) => {
      const { type, sum, item_id } = this.state
      let g_list = JSON.parse(JSON.stringify(this.state.gift_list))
      let List = JSON.parse(JSON.stringify(this.state.list))


      if (action === 'add') {
        let occupation_number = 0 // 已选择数量
        let total_surplus_num = 0
        if(sum > item.total_surplus_num){
          occupation_number = item.total_surplus_num
          total_surplus_num = 0
        }else {
          occupation_number = sum // 已选择数量
          total_surplus_num = item.total_surplus_num - occupation_number // 剩余数量
        }
        for (let i in g_list) {
          if (g_list[i].id == item.id) {
            g_list[i].total_surplus_num = total_surplus_num
            g_list[i].occupation_number = occupation_number
            g_list[i].is_choose = true
          }
        }
        // 把item添加到list的gift_list
        let giftList = List[item_id].gift_list
        giftList.push(item)
        giftList = RemoveDup(giftList)
        List[item_id].gift_list = giftList

        // 把id，数量添加到list的list
        let new_list = List[item_id].list
        new_list.push({gift_id: item.id, repertory_num: occupation_number})
        List[item_id].list = new_list
        this.setState({gift_list: g_list,list: List},()=>{this.computeSum()})
      } else if (action === 'delete') {
        let total_surplus_num = Number(item.total_surplus_num) + Number(item.occupation_number)
        for(let i in g_list){
          if(g_list[i].id == item.id){
            g_list[i].occupation_number = 0
            g_list[i].total_surplus_num = total_surplus_num
            g_list[i].is_choose = false
          }
        }

        // 把item从list的list删掉
        let new_list = List[item_id].list
        new_list = new_list.filter((res: Array<any>)=>{
          return res.gift_id != item.id
        })
        List[item_id].list = new_list

        // 把item从list的gift_list中删掉
        let giftList = List[item_id].gift_list
        giftList = giftList.filter((res: object)=> {
          return res.id != item.id
        })
        List[item_id].gift_list = giftList
        this.setState({gift_list: g_list,list: List}, ()=>{this.computeSum()})
      }
    }


    // 计算派送数量
    computeSum = () => {

      const { list, item_id } = this.state
      let arr = list[item_id].list
      let sum = 0
      for(let i in arr){
        sum = sum + Number(arr[i].repertory_num)
      }
      this.setState({total: sum})
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

