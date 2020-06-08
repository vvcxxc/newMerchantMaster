import React, { useState, useEffect } from 'react'
import { Flex, Icon } from 'antd-mobile'
import styles from './index.less'

export default function Select() {
  const [order_sort, setOrder] = useState(0); // 0为默认，1为升序，2为降序
  const [verification_sort, setVerification] = useState(0); // 0为默认，1为升序，2为降序
  const [sell_sort, setSell] = useState(0); // 0为默认，1为升序，2为降序
  const [type, setType] = useState(1); // 1为即将开始，2为抢购中，3为已结束
  const [is_show, setShow] = useState(false); // 控制筛选条件展示
  const [show_sort, setShowSort] = useState(true); // 控制展示排序，为即将开始不展示
  const [coupon_type, setCouponType] = useState(1); // 抢购券类型，1为现金，2为兑换

  useEffect(()=>{
    if (type === 1) {
      setShowSort(false)
    } else {
      setShowSort(true)
    }
  },[])

  useEffect(() => {
    console.log(order_sort, verification_sort)

  }, [order_sort, verification_sort, sell_sort, type, coupon_type])

  const onSort = (type: string) => {
    if (type === 'order') {
      if (order_sort === 1) {
        setOrder(0)
      } else if (order_sort === 2) {
        setOrder(1)
      } else if (order_sort === 0) {
        setOrder(2)
      }
      setSell(0)
      setVerification(0)
    } else if (type === 'verification') {
      if (verification_sort === 1) {
        setVerification(0)
      } else if (verification_sort === 2) {
        setVerification(1)
      } else if (verification_sort === 0) {
        setVerification(2)
      }
      setSell(0)
      setOrder(0)
    } else if (type === 'sell') {
      if (sell_sort === 1) {
        setSell(0)
      } else if (sell_sort === 2) {
        setSell(1)
      } else if (sell_sort === 0) {
        setSell(2)
      }
      setOrder(0)
      setVerification(0)
    }
    setShow(false)
  }

  const handleAction = (type: number) => {
    setType(type)
    if (type === 1) {
      setShowSort(false)
    } else {
      setShowSort(true)
    }
    setShow(false)
  }

  const CouponType = (type: number) => {
    setCouponType(type)
  }

  return (
    <div className={styles.selectBox}>
      <Flex className={styles.type_box}>
        <div className={coupon_type === 2 ? styles.type_item_activated : styles.type_item} onClick={CouponType.bind(this, 2)}>商品券</div>
        <div className={coupon_type === 1 ? styles.type_item_activated : styles.type_item} onClick={CouponType.bind(this, 1)}>现金券</div>
      </Flex>
      <Flex className={styles.select_box}>
        <Flex align='center' justify='center' className={styles.bottomRight} style={{ color: '#4486F7' }} onClick={() => { setShow(true) }}>
          <div className={styles.title}>{type === 1 ? '即将开始' : type === 2 ? '抢购中' : type === 3 ? '已结束' : null}</div>
          <div>
            <div className={styles.triangle_down}></div>
          </div>
        </Flex>
        {
          show_sort ? <Flex align='center' justify='center' onClick={onSort.bind(this, 'order')} className={styles.bottomRight}>
            <div className={styles.title}>订单总数</div>
            <div>
              <div className={order_sort === 1 ? styles.triangle_up : styles.triangle_up_no}></div>
              <div className={order_sort === 2 ? styles.triangle_down : styles.triangle_down_no}></div>
            </div>
          </Flex> : null
        }
        {
          show_sort ? <Flex align='center' justify='center' onClick={onSort.bind(this, 'verification')} className={styles.bottomRight}>
            <div className={styles.title}>核销量</div>
            <div>
              <div className={verification_sort === 1 ? styles.triangle_up : styles.triangle_up_no}></div>
              <div className={verification_sort === 2 ? styles.triangle_down : styles.triangle_down_no}></div>
            </div>
          </Flex> : null
        }
        {
          show_sort ? <Flex align='center' justify='center' style={{ width: '25%' }} onClick={onSort.bind(this, 'sell')}>
            <div className={styles.title}>销售额</div>
            <div>
              <div className={sell_sort === 1 ? styles.triangle_up : styles.triangle_up_no}></div>
              <div className={sell_sort === 2 ? styles.triangle_down : styles.triangle_down_no}></div>
            </div>
          </Flex> : null
        }




      </Flex>
      {
          is_show ? <div className={styles.mark}>
            <div className={styles.choose_box}>
              <Flex onClick={handleAction.bind(this, 1)} justify='between' className={type === 1 ? styles.active : styles.choose_item}>
                <div>即将开始</div>
                {type === 1 ? <Icon color='#4486F7' size='sm' type='check' /> : null}
              </Flex>
              <Flex onClick={handleAction.bind(this, 2)} justify='between' className={type === 2 ? styles.active : styles.choose_item}>
                <div>抢购中</div>
                {type === 2 ? <Icon color='#4486F7' size='sm' type='check' /> : null}
              </Flex>
              <Flex onClick={handleAction.bind(this, 3)} justify='between' className={type === 3 ? styles.active : styles.choose_item} style={{ borderBottom: 'none' }}>
                <div>已结束</div>
                {type === 3 ? <Icon color='#4486F7' size='sm' type='check' /> : null}
              </Flex>
            </div>
          </div> : null
        }
    </div>
  )
}
