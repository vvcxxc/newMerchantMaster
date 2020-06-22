import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile'
import router from 'umi/router'

interface Type {
  store_type: number; // 1-未填写，2-待审，3-通过，4-拒绝
  business_type: number; // 1-未填写，2-待审，3-通过，4-拒绝
  identity_type: number; // 1-未填写，2-待审，3-通过，4-拒绝
  examine_type: number; // 1-未填写，2-待审，3-通过，4-拒绝

}
interface Props {
  is_record: boolean; // 是否有审核记录
  types: Type;
}


export default function AuditResult({is_record, types}: Props) {
  const [is_show, setShow] = useState(false)


  useEffect(()=>{
    for(let key in types){
      console.log(types[key])
      if(types[key] === 3){
        setShow(true)
      }
    }
  },[types])

  const toCreateStore = () => {

    router.push('/SubmitQualifications')
  }

  const failedAudit = () => {
    if(types.store_type === 4){
      router.push('/SubmitQualifications?tabCurrent=0')
    }else if(types.business_type === 4){
      router.push('/SubmitQualifications?tabCurrent=1')
    }else if(types.identity_type === 4){
      router.push('/SubmitQualifications?tabCurrent=2')
    }else {
      router.push('/SubmitQualifications?tabCurrent=0')
    }
  }

  const getType = (type: number) => {
    let data = {
      title: '',
      main: '',
      text: '',
    }
      switch (type){
        case 2:
          data.title = styles.audit_item_title_under_review;
          data.main = styles.audit_item_text_under_review;
          data.text = '审核中';
          break
        case 3:
          data.title = styles.audit_item_title;
          data.main = styles.audit_item_text;
          data.text = '通过';
          break
        case 4:
          data.title = styles.audit_item_title_failed;
          data.main = styles.audit_item_text_failed;
          data.text = '审核失败';
          break
      }
      return data

  }

  return (
    <div>
      {
        is_record ?  <div className={styles.audit_box}>
        <div className={styles.audit_box_title}>资料审核中</div>
        <div className={styles.audit_box_tips}>请留意短信提醒，3个工作日出结果</div>

        <Flex className={styles.audit_record_box} justify='between' align='start'>
          <div className={ styles.audit_store_item }>
            <Flex className={getType(types.store_type).title} align='center' justify='between'>
              <img src={require('@/assets/index/store.png')} alt="" />
              门店信息
              </Flex>
            <Flex className={getType(types.store_type).main} align='center' justify='center'>{getType(types.store_type).text}</Flex>
          </div>

          <img src={require('@/assets/index/arrow.png')} className={styles.arrow} alt='' />

          <div className={styles.audit_license_item}>
            <Flex className={getType(types.business_type).title} align='center' justify='between'>
              <img src={require('@/assets/index/car.png')} alt="" />
              营业执照
              </Flex>
            <Flex className={getType(types.business_type).main} align='center' justify='center'>{getType(types.business_type).text}</Flex>
          </div>

          <img src={require('@/assets/index/arrow-ban.png')} className={styles.arrow} alt='' />

          <div className={styles.audit_id_card_item}>
            <Flex className={getType(types.identity_type).title} align='center'>
              <img src={require('@/assets/index/id-card.png')} alt="" />
              身份证
              </Flex>
            <Flex className={getType(types.identity_type).main} align='center' justify='center'>{getType(types.identity_type).text}</Flex>
          </div>
        </Flex>

        {
          is_show ? (
            <Flex className={styles.audit_button_box} align='center' justify='center'>
          <Flex className={styles.audit_button} justify='between' onClick={failedAudit}>
            查看原因并修改
              <img src={require('@/assets/index/right-arrow.png')} alt="" />
          </Flex>
        </Flex>
          ) : null
        }



      </div> :  <div className={styles.no_store_box}>
        <div className={styles.no_store_tips}>您没有入驻门店哦！</div>
        <div className={styles.no_store_button} onClick={toCreateStore}>入驻门店 &gt;&gt;</div>
      </div>

      }


    </div>
  )
}
