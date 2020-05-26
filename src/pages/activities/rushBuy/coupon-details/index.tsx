import React, { Component } from 'react'
import { Flex, Carousel } from 'antd-mobile'
import styles from './index.less'
import moment from 'moment'
import GiftModal from './modal'
let timer:any = null
export default class CouponDetails extends Component {
  state = {
    timeout: {},
    is_modal: false
  }

  componentDidMount() {

    timer = setInterval(() => {
      let timeout = this.computedTime()
      this.setState({
        timeout
      })
    }, 1000)
  }

  // 时间处理
  computedTime = () => {
    const now = moment().format('X')
    const wei = moment('2020-07-21 00:00').format('X')
    const t = Number(wei) - Number(now)
    const d = Math.floor(t / (24 * 3600));
    const h = Math.floor((t - 24 * 3600 * d) / 3600);
    const m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
    const s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
    return {
      day: d < 10 ? `0${d}` : d,
      hour: h < 10 ? `0${h}` : h,
      minute: m < 10 ? `0${m}` : m,
      second: s < 10 ? `0${s}` : s
    }
  }


  componentWillUnmount() {
    clearInterval(timer)
  }

  showGift = () => {
    this.setState({is_modal: true})
  }

  render() {
    const { timeout } = this.state
    return (
      <div className={styles.details_page}>
        <div className={styles.header_box}>
          <div className={styles.banner_box}>
            <Carousel
              autoplay={false}
              infinite
              dots={false}
            >
              <video
                className={styles.banner_item}
                src="https://videocdn.taobao.com/oss/ali-video/d6bc4ae3eb3c866bee9903d47d1210c6/video.mp4"
                title="测试"
                controls
              ></video>
              <div className={styles.banner_item}>333</div>
              <div className={styles.banner_item}>444</div>
            </Carousel>
            <div className={styles.banner_bottom}>
              <div className={styles.time_box}>
                <div className={styles.time_title}>距离结束还剩</div>
                <Flex className={styles.time}>
                  <div>{timeout.day}天</div>
                  <div className={styles.item}>{timeout.hour}</div>:
                  <div className={styles.item}>{timeout.minute}</div>:
                  <div className={styles.item}>{timeout.second}</div>
                </Flex>
              </div>
            </div>
          </div>
          <div className={styles.details_title}>
            <div className={styles.title_box}>
              <div className={styles.title_babel}>商品券</div>
              <div className={styles.title}>
                购买此券可以到店兑换一个草莓蛋糕购买此券可以到店兑换一个草莓蛋糕大叔大婶
              </div>
            </div>
            <Flex className={styles.money_box} align='baseline'>
              优惠价￥
              <div className={styles.now_money}>29.9</div>
              <div className={styles.old_money}>￥39.9</div>
            </Flex>
          </div>
        </div>

        {/* 成交有礼 */}
        <div className={styles.main_box}>
          <Flex className={styles.box_title}>成交有礼</Flex>
          <div className={styles.list}>

            <div className={styles.item} onClick={this.showGift}>
              <div className={styles.item_img_box}>
                <div className={styles.item_label}>实物券</div>
                <img src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png' alt="" />
              </div>
              <div className={styles.item_right}>
                <div className={styles.item_name}>老干妈兑换券</div>
                <div className={styles.item_store}>阳澄湖</div>
                <Flex className={styles.money_box}>
                  <div className={styles.money}>价值￥80</div>
                  <div className={styles.number}>剩余95张</div>
                </Flex>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.item_img_box}>
                <div className={styles.item_label}>实物券</div>
                <img src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png' alt="" />
              </div>
              <div className={styles.item_right}>
                <div className={styles.item_name}>老干妈兑换券</div>
                <div className={styles.item_store}>阳澄湖</div>
                <Flex className={styles.money_box}>
                  <div className={styles.money}>价值￥80</div>
                  <div className={styles.number}>剩余95张</div>
                </Flex>
              </div>
            </div>

          </div>
        </div>

        {/* 图文详情 */}
        <div className={styles.details_box}>
          <Flex className={styles.box_title}>商品详情</Flex>
          <img src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/tZBzzmfsJtQDz4xAHYs8pX2z8AfCyWdD.png' alt="" />
        </div>

        {
          this.state.is_modal ?  <GiftModal onChange={()=> this.setState({is_modal: false})}/> : null
        }


      </div>
    )
  }
}
