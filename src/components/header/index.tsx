import React, { useState } from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'
import router from 'umi/router'
import Prompt from 'umi/prompt';



interface Props {
  color?: 'light' | 'dark' ; // 返回箭头的颜色
  title: string; // 标题
  style?: React.CSSProperties;
  rightRender?: ()=> React.ReactNode
}


export default function Header ({color='light', title='', style, rightRender}: Props) {
  return (
    <div>
      <Flex className={styles.header_box} align='center' style={style} justify='between'>
        <div onClick={()=>router.goBack()}>
          {
            color === 'light' ?
              <img src={require('@/assets/back_light.png')} className={styles.backImg} alt='' /> :
                color === 'dark' ?
                  <img src={require('@/assets/back_dark.png')} className={styles.backImg} alt='' /> : null
          }
        </div>
        <div className={styles.title} style={color === 'light' ? {color: '#fff'} : {color: '#000'}}>
          {title}
        </div>
        <div>
          {rightRender ? rightRender() : null}
        </div>
      </Flex>
      <Prompt
        when={true}
        message={location => {
          console.log('离开')
          return window.confirm(`confirm to leave to ${location.pathname}?`);
        }}
      />
    </div>
  )
}
