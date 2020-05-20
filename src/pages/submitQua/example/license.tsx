import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile';
import router from 'umi/router';


export default class LicenseExample extends Component {
  /**返回 */
  goBack = () => {
    router.push('/submitQua')
  }
  render (){
    return (
      <div style={{ width: '100%', background: '#fff' }} className={styles.examplePage}>
        <WingBlank>
           <Flex className={styles.title}>拍照示例：营业执照</Flex>
           <img src="http://oss.tdianyi.com/front/S3P3c3KSKKRNdJCSdNSTQ8GcNeN6aCt8.png" style={{width: '100%'}}/>
           <Flex className={styles.footer}>1、请上传营业执照原件照片 </Flex>
           <Flex className={styles.footer}>2、需文字清晰、完整，露出国徽及印章 </Flex>
           <Flex className={styles.footer}>3、不可使用其他证件替代，包括食品安全证明等 </Flex>
           <Button type="primary" style={{ marginTop: 60 }} className={styles.button} onClick={this.goBack}>
            我已了解，去上传
          </Button>
        </WingBlank>
      </div>
    )
  }
}
