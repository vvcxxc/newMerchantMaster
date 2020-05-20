/**title: 我的收益 */
import React, { Component } from 'react';
import styles from './index.less';
import FiltrateLayout from '@/components/layout';
import request from '@/services/request';
import { Toast, Flex, WingBlank } from 'antd-mobile';
import moment from 'moment';
import noneImg from './none.png';

interface RateItem {
	order_sn: string;
	date: string;
	money: number;
}

interface CouponItem {
	coupons_name: string;
	store_name: string;
	date: string;
	money: number;
	order_sn: string;
}

interface AdItem {
	ad_name: string;
	store_name: string;
	date: string;
	ad_msg: string;
	money: number;
}

export default class PlatformBenefit extends Component {
	state = {
		data: [],
		type: 0,
		total: 0,
		invoice: 0,
		time: '',
		//是否重置
		plat_type: 1,
    listnone: false,
    page: 1
	};
	componentDidMount = () => this.getData();
	changePlatType = () => {
		this.setState({ plat_type: 1, page: 1 })
	}
	handleTabChange = (index: number) => {
		this.setState({ plat_type: 2 })
		this.setState({ type: index, data: [], page: 1 }, this.getData)
	};
	handleChange = (query: any) => {
		this.setState({ time: query.time, page: 1 }, this.getData);
	}
	getData = async () => {
		let url = '';
		if (this.state.type === 0) {
			url = 'v3/finance/rate_earnings';
		} else if (this.state.type === 1) {
			url = 'v3/finance/coupons_earnings';
		} else {
			url = 'v3/finance/ad_earnings';
		}
		Toast.loading('');
		const res = await request({
			url,
			params: {
        date: this.state.time ? moment(this.state.time).unix() : undefined,
        page: this.state.page
      }
		});
		Toast.hide();
		if (res.code === 200) {
			let temp;
			if(res.rate_sum||res.rate_sum==0){
				temp=res.rate_sum;
			}else if(res.coupons_sum||res.coupons_sum==0){
				temp=res.coupons_sum;
			}else if(res.ad_sum||res.ad_sum==0){
				temp=res.ad_sum;
      }
      let data = []
      if(this.state.page > 1){
        data = [...this.state.data, ...res.data]
      }else {
        data = res.data
      }
			this.setState({
				data,
				total: temp,
				invoice: res.invoice
			}, () => {
				if (res.data.length == 0) {
					this.setState({ listnone: true })
				} else {
					this.setState({ listnone: false })
				}
			});
		}
  };

  loadMore = () => {
    if(!this.state.listnone){
      this.setState({page:this.state.page + 1},()=>{
        this.getData()
      })
    }else {

    }
    console.log(123)
  }
	render() {
		let list;
		if (this.state.type === 0) {
			list = this.state.data.map((_: RateItem) => (
				<Flex direction="column" className={styles.item}>
					<Flex>
						<Flex.Item>{_.order_sn}</Flex.Item>
						<div className="price">{_.money}</div>
					</Flex>
					<Flex className="info">{_.date}</Flex>
				</Flex>
			));
		} else if (this.state.type === 1) {
			list = this.state.data.map((_: CouponItem) => (
				<Flex direction="column" className={styles.item}>
					<Flex>
						<Flex.Item>{_.coupons_name}</Flex.Item>
						<div className="price">{_.money}</div>
					</Flex>
					<Flex className="info">{_.store_name}</Flex>
					<Flex className="info">
						单号：<Flex.Item>{_.order_sn}</Flex.Item>
						{_.date}
					</Flex>
				</Flex>
			));
		} else if (this.state.type === 2) {
			list = this.state.data.map((_: AdItem) => (
				<Flex direction="column" className={styles.item}>
					<Flex>
						<Flex.Item>{_.ad_name}</Flex.Item>
						<div className="price">{_.money}</div>
					</Flex>
					<Flex className="info">{_.store_name}</Flex>
					<Flex className="info">
						<Flex.Item>{_.ad_msg}</Flex.Item>
						{_.date}
					</Flex>
				</Flex>
			));
		}
		const insignificant = (
			<Flex>
				总计￥{this.state.total}
			</Flex>
		);
		return (
			<FiltrateLayout
				undetermined={[]}
				tabs={['费率', '券', '广告']}
				onTabChange={this.handleTabChange}
				hasInsignificant={true}
				insignificant={insignificant}
				onChange={this.handleChange}
				plat_type={this.state.plat_type}
				changePlatType={this.changePlatType}
			>
				<WingBlank>
					{list}
          <div className={styles.loadingMore} onClick={this.loadMore}>
            {
              this.state.listnone ? '暂无更多数据' : '加载更多'
            }
          </div>
					{/* <div style={{ height: "450px", width: "300px", position: "fixed", left: "50%", top: "40%", marginLeft: "-150px", display: "flex", flexDirection: "column", justifyContent: "space-between	", alignItems: "center", opacity: this.state.listnone ? 1 : 0 }}>
						<img src={noneImg} style={{ width: "100%" }} />
						<div style={{ width: "100%", color: "#999999", fontSize: "50px", textAlign: "center" }}>暂无交易信息</div>
					</div> */}
				</WingBlank>
			</FiltrateLayout>
		);
	}
}
