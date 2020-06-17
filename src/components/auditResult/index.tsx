import React, { useEffect } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile'
import router from 'umi/router'


interface Props {
  is_record: boolean; // 是否有审核记录
}


export default function AuditResult({is_record}: Props) {



  const toCreateStore = () => {

    router.push('/SubmitQualifications/map')
  }

  return (
    <div>
      {
        is_record ?  <div className={styles.audit_box}>
        <div className={styles.audit_box_title}>资料审核中</div>
        <div className={styles.audit_box_tips}>请留意短信提醒，3个工作日出结果</div>

        <Flex className={styles.audit_record_box} justify='between' align='start'>
          <div className={styles.audit_store_item}>
            <Flex className={styles.audit_item_title} align='center' justify='between'>
              <img src={require('@/assets/index/store.png')} alt="" />
              门店信息
              </Flex>
            <Flex className={styles.audit_item_text} align='center' justify='center'>审核通过</Flex>
          </div>

          <img src={require('@/assets/index/arrow.png')} className={styles.arrow} alt='' />

          <div className={styles.audit_license_item}>
            <Flex className={styles.audit_item_title} align='center' justify='between'>
              <img src={require('@/assets/index/car.png')} alt="" />
              营业执照
              </Flex>
            <Flex className={styles.audit_item_text} align='center' justify='center'>审核通过</Flex>
          </div>

          <img src={require('@/assets/index/arrow-ban.png')} className={styles.arrow} alt='' />

          <div className={styles.audit_id_card_item}>
            <Flex className={styles.audit_item_title} align='center'>
              <img src={require('@/assets/index/id-card.png')} alt="" />
              身份证
              </Flex>
            <Flex className={styles.audit_item_text} align='center' justify='center'>审核通过</Flex>
          </div>
        </Flex>

        <Flex className={styles.audit_button_box} align='center' justify='center'>
          <Flex className={styles.audit_button} justify='between'>
            查看原因并修改
              <img src={require('@/assets/index/right-arrow.png')} alt="" />
          </Flex>
        </Flex>

      </div> :  <div className={styles.no_store_box}>
        <div className={styles.no_store_tips}>您没有入驻门店哦！</div>
        <div className={styles.no_store_button} onClick={toCreateStore}>入驻门店 >></div>
      </div>

      }


    </div>
  )
}
