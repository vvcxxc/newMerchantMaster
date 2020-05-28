import React, { useState } from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'

export default function Header () {

  return (
    <div>
      <Flex className={styles.header_box}>
        <img src={require('./icon-back@3x.png')} className={styles.backImg} alt='' />
      </Flex>
    </div>
  )
}
