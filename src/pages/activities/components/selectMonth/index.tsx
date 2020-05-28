import React, { useEffect, useState, } from 'react';
import styles from './index.less';
import { PickerView, Flex } from 'antd-mobile';

interface Props {
  onChange: (value?: number) => any;
  value: undefined | number;
}

export default function selectMonth(props: Props) {
  const [seasons, setSeasons] = useState([{ value: 1, label: '1个月' }])
  const [value, setValue] = useState(0)
  useEffect(() => {
    let list = []
    for (let i = 1; i <= 12; i++) {
      let item = { value: i, label: `${i}个月` }
      list.push(item)
    }
    setSeasons(list)
    setValue(props.value)
  }, [])
  const onChange = (value: Array<number>) => {
    setValue(value[0])
  }

  const confirm = () => {
    props.onChange(value)
  }

  return (
    <div className={styles.mark}>
      <div className={styles.picker_box}>
        <Flex className={styles.button_box} justify='between'>
          <div onClick={confirm} style={{color: '#4781FE'}}>确认</div>
          <div onClick={()=>props.onChange()}>取消</div>
        </Flex>
        <PickerView
          onChange={onChange}
          value={[value]}
          data={seasons}
          cascade={false}
          cols={1}
        />
      </div>

    </div>
  )
}
