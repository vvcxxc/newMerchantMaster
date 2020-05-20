import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex } from 'antd-mobile';

interface Props {
	tabs: Array<TabItem>;
	value?: number;
	onChange: (id: any) => any;
}

interface TabItem {
	id: string | number;
	label: any;
}

export default class TabPage extends Component<Props> {
	state = { active: 1 };
	constructor(props: Readonly<Props>) {
		super(props);
		this.state.active = this.props.value !== undefined ? this.props.value : 1;
	}
	handleTabChange = (e: any) =>
		this.setState({ active: Number(e.target.getAttribute('data-value')) }, () =>
			this.props.onChange(this.state.active)
		);
	render() {
		const tabItems = this.props.tabs.map(_ => (
			<div
				className={_.id === this.state.active ? 'active tab-item' : 'tab-item'}
				key={_.id}
				data-value={_.id}
				onClick={this.handleTabChange}
			>
				{_.label}
			</div>
		));
		return (
			<Flex className={styles.component} direction="column">
				<div className="tab">
					<WingBlank>
						<Flex justify='between'>{tabItems}</Flex>
					</WingBlank>
				</div>
				<Flex.Item>{this.props.children}</Flex.Item>
			</Flex>
		);
	}
}
