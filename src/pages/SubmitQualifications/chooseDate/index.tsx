/**
 * 选择有效期
 */
import React, { Component } from 'react';
import { WingBlank, Flex, DatePickerView, Button } from 'antd-mobile';
import styles from './index.less'
import moment from 'moment';
import { connect } from 'dva';
import router from 'umi/router';
import Cookies from 'js-cookie';
import Header from '@/components/header'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default connect(({ submitQua }: any) => submitQua)(
  class chooseDate extends Component<any> {
    state = {
      choose_date: '',
      value: now,
      date: '',
      /**选择日期 */
      is_type1: true,
      /**长期有效 */
      is_type2: false,
      /**判断是哪一个选择的 */
      type: 1,
    }

    componentDidMount() {
      let { choose_date } = this.state;
      let type = Number(this.props.location.query.type);
      if (choose_date && choose_date != '无') {
        let is_have = choose_date.includes('长')
        if (is_have) {
          this.setState({ is_type1: false, is_type2: true })
        } else {
          let value = moment(choose_date).toDate();
          this.setState({ value, date: choose_date })
        }
        this.setState({
          type,
          date: choose_date
        });
      } else {
        this.setState({
          value: now,
          type,
          date: moment(now).format("YYYY-MM-DD")
        })
      }
    }

    changeTime = (v: Date) => {
      let date = moment(v).format("YYYY-MM-DD");
      this.setState({ date: date })
      this.setState({ value: v })
    }
    /**选择日期 */
    chooseDate = () => {
      this.setState({
        is_type1: true,
        is_type2: false,
        date: moment(now).format("YYYY-MM-DD")
      })
    }
    /**长期有效 */
    chooseLong = () => {
      this.setState({
        is_type1: false,
        is_type2: true,
        date: '长期'
      })
    }
    /**点击完成 */
    submit = () => {
      const { type, date } = this.state;
      let stroage: any = localStorage.getItem('SubmitQualifications') ? JSON.parse(localStorage.getItem('SubmitQualifications')) : {};
      if (type == 1) {
        let temp = { ...stroage, idCardValidity: date }
        localStorage.setItem('SubmitQualifications', JSON.stringify(temp));
        localStorage.setItem('SubmitQualificationsTime', JSON.stringify(new Date().getTime()));
      } else {
        let temp = { ...stroage, businessLicenseValidity: date }
        localStorage.setItem('SubmitQualifications', JSON.stringify(temp));
        localStorage.setItem('SubmitQualificationsTime', JSON.stringify(new Date().getTime()));
      }
      router.goBack();
    }
    render() {
      const { is_type1, is_type2 } = this.state;
      const type1 = is_type1 == true ? (
        <div><img src={require('./choose.png')} /></div>
      ) : (
          <div><img src={require('./no_choose.png')} /></div>
        );
      const type2 = is_type2 == true ? (
        <div><img src={require('./choose.png')} /></div>
      ) : (
          <div><img src={require('./no_choose.png')} /></div>
        );
      const picker = is_type1 == true ? (
        <div>
          <Flex className={styles.showtime}>
            <div>{this.state.date}</div>
          </Flex>
          <div className={styles.choose}>
            <DatePickerView mode='date' onChange={this.changeTime} value={this.state.value} maxDate={new Date(2050, 1, 1)} />
          </div>
        </div>
      ) : (
          ''
        )

      return (
        <div style={{ width: '100%', height: '100%', background: '#fff', }}>
          <Header title='选择有效期' color='dark' />
          <WingBlank>
            <Flex className={styles.title}>有效期</Flex>
            <Flex className={styles.type}>
              <Flex className={styles.type1} onClick={this.chooseDate}>
                {type1}
                <div>选择日期</div>
              </Flex>
              <Flex onClick={this.chooseLong}>
                {type2}
                <div>长期有效</div>
              </Flex>
            </Flex>
          </WingBlank>

          {picker}
          <Flex className={styles.buttons}>
            <WingBlank style={{ width: '100%' }}>
              <Button type="primary" className={styles.button} onClick={this.submit}>
                完成
              </Button>
            </WingBlank>
          </Flex>
        </div>

      )
    }
  }

)

