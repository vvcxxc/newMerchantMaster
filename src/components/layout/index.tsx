import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex } from 'antd-mobile';
import UndeterminedModal, { Undetermined, After } from './undeterminedModal';
import SelectDate from './selectDate';
import checkIcon from './icon-check.png';
import icon from './icon.png';

//改前须知
//传入参数
// undetermined为条件1，格式{id,label},
// undetermined2为可选条件2，格式{_id:"条件1的id",label:"条件2的_id"},
// after追加代码结构，如财务列表页金额范围，筛选组件操作（如重置）并不能控制这个，但可以重置时通知使用页面自己重置state，一般没这个啥事没啥卵用
//触发方法：onChange()接收query:{hot:{id,_id},date:""}后更改状态
// hotHide()条件选择，格式hot：{id,_id},_id类型为数字或underfine，id类型为数字或underfind(/index)或""(/undeterminedModal)，区别是id为""时发请求会带上id字段，underfind则不会
//   《组件不能充值财务列表的金额追加条件，所以id重置为""(/undeterminedModal)=》通知金额重置resetBool:true =》把id改回underfind(/index)，以此更改》
// timeChange()月份选择，字符串类型，空时为""

interface Props {
	/**无关紧要的信息 */
	hasInsignificant?: boolean;
	/**无关紧要的信息 值 */
	insignificant?: any;
	/**快速筛选条件列表 */
	undetermined: Undetermined;
	undetermined2?: any;
	/**备用筛选条件 */
	after?: After;
	tabs?: string[];
	/**条件改变时 */
	onChange?: (query: any) => any;
	onTabChange?: (index: number) => any;
	/**财务列表页条件改变时，暂时废置*/
	onChange2?: (query: any) => any;
	onChange3?: (query: any) => any;
	/**我的收益页条件变动重置 */
	plat_type?: number;
	changePlatType?: () => any;
}

/**筛选列表页组件
 *
 * 筛选条件只包含基础选项和时间筛选
 */
export default class FiltrateLayout extends Component<Props> {
	state = {
		/**查询条件 */
		query: {
			/**热门条件选择 */
			hot: {},
			/**时间月份选择 */
			time: '',
			resetBool: false //判断点了重置
		},
		/**显示条件的下拉列表 */
		hotShow: false,
		/**显示时间筛选的下拉层 */
		timeShow: false,
		/**条件是否已选择 */
		hotCheck: false,
		/**是否选择了时间筛选 */
		timeCheck: false,
		tabActive: 0,
		/**时间筛选标题 */
		title2: "月份"
	};
	componentDidMount() {
	}
	componentDidUpdate() {
		if (this.props.plat_type == 2) {
			//我的收益页用，是2则应该重置页面了
			this.timeChange("");
			//重置完成改回1
			this.props.changePlatType && this.props.changePlatType();
		}
	}


	handleHotClick = () => this.setState({ hotShow: !this.state.hotShow, timeShow: false });

	handleTimeClick = () => this.setState({ timeShow: !this.state.timeShow, hotShow: false });

	hotChange = (id: any, _id: any) => {
		//handleQueryChange2，3在支付渠道详情，
		if (id ==="") {//重置:underfind=>""=>underfind
			this.setState({ hotShow: false, query: { ...this.state.query, hot: { id:undefined, _id }, resetBool: true } }, () => {
				this.handleQueryChange();
				// this.handleQueryChange2();
			});
		} else {
			this.setState({ hotShow: false, query: { ...this.state.query, hot: { id, _id }, resetBool: false } }, () => {
				this.handleQueryChange();
				// this.handleQueryChange2();
			});
		}
	}
	hotHide = () => this.setState({ hotShow: false });
	timeHide = () => this.setState({ timeShow: false });
	timeChange = (value: string|undefined): any => {
		// this.setState({ title2: value == undefined ? "月份" : value })// 启林注释，解决月份消失的问题
		this.setState({ timeShow: false, query: { ...this.state.query, time: value } }, () => {
			this.handleQueryChange();
			// this.handleQueryChange3();
		});
	}
	/**条件变更时触发onChange事件 */
	handleQueryChange = () => {
		this.props.onChange && this.props.onChange(this.state.query)
	};
	handleQueryChange2 = () => this.props.onChange2 && this.props.onChange2(this.state.query);
	handleQueryChange3 = () => this.props.onChange3 && this.props.onChange3(this.state.query);


	handleChangeTab = (index: number) => () => {
		this.setState({ tabActive: index });
		this.props.onTabChange && this.props.onTabChange(index);
	};

	render() {
		const insignificant = this.props.hasInsignificant && (
			<div className={styles.num}>
				<WingBlank>{this.props.insignificant}</WingBlank>
			</div>
		);
		const filterButton = (
			<Flex
				style={{ width: 'auto' }}
				align="center"
				onClick={this.handleHotClick}
				className={this.state.hotCheck || this.state.hotShow ? 'checked' : ''}
			>
				<span>筛选</span>
				<img src={this.state.hotCheck || this.state.hotShow ? checkIcon : icon} />
			</Flex>
		);
		const tabs =
			this.props.tabs &&
			this.props.tabs.map((_, index) => (
				<Flex.Item
					key={_}
					className={this.state.tabActive === index ? 'tabItem active' : 'tabItem'}
					onClick={this.handleChangeTab(index)}
				>
					{_}
				</Flex.Item>
			));
		const tab = this.props.tabs && (
			<Flex.Item>
				<Flex>{tabs}</Flex>
			</Flex.Item>
		);
		const datepng = this.state.timeCheck || this.state.timeShow ? checkIcon : icon;
		return (
			<Flex className={styles.wrap} direction="column">
				<div className={styles.filtrate}>
					<WingBlank>
						<Flex align="center">
							{!!this.props.undetermined.length && filterButton}
							<Flex
								style={{ width: 'auto' }}
								align="center"
								onClick={this.handleTimeClick}
								className={this.state.timeCheck || this.state.timeShow ? 'checked' : ''}
							>
								<span>{this.state.title2}</span>
								<img src={datepng} />
							</Flex>
							{tab}
						</Flex>
					</WingBlank>
				</div>
				{/* 无关紧要的信息 */}
				{insignificant}
				<Flex.Item className={styles.content}>
					<WingBlank style={{ minHeight: '100%' }}>{this.props.children}</WingBlank>
				</Flex.Item>
				<UndeterminedModal
					show={this.state.hotShow}
					onChange={this.hotChange}
					undetermined={this.props.undetermined}
					undetermined2={this.props.undetermined2}
					after={this.props.after}
					onHide={this.hotHide}
				/>
				<SelectDate
					show={this.state.timeShow}
					value={this.state.query.time}
					onHide={this.timeHide}
					onChange={this.timeChange}
				/>
			</Flex>
		);
	}
}
