/**title: 添加商品券 */
import { connect } from 'dva';
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker } from 'antd-mobile';
import styles from './index.less';
import SelectMonth from '@/pages/activities/components/selectMonth';
import upload from '@/services/oss';
import CouponImgRules from '@/components/upLoadImgRules'
import router from 'umi/router';
import SelectTime from '@/components/select-time';

export default connect(({ addCoupon }: any) => addCoupon)(class createGroup extends Component<any> {
    state = {
        selectMonthShow: false,
        uploadImgRulesShow: false,
        showSelectTime: false,

    };
    componentDidMount() {

    }
    closeRules = () => { this.setState({ uploadImgRulesShow: false }) }
    selectMonth = (query: any) => {
        if (query != undefined) {
            this.props.dispatch({
                type: 'addCoupon/setCoupon',
                payload: {
                    coupon_validity: query
                }
            });
        }
        console.log(this.props.coupon_validity)
        this.setState({ selectMonthShow: false })
    }


    //输入框
    handlechange = (type: any, numberType: any, e: any) => {
        if (numberType == 1 && /^[0-9]*$/.test(e.target.value.trim())) {
            //整数
            this.props.dispatch({
                type: 'addCoupon/setCoupon',
                payload: {
                    [type]: Number(e.target.value)
                }
            });
        } else if (numberType == 2 && (/^[0-9]+\.+[0-9]\d{0,1}$/.test(e.target.value.trim()) || /^[0-9]+\.?$/.test(e.target.value.trim()) || e.target.value.trim() == "")) {
            //2位小数
            this.props.dispatch({
                type: 'addCoupon/setCoupon',
                payload: {
                    [type]: e.target.value.trim()
                }
            });
        } else if (numberType == 3) {
            //莫得规则
            this.props.dispatch({
                type: 'addCoupon/setCoupon',
                payload: {
                    [type]: e.target.value
                }
            });
        }

    }
    upLoadCouponImg = (type: string, files: any) => {
        Toast.loading('')
        if (files[0]) {
            let img = files[0].url;
            upload(img).then(res => {
                Toast.hide();
                let returnImgUrl = res.data.path;
                this.props.dispatch({
                    type: 'addCoupon/setCoupon',
                    payload: {
                        [type]: returnImgUrl
                    }
                });
            })
        } else {
            Toast.hide();
        }
    }

    onCloseCouponImg = (type: string) => {
        this.props.dispatch({
            type: 'addCoupon/setCoupon',
            payload: {
                [type]: ""
            }
        });
    }
    //抢购限制 
    changeSnapLimit = (type: number) => {
        this.props.dispatch({
            type: 'addCoupon/setCoupon',
            payload: {
                snap_limit: type
            }
        });
    }
    //是否推广 
    changeSnapPromote = (type: number) => {
        this.props.dispatch({
            type: 'addCoupon/setCoupon',
            payload: {
                snap_promote: type
            }
        });
    }
    //选礼品 
    toGift = () => {
        router.push({ pathname: '/activities/gift', query: { type: 4 } })
    }
    //选时间
    closeModal = () => this.setState({ showSelectTime: false });
    handleSelectTime = (time: any) => {
        this.props.dispatch({
            type: 'addCoupon/setCoupon',
            payload: {
                start_date: time.startTime.toString(),
                end_date: time.endTime.toString()
            }
        });
        this.closeModal();
    };

    render() {
        return (
            <div className={styles.addCoupon}>
                <div className={styles.addCouponContent}>
                    <div className={styles.addCouponContentTitletitle}>
                        <div className={styles.addCouponContentTitleleftLine}></div>
                        <div className={styles.addCouponContentTitleleftInfo}>基本信息</div>
                    </div>
                    {/* <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>分类</div>
                        <div className={styles.addCouponItemRight}>
                            <div className={styles.addCouponItemRightText}>请选择</div>
                            <img className={styles.addCouponContentTitleRightIcon} src="http://oss.tdianyi.com/front/65QBbkRATDE6RxmYWeFKcmRZkACNttZG.png" />
                        </div>
                    </div> */}
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>名称</div>
                        <div className={styles.addCouponItemRight}>
                            <input className={styles.addCouponItemRightTextLong} type="text" placeholder="请输入劵的名称" onChange={this.handlechange.bind(this, 'coupon_name', 3)} value={this.props.coupon_name} />
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>市场价</div>
                        <div className={styles.addCouponItemRight}>
                            <input className={styles.addCouponItemRightTextShort} type="text" onChange={this.handlechange.bind(this, 'coupon_marketPrice', 2)} value={this.props.coupon_marketPrice} />
                            <div className={styles.addCouponContentTitleleftUnit}>元</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>购买价格</div>
                        <div className={styles.addCouponItemRight}>
                            <input className={styles.addCouponItemRightTextShort} type="text" onChange={this.handlechange.bind(this, 'coupon_purchasePrice', 2)} value={this.props.coupon_purchasePrice} />
                            <div className={styles.addCouponContentTitleleftUnit}>元</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>有效期</div>
                        <div className={styles.addCouponItemRight} onClick={() => { this.setState({ selectMonthShow: true }) }}>
                            <div className={styles.addCouponItemRightTextInfoL}>购劵日起</div>
                            <div className={styles.addCouponItemRightTextMin}>{this.props.coupon_validity ? this.props.coupon_validity : ''} </div>
                            <div className={styles.addCouponItemRightTextInfoR}>月有效</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem} onClick={() => { router.push('/activities/coupon/add-coupon/choose-couponRules') }}>
                        <div className={styles.addCouponItemLeft}>使用须知</div>
                        {
                            this.props.coupon_useNotice.length ? <div className={styles.addCouponItemRight}>
                                <div className={styles.addCouponItemRightText}>已选择{this.props.coupon_useNotice.length}条</div>
                            </div> : null
                        }
                    </div>
                    <div className={styles.addCouponTextAreaBox}>
                        <div className={styles.addCouponTextAreaTitle}>分享信息</div>
                        <textarea className={styles.addCouponTextAreaContent} placeholder="请输入分享内容" onChange={this.handlechange.bind(this, 'coupon_shareInfo', 3)} value={this.props.coupon_shareInfo} />
                    </div>
                </div>
                <div className={styles.addCouponContent}>
                    <div className={styles.addCouponContentTitletitle}>
                        <div className={styles.addCouponContentTitleleftLine}></div>
                        <div className={styles.addCouponContentTitleleftInfo}>图片信息</div>
                        <img className={styles.addCouponContentTitleleftIcon} onClick={() => { this.setState({ uploadImgRulesShow: true }) }} src="http://oss.tdianyi.com/front/zECKsdxTiQDeDyZ4mTPFP7FKKxiisbeH.png" />
                    </div>
                    <div className={styles.uploadImgAreaBox}>
                        <div className={styles.uploadImgAreaTitle}>活动图片</div>
                        <div className={styles.addCouponUploadImgBox}>
                            {
                                this.props.coupon_img1 ?
                                    <div className={styles.addCouponUploadImgItem}>
                                        <img className={styles.addCouponClose} onClick={this.onCloseCouponImg.bind(this, 'coupon_img1')} src="http://oss.tdianyi.com/front/2FecjmwZP8TNiXcYzz4eeR83ps4reytw.png" />
                                        <img className={styles.addCouponUploadImg} src={"http://oss.tdianyi.com/" + this.props.coupon_img1} />
                                    </div>
                                    :
                                    <div className={styles.addCouponUploadImgFirst}>
                                        <ImagePicker
                                            accept={"image/*"}
                                            className={styles.PickerBtn}
                                            multiple={false}
                                            length={1}
                                            onChange={this.upLoadCouponImg.bind(this, 'coupon_img1')}
                                        />
                                    </div>
                            }
                        </div>
                    </div>
                    <div className={styles.uploadImgAreaBox}>
                        <div className={styles.uploadImgAreaTitle}>详情图片</div>
                        <div className={styles.addCouponUploadImgBox}>
                            {
                                this.props.coupon_img2 ?
                                    <div className={styles.addCouponUploadImgItem}>
                                        <img className={styles.addCouponClose} onClick={this.onCloseCouponImg.bind(this, 'coupon_img2')} src="http://oss.tdianyi.com/front/2FecjmwZP8TNiXcYzz4eeR83ps4reytw.png" />
                                        <img className={styles.addCouponUploadImg} src={"http://oss.tdianyi.com/" + this.props.coupon_img2} />
                                    </div>
                                    :
                                    <div className={styles.addCouponUploadImgFirst}>
                                        <ImagePicker
                                            accept={"image/*"}
                                            className={styles.PickerBtn}
                                            multiple={false}
                                            length={1}
                                            onChange={this.upLoadCouponImg.bind(this, 'coupon_img2')}
                                        />
                                    </div>
                            }

                            {
                                this.props.coupon_img3 ?
                                    <div className={styles.addCouponUploadImgItem}>
                                        <img className={styles.addCouponClose} onClick={this.onCloseCouponImg.bind(this, 'coupon_img3')} src="http://oss.tdianyi.com/front/2FecjmwZP8TNiXcYzz4eeR83ps4reytw.png" />
                                        <img className={styles.addCouponUploadImg} src={"http://oss.tdianyi.com/" + this.props.coupon_img3} />
                                    </div>
                                    :
                                    <div className={styles.addCouponUploadImgFirst}>
                                        <ImagePicker
                                            accept={"image/*"}
                                            className={styles.PickerBtn}
                                            multiple={false}
                                            length={1}
                                            onChange={this.upLoadCouponImg.bind(this, 'coupon_img3')}
                                        />
                                    </div>
                            }
                        </div>

                    </div>
                </div>
                <div className={styles.addCouponContent}>
                    <div className={styles.addCouponContentTitletitle}>
                        <div className={styles.addCouponContentTitleleftLine}></div>
                        <div className={styles.addCouponContentTitleleftInfo}>礼品信息</div>
                    </div>
                    <div className={styles.addCouponItem} onClick={this.toGift}>
                        <div className={styles.addCouponItemLeft}>添加礼品</div>
                        <div className={styles.addCouponItemRight}>
                            <div className={styles.addCouponItemRightText}>请添加</div>
                            <img className={styles.addCouponContentTitleDownIcon} src="http://oss.tdianyi.com/front/HdGDQnPPN74tFwrN47hfHSb6QdpXT5xb.png" />
                        </div>
                    </div>
                </div>

                <div className={styles.addCouponContent}>
                    <div className={styles.addCouponContentTitletitle}>
                        <div className={styles.addCouponContentTitleleftLine}></div>
                        <div className={styles.addCouponContentTitleleftInfo}>抢购信息</div>
                    </div>
                    <div className={styles.addCouponItem} onClick={() => { this.setState({ showSelectTime: true }) }}>
                        <div className={styles.addCouponItemLeft}>抢购有效期</div>
                        <div className={styles.addCouponItemRight}>
                            {
                                this.props.end_date ? <div className={styles.addCouponItemRightText}>{this.props.start_date + '-' + this.props.end_date}</div>
                                    : <div className={styles.addCouponItemRightText}>请选择</div>
                            }
                            <img className={styles.addCouponContentTitleDownIcon} src="http://oss.tdianyi.com/front/HdGDQnPPN74tFwrN47hfHSb6QdpXT5xb.png" />
                        </div>
                    </div>

                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>抢购价</div>
                        <div className={styles.addCouponItemRight}>
                            <input className={styles.addCouponItemRightTextShort} type="text" onChange={this.handlechange.bind(this, 'snap_price', 2)} value={this.props.snap_price} />
                            <div className={styles.addCouponContentTitleleftUnit}>元</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>抢购数量</div>
                        <div className={styles.addCouponItemRight}>
                            <input className={styles.addCouponItemRightTextShort} type="text" onChange={this.handlechange.bind(this, 'snap_num', 1)} value={this.props.snap_num} />
                            <div className={styles.addCouponContentTitleleftUnit}>张</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>限购设置</div>
                        <div className={styles.addCouponItemRight}>
                            <div className={styles.addCouponItemChooseItem} onClick={this.changeSnapLimit.bind(this, 0)}>
                                {
                                    this.props.snap_limit == 0 ? <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/32HHntmb2bCxJB7KQYsyBcBNkKFNPnen.png" />
                                        : <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/yXwnbxtHBeniQYik3SNYS7rP3c6HZYTa.png" />
                                }
                                <div className={styles.addCouponItemChooseItemText}>无限制</div>
                            </div>
                            <div className={styles.addCouponItemChooseItem} onClick={this.changeSnapLimit.bind(this, 1)}>
                                {
                                    this.props.snap_limit == 1 ? <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/32HHntmb2bCxJB7KQYsyBcBNkKFNPnen.png" />
                                        : <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/yXwnbxtHBeniQYik3SNYS7rP3c6HZYTa.png" />
                                }
                                <div className={styles.addCouponItemChooseItemText}>x份/人</div>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.snap_limit == 1 ?
                            <div className={styles.addCouponGreyItem}>
                                <div className={styles.addCouponGreyItemLeft}>请设置多少张一个人</div>
                                <div className={styles.addCouponGreyItemRight}>
                                    <input className={styles.addCouponGreyItemTextShort} type="text" onChange={this.handlechange.bind(this, 'snap_limitNum', 1)} value={this.props.snap_limitNum} />
                                    <div className={styles.addCouponGreyItemUnit}>张</div>
                                </div>
                            </div> : null
                    }
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>首页推广</div>
                        <div className={styles.addCouponItemRight}>
                            <div className={styles.addCouponItemChooseItem} onClick={this.changeSnapPromote.bind(this, 0)}>
                                {
                                    this.props.snap_promote == 0 ? <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/32HHntmb2bCxJB7KQYsyBcBNkKFNPnen.png" />
                                        : <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/yXwnbxtHBeniQYik3SNYS7rP3c6HZYTa.png" />
                                }
                                <div className={styles.addCouponItemChooseItemText}>是</div>
                            </div>
                            <div className={styles.addCouponItemChooseItem} onClick={this.changeSnapPromote.bind(this, 1)}>
                                {
                                    this.props.snap_promote == 1 ? <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/32HHntmb2bCxJB7KQYsyBcBNkKFNPnen.png" />
                                        : <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/yXwnbxtHBeniQYik3SNYS7rP3c6HZYTa.png" />
                                }
                                <div className={styles.addCouponItemChooseItemText}>否</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.addCouponBottom}>
                    <div className={styles.addCouponBottomBtn}>发布</div>
                </div>
                {
                    this.state.selectMonthShow ? <SelectMonth onChange={this.selectMonth} value={0} /> : null
                }

                {
                    this.state.uploadImgRulesShow ? <CouponImgRules onClose={this.closeRules} /> : null
                }

                <SelectTime
                    show={this.state.showSelectTime}
                    onClose={this.closeModal}
                    onConfirm={this.handleSelectTime}
                />

            </div >
        )
    }
})
