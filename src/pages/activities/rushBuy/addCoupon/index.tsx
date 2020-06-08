/**title: 添加商品券 */
import { connect } from 'dva';
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker } from 'antd-mobile';
import styles from './index.less';
import SelectMonth from '@/pages/activities/components/selectMonth';
import upload from '@/services/oss';
import CouponImgRules from '@/components/upLoadImgRules'
export default connect(({ addCoupon }: any) => addCoupon)(class createGroup extends Component<any> {
    state = {
        selectMonthShow: false,
        uploadImgRulesShow: false
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
        } else {
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
                            <input className={styles.addCouponItemRightTextLong} type="text" placeholder="请输入劵的名称" />
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
                            <input className={styles.addCouponItemRightTextShort} type="text" />
                            <div className={styles.addCouponContentTitleleftUnit}>元</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>有效期</div>
                        <div className={styles.addCouponItemRight} onClick={() => { this.setState({ selectMonthShow: true }) }}>
                            <div className={styles.addCouponItemRightTextInfoL}>购劵日起</div>
                            <div className={styles.addCouponItemRightTextMin}>{this.props.coupon_validity} </div>
                            <div className={styles.addCouponItemRightTextInfoR}>月有效</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>使用须知</div>
                    </div>
                    <div className={styles.addCouponTextAreaBox}>
                        <div className={styles.addCouponTextAreaTitle}>分享信息</div>
                        <textarea className={styles.addCouponTextAreaContent} placeholder="请输入分享内容" />
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
                    <div className={styles.addCouponItem}>
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
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>抢购有效期</div>
                        <div className={styles.addCouponItemRight}>
                            <div className={styles.addCouponItemRightText}>请选择</div>
                            <img className={styles.addCouponContentTitleDownIcon} src="http://oss.tdianyi.com/front/HdGDQnPPN74tFwrN47hfHSb6QdpXT5xb.png" />
                        </div>
                    </div>

                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>抢购价</div>
                        <div className={styles.addCouponItemRight}>
                            <input className={styles.addCouponItemRightTextShort} type="text" />
                            <div className={styles.addCouponContentTitleleftUnit}>元</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>抢购数量</div>
                        <div className={styles.addCouponItemRight}>
                            <input className={styles.addCouponItemRightTextShort} type="text" />
                            <div className={styles.addCouponContentTitleleftUnit}>张</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>限购设置</div>
                        <div className={styles.addCouponItemRight}>
                            <div className={styles.addCouponItemChooseItem}>
                                <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/yXwnbxtHBeniQYik3SNYS7rP3c6HZYTa.png" />
                                <div className={styles.addCouponItemChooseItemText}>无限制</div>
                            </div>
                            <div className={styles.addCouponItemChooseItem}>
                                <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/32HHntmb2bCxJB7KQYsyBcBNkKFNPnen.png" />
                                <div className={styles.addCouponItemChooseItemText}>x份/人</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addCouponGreyItem}>
                        <div className={styles.addCouponGreyItemLeft}>请设置多少张一个人</div>
                        <div className={styles.addCouponGreyItemRight}>
                            <input className={styles.addCouponGreyItemTextShort} type="text" />
                            <div className={styles.addCouponGreyItemUnit}>张</div>
                        </div>
                    </div>
                    <div className={styles.addCouponItem}>
                        <div className={styles.addCouponItemLeft}>首页推广</div>
                        <div className={styles.addCouponItemRight}>
                            <div className={styles.addCouponItemChooseItem}>
                                <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/yXwnbxtHBeniQYik3SNYS7rP3c6HZYTa.png" />
                                <div className={styles.addCouponItemChooseItemText}>是</div>
                            </div>
                            <div className={styles.addCouponItemChooseItem}>
                                <img className={styles.addCouponItemChooseItemIcon} src="http://oss.tdianyi.com/front/32HHntmb2bCxJB7KQYsyBcBNkKFNPnen.png" />
                                <div className={styles.addCouponItemChooseItemText}>否</div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.selectMonthShow ? <SelectMonth onChange={this.selectMonth} value={0} /> : null
                }

                {
                    this.state.uploadImgRulesShow ? <CouponImgRules onClose={this.closeRules} /> : null
                }



            </div >
        )
    }
})
