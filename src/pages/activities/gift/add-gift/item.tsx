import React, { useEffect, useState } from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.less'
import router from 'umi/router'
interface Props {

}
export default function GiftItem(props: Props) {

  const deleteItem = (item) => {
    props.onChange(item, props.id)
  }



  return (
    <div className={styles.item_box}>
      <Flex className={styles.gift_item} align='center' justify='between'>
        <Flex direction='column' align='start'>
          <div>礼品名称：高猛的杯子</div>
          <div>提供店铺：高猛</div>
          <div>派送方式：1个/份</div>
        </Flex>
        <Flex className={styles.delete_button} align='center' justify='center'>
          删除
                </Flex>
      </Flex>

    </div>
  )
}
