import React, { useState, useEffect } from 'react'
import styles from './index.less'
import { Flex, PickerView } from 'antd-mobile'

interface Props {
  list: Array<any>
  value?: Array<string>
  onChange: (type: string, value: any) => any
}

export default function SelectCity({ list, value, onChange }: Props) {
  const [city_list, setCityList] = useState([])
  const [province, setProvince] = useState({})
  const [city, setCity] = useState({})
  const [tab, setTab] = useState(1)

  useEffect(() => {
    if (value.length) {
      for (let i in list) {
        if (list[i].name == value[0]) {
          setProvince({ id: list[i].id, name: list[i].name })
          setCityList(list[i].city)
          let city = list[i].city
          for (let a in city) {
            if (city[a].name == value[1]) {
              setCity({ id: city[a].id, name: city[a].name })
            }
          }
        }
      }
    }
  }, [list])




  const handleChangeCity = (item: any) => {
    if (tab === 1) {
      setProvince({ id: item.id, name: item.name })
      setCityList(item.city)
      setCity({})
      setTab(2)
    } else {
      setCity({ id: item.id, name: item.name })
      onChange('selected',{province,city: { id: item.id, name: item.name}})
    }

  }

  return (
    <div className={styles.select_city_box}>
      <Flex className={styles.picker_buttons} justify='end'>
        <img src={require('@/assets/close.png')} alt="" onClick={()=> onChange('close',{})}/>
      </Flex>
      <Flex className={styles.select_tab}>
        <div className={styles.select_tab_item} onClick={() => setTab(1)}>
          {province.name || '请选择省份'}
          {tab === 1 ? <div className={styles.select_tab_item_selected}></div> : null}

        </div>
        {
          city_list.length ? <div className={styles.select_tab_item} onClick={() => setTab(2)}>
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
                      <Flex align='center' style={{ color: '#4781FE' }} onClick={() => handleChangeCity(item)} className={styles.city_box_item}>{item.name}</Flex>
                      : <Flex align='center' onClick={() => handleChangeCity(item)} className={styles.city_box_item}>{item.name}</Flex>
                  }

                </div>
              )
            }) : tab === 2 ? city_list.map((item: any) => {
              return (
                <div>
                  {
                    tab === 2 && city.id === item.id ?
                      <Flex align='center' style={{ color: '#4781FE' }} onClick={() => handleChangeCity(item)} className={styles.city_box_item}>{item.name}</Flex>
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
