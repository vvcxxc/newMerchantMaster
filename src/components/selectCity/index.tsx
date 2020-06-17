import React, { useState } from 'react'
import styles from './index.less'
import { Flex, PickerView } from 'antd-mobile'

interface Props {
  list: Array<any>
}

const indicatorStyle = {
  fontSize: 16,
  height: 32,
  position: 'absolute',
  // top: '25.8vw !important',
  // width: '100%',
  // transform: 'translateY(-50%)',
  // borderTop: '2px solid #eee',
  // borderBottom: '2px solid #eee'
}
export default function SelectCity({ list }: Props) {
  const [city_list, setCityList] = useState([])
  const [province, setProvince] = useState({})
  const [city, setCity] = useState({})
  const [tab, setTab] = useState(1)



  const handleChangeCity = (item: any) => {
    console.log(item)
    if (tab === 1) {
      setProvince({ id: item.id, name: item.name })
      setCityList(item.city)
      setCity({})
      setTab(2)
    } else {
      setCity({ id: item.id, name: item.name })
    }

  }

  console.log(list)
  return (
    <div className={styles.select_city_box}>
      <Flex className={styles.picker_buttons} justify='end'>
        <img src={require('@/assets/close.png')} alt="" />
      </Flex>
      <Flex className={styles.select_tab}>
        <div className={styles.select_tab_item} onClick={()=> setTab(1)}>
          {province.name|| '请选择省份'}
          {tab === 1 ? <div className={styles.select_tab_item_selected}></div> : null}

        </div>
        {
          city_list.length ? <div className={styles.select_tab_item} onClick={()=> setTab(2)}>
            {city.name || '请选择城市'}
            {tab === 2 ? <div className={styles.select_tab_item_selected}></div> : null}
          </div> : null
        }

      </Flex>
      <div className={styles.city_box}>
        <Flex direction='column' align='start'>
          {
            tab === 1 ? list.map((item: any) => {
              return (
                <div>
                  {
                    tab === 1 && province.id === item.id ?
                     <Flex align='center' style={{color: '#4781FE'}} onClick={() => handleChangeCity(item)} className={styles.city_box_item}>{item.name}</Flex>
                     : <Flex align='center' onClick={() => handleChangeCity(item)} className={styles.city_box_item}>{item.name}</Flex>
                  }

                </div>
              )
            }) : tab === 2 ? city_list.map((item:any) => {
              return (
                <div>
                  {
                    tab === 2 && city.id === item.id ?
                     <Flex align='center' style={{color: '#4781FE'}} onClick={() => handleChangeCity(item)} className={styles.city_box_item}>{item.name}</Flex>
                     : <Flex align='center' onClick={() => handleChangeCity(item)} className={styles.city_box_item}>{item.name}</Flex>
                  }

                </div>
              )
            }) : null
          }
        </Flex>
      </div>

    </div >
  )
}
