/**title: 发布引流礼品 */
import React, { Component } from 'react'
import { Flex, Toast, Icon, ImagePicker } from 'antd-mobile'
import upload from '@/services/oss'
import { addGift } from '@/services/api'
import Header from '@/components/header'
import SelectMonth from '../../components/selectMonth'
import styles from './index.less'

export default class CreateGift extends Component {
  state = {
    type: 1, // 券类型
    is_show: false, // 显示选择时间
    limit_type: 1, // 使用限制
    files: [],
    validity: 0, // 有效期（月）
    offset_money: '', // 卡券面额(现金券)
    use_min_price: '', // 使用门槛(现金券)
    gift_name: '', // 	礼品名称(商品券)
    worth_money: '', // 商品价格(展示价)(商品券)
    gift_image: [], // 	礼品图片(商品券)
    total_repertory_num: '', // 总库存
    each_num: '', // 每份个数
    use_description: '', // 使用说明
    rule_description: '', // 参与规则
  }

  componentDidMount() {
  }

  // 选择卡券类型
  selectType = (type: number) => this.setState({ type })
  // 选择使用限制
  selectLimitType = (limit_type: number) => this.setState({ limit_type })

  // 选择时间
  selectMonth = (value?: number) => {
    if (value) {
      this.setState({ validity: value })
    }
    this.setState({ is_show: false })
  }

  inputChange = (type: string) => ({ target: { value } }: any) => {
    // console.log(type, value)
    this.setState({ [type]: value })
  }

  // 图片上传
  imgChange = (files: Array<object>, type: string,) => {
    console.log(type)
    if (type == 'add') {
      if (files[0]) {
        Toast.loading('', 100)
        const img = files[0].url;
        upload(img).then((res: any) => {
          console.log(res)
          let path = res.data.path
          let gift_image = this.state.gift_image
          gift_image.push(path)
          Toast.hide()
          this.setState({ files, gift_image });
        })
      }
    } else if (type == 'remove') {
      this.setState({ files: [], gift_image: [] })
    }


  }

  submit = () => {
    const { type, limit_type, validity, offset_money, use_min_price, gift_name, worth_money, gift_image, total_repertory_num, each_num, use_description } = this.state

    let data: any = {}
    if (type === 1) {
      data.gift_type = type;
      data.validity_day = validity * 30;
      data.offset_money = offset_money;
      data.use_min_price = use_min_price;
      data.total_repertory_num = total_repertory_num;
      data.each_num = each_num;
      data.use_description = use_description;
      data.is_astrict_store = limit_type
    } else {
      data.gift_type = type;
      data.validity_day = validity * 30;
      data.gift_name = gift_name;
      data.worth_money = worth_money;
      data.gift_image = gift_image[0];
      data.total_repertory_num = total_repertory_num;
      data.each_num = each_num;
      data.use_description = use_description;
      data.is_astrict_store = limit_type
    }
    addGift(data).then(res => {
      console.log(res)
      if(res.data.id){
        Toast.success('添加成功',)
      }
    })

  }


  render() {
    const { type, is_show, limit_type, files, validity, offset_money, gift_name, use_min_price, worth_money, total_repertory_num, each_num, use_description } = this.state
    return (
      <div className={styles.create_page}>
        <Header title='添加礼品' />
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
                卡券有效期{validity ? validity + '个月' : ''}<Icon type='right' color='#999999' />
              </Flex>
            </Flex>
            {
              type === 1 ? (
                <Flex className={styles.info_item} justify='between' align='center'>
                  <div className={styles.item_label}>卡券面额</div>
                  <Flex className={styles.item_main} justify='end' align='center'>
                    <input type='number' value={offset_money} onChange={this.inputChange('offset_money')} />元
              </Flex>
                </Flex>
              ) : (
                  <Flex className={styles.info_item} justify='between' align='center'>
                    <div className={styles.item_label}>卡券名称</div>
                    <Flex className={styles.item_main} justify='end' align='center'>
                      <input value={gift_name} onChange={this.inputChange('gift_name')} />元
              </Flex>
                  </Flex>
                )
            }

            {
              type === 1 ? (
                <Flex className={styles.info_item} justify='between' align='center'>
                  <div className={styles.item_label}>使用门槛</div>
                  <Flex className={styles.item_main} justify='end' align='center'>
                    <input type='number' value={use_min_price} onChange={this.inputChange('use_min_price')} />元
              </Flex>
                </Flex>
              ) : (
                  <Flex className={styles.info_item} justify='between' align='center'>
                    <div className={styles.item_label}>商品原价</div>
                    <Flex className={styles.item_main} justify='end' align='center'>
                      <input type='number' value={worth_money} onChange={this.inputChange('worth_money')} />元
              </Flex>
                  </Flex>
                )
            }

            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>发放数量</div>
              <Flex className={styles.item_main} justify='end' align='center'>
                <input type='number' value={total_repertory_num} onChange={this.inputChange('total_repertory_num')} />(份)
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>发放方式</div>
              <Flex className={styles.item_main} justify='end' align='center'>
                <input type='number' value={each_num} onChange={this.inputChange('each_num')} />
                <div>(张/份)</div>
              </Flex>
            </Flex>
            <Flex className={styles.info_item} justify='between' align='center'>
              <div className={styles.item_label}>使用说明</div>
              <Flex className={styles.item_main} justify='end' align='center'>
                <input style={{ textAlign: 'left' }} value={use_description} onChange={this.inputChange('use_description')} placeholder='请输入使用说明，限15字' />
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

          {/* 参与规则 */}
          {/* <div className={styles.main_info}>
            <div className={styles.info_title}>参与规则</div>
          </div> */}


        </div>

        {
          is_show ? <SelectMonth onChange={this.selectMonth} value={undefined} /> : null
        }

        <Flex className={styles.button_box} align='center' justify='between'>
          <Flex className={styles.cancel} align='center' justify='center'>取消</Flex>
          <Flex className={styles.submit} align='center' justify='center' onClick={this.submit}>提交活动</Flex>
        </Flex>

      </div>
    )
  }
}
