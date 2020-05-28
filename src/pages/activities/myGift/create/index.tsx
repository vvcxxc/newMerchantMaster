/**发布引流礼品 */
import React, { Component } from 'react'
import { Flex, Toast, Icon, ImagePicker } from 'antd-mobile'
import upload from '@/services/oss'
import Header from '@/components/header'
import SelectMonth from '../../components/selectMonth'
import styles from './index.less'

export default class CreateGift extends Component {
  state = {
    type: 1, // 券类型
    is_show: false, // 显示选择时间
    limit_type: 1, // 使用限制
    files: []
  }

  // 选择卡券类型
  selectType = (type: number) => this.setState({ type })
  // 选择使用限制
  selectLimitType = (limit_type: number) => this.setState({ limit_type })

  // 选择时间
  selectMonth = (value?: number) => {
    if (value) {

    }
    this.setState({ is_show: false })
  }

  // 图片上传
  imgChange = (files: Array<object>, type: string, ) => {
    console.log(type)
    if (type == 'add') {
      if (files[0]) {
        Toast.loading('', 100)
        const img = files[0].url;
        upload(img).then(res => {
          Toast.hide()
          this.setState({ files, });
        })
      }
    } else if (type == 'remove') {
      this.setState({ files: [] })
    }


  }

  render() {
    const { type, is_show, limit_type, files } = this.state
    return (
      <div className={styles.create_page}>
        <Header />
        <div className={styles.create_main}>

          {/* 基本信息 */}
          <div className={styles.main_info}>
            <div className={styles.info_title}>基本信息</div>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>选择卡券类型</div>
              <Flex className={styles.item_main} justify='end'>
                <div onClick={this.selectType.bind(this, 1)} className={styles.item_choose} style={type === 1 ? { color: '#000' } : undefined}>
                  {
                    type === 1 ?
                      <img src='http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png' alt='' />
                      :
                      <img src='http://oss.tdianyi.com/front/p8kjkCbnYmZfD3JGP8feeKsWt8BQNHPh.png' alt='' />
                  }
                  现金券
                </div>
                <div onClick={this.selectType.bind(this, 2)} className={styles.item_choose} style={type === 2 ? { color: '#000' } : undefined}>
                  {
                    type === 2 ?
                      <img src='http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png' alt='' />
                      :
                      <img src='http://oss.tdianyi.com/front/p8kjkCbnYmZfD3JGP8feeKsWt8BQNHPh.png' alt='' />
                  }
                  商品券
                </div>
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>卡券有效期</div>
              <Flex className={styles.item_main} justify='end' align='center' onClick={() => this.setState({ is_show: true })}>
                卡券有效期至<Icon type='right' color='#999999' />
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>卡券面额</div>
              <Flex className={styles.item_main} justify='end' align='center'>
                <input type='number' />元
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>使用门槛</div>
              <Flex className={styles.item_main} justify='end' align='center'>
                <input type='number' />元
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>发放数量</div>
              <Flex className={styles.item_main} justify='end' align='center'>
                <input type='number' />(份)
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>使用说明</div>
              <Flex className={styles.item_main} justify='end' align='center'>
                <input style={{ textAlign: 'left' }} placeholder='请输入使用说明，限15字' />
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>使用限制</div>
              <Flex className={styles.item_main} justify='end'>
                <div onClick={this.selectLimitType.bind(this, 1)} className={styles.item_choose} style={limit_type === 1 ? { color: '#000' } : undefined}>
                  {
                    limit_type === 1 ?
                      <img src='http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png' alt='' />
                      :
                      <img src='http://oss.tdianyi.com/front/p8kjkCbnYmZfD3JGP8feeKsWt8BQNHPh.png' alt='' />
                  }
                  仅本店使用
                </div>
                <div onClick={this.selectLimitType.bind(this, 2)} className={styles.item_choose} style={limit_type === 2 ? { color: '#000' } : undefined}>
                  {
                    limit_type === 2 ?
                      <img src='http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png' alt='' />
                      :
                      <img src='http://oss.tdianyi.com/front/p8kjkCbnYmZfD3JGP8feeKsWt8BQNHPh.png' alt='' />
                  }
                  无限制
                </div>
              </Flex>
            </Flex>
          </div>

          {/* 图片信息 */}
          {
            type === 2 ? <div className={styles.main_info}>
              <div className={styles.info_title}>图片信息</div>
              <div className={styles.img_title}>活动图片</div>
              <div style={{ paddingBottom: 32 }}>
                <ImagePicker
                  className={styles.img_box}
                  files={files}
                  length="1"
                  disableDelete={false}
                  onChange={this.imgChange}
                  selectable={files.length < 1}
                />
              </div>
            </div> : null

          }

          {/* 使用规则 */}
          <div className={styles.main_info}>
            <div className={styles.info_title}>使用规则</div>
          </div>

        </div>

        {
          is_show ? <SelectMonth onChange={this.selectMonth} value={undefined} /> : null
        }


      </div>
    )
  }
}
