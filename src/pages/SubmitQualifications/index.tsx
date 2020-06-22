/**
 * 创建门店
 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker, ActionSheet } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import upload from '@/services/oss';
import { connect } from 'dva';
import moment from 'moment';
import Cookies from 'js-cookie';
import ExampleImg from '../../components/example/index'
import axios from 'axios';
import wx from 'weixin-js-sdk';
import Header from '@/components/header'

export default class SubmitQualifications extends Component {
    state = {
        rules1: ['请保证门店招牌清晰无遮挡'],
        rules2: ['1、请上传营业执照原件照片', '2、需文字清晰、完整、露出国徽及印章', '3、不可使用其他证件替代，包括食品安全证明等'],
        rules3: ['请保证身份证各项信息清晰可见，无遮挡'],
        exampleRules: [],
        tabCurrent: 0,
        //经营品类
        manage_list: [],
        tempmanage_list_value: 0,//临时经营分类id
        tempselector: '',//临时经营分类文字
        //环境照
        files1: [],
        files2: [],
        //门头照例子
        exampleImgurl: '',
        exampleImgShow: false,
        exampleFilesType: '',
        exampleImgUrlType: '',
        actionSheetShow: false,
        data: {
            province_id: 0,
            city_id: 0,
            county_id: 0,
            lng: 0,
            lat: 0,

            storeName: '',
            storeAddress: '',
            storeHouseNumber: '',
            phone: '',
            manage_list_value: 0,//经营分类id
            manage_type: '',
            selector: '',//经营分类文字
            storesMails: '',
            storePhoto: '',
            environmentPhoto1: '',
            environmentPhoto2: '',

            idCardimg1: '',
            idCardimg2: '',
            idCardimg3: '',
            name: '',
            idCardNum: '',
            idCardValidity: '',

            businessLicenseimg: '',
            registrationNumber: '',
            licenseName: '',
            legalPerson: '',
            businessLicenseValidity: ''
        },
        ToastTipsstoreName: '',
        ToastTipsstoreAddress: '',
        ToastTipsstoreHouseNumber: '',
        ToastTipsphone: '',
        ToastTipsmanage_type: '',
        ToastTipsstoresMails: '',
        ToastTipsstorePhoto: '',
        ToastTipsenvironmentPhoto: '',
        ToastTipsLegalIDImg: "",
        ToastTipsContactName: "",
        ToastTipsLegalIdNo: "",
        ToastTipsIDDate: "",

        ToastTipsBusinessImg: "",
        ToastTipsBusinessNo: "",
        ToastTipsCornBusName: "",
        ToastTipsLegalName: "",
        ToastTipsBusinessDate: "",

        store_type: 1,//1-未填写，2-待审，3-通过，4-拒绝	
        store_remarks: '',
        business_type: 1,
        business_remarks: '',
        identity_type: 1,
        identity_remarks: ''
    }
    componentDidMount() {
        this.setState({ tabCurrent: this.props.location.query.tabCurrent || 0 })
        this.getOldData();
        this.getManageType();
        // this.getLocation();
    }
    // getLocation() {
    //     let userAgent = navigator.userAgent;
    //     let isIos = userAgent.indexOf('iPhone') > -1;
    //     let url: any;
    //     if (isIos) {
    //         url = sessionStorage.getItem('url');
    //     } else {
    //         url = location.href;
    //     }
    //     request({
    //         url: 'wechat/getShareSign',
    //         method: 'get',
    //         params: {
    //             url
    //         }
    //     }).then(res => {
    //         let _this: any = this;
    //         wx.config({
    //             debug: false,
    //             appId: res.appId,
    //             timestamp: res.timestamp,
    //             nonceStr: res.nonceStr,
    //             signature: res.signature,
    //             jsApiList: [
    //                 "getLocation",
    //                 "openLocation"
    //             ]
    //         });
    //         wx.ready(() => {
    //             wx.getLocation({
    //                 type: 'wgs84',
    //                 success: function (res: any) {
    //                     let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //                     let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //                     let location = {
    //                         latitude,
    //                         longitude
    //                     };
    //                     _this.setState({ location });
    //                 }
    //             });

    //         })
    //     });
    // }
    changeTabCurrent = async (current: number) => {
        router.replace('/SubmitQualifications?tabCurrent=' + current);
        await this.setState({
            ToastTipsstoreName: '',
            ToastTipsstoreAddress: '',
            ToastTipsstoreHouseNumber: '',
            ToastTipsphone: '',
            ToastTipsmanage_type: '',
            ToastTipsstoresMails: '',
            ToastTipsstorePhoto: '',
            ToastTipsenvironmentPhoto: '',

            ToastTipsLegalIDImg: "",
            ToastTipsContactName: "",
            ToastTipsLegalIdNo: "",
            ToastTipsIDDate: "",

            ToastTipsBusinessImg: "",
            ToastTipsBusinessNo: "",
            ToastTipsCornBusName: "",
            ToastTipsLegalName: "",
            ToastTipsBusinessDate: "",
        })
        const {
            //门店
            storeName,
            storeAddress,
            storeHouseNumber,
            phone,
            manage_list_value,
            storesMails,
            storePhoto,
            environmentPhoto1,
            environmentPhoto2,
            //营业执照信息
            businessLicenseimg,
            registrationNumber,
            licenseName,
            legalPerson,
            businessLicenseValidity
        } = this.state.data;
        let errMsg = false;
        if (this.state.tabCurrent == 0 && current == 1) {
            if (!storeName) {
                errMsg = true;
                this.setState({ ToastTipsstoreName: "请输入门店名称" })
            }
            if (!storeAddress) {
                errMsg = true;
                this.setState({ ToastTipsstoreAddress: "请输入门店地址" })
            }
            if (!storeHouseNumber) {
                errMsg = true;
                this.setState({ ToastTipsstoreHouseNumber: "请输入商家门店地址信息" })
            }
            if (!/^1[3456789]\d{9}$/.test(phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(phone)) {
                errMsg = true;
                this.setState({ ToastTipsphone: "请输入正确11位手机号码或7-8位座机号码" })
            }
            if (!manage_list_value) {
                errMsg = true;
                this.setState({ ToastTipsmanage_type: "请选择商家品类信息" })
            }
            if (!(new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(storesMails))) {
                errMsg = true;
                this.setState({ ToastTipsstoresMails: "请输入正确邮箱信息" })
            }
            if (storePhoto.length < 1) {
                errMsg = true;
                this.setState({ ToastTipsstorePhoto: "请上传商家门店照片" })
            }
            if (environmentPhoto1.length < 1 || environmentPhoto2.length < 1) {
                errMsg = true;
                this.setState({ ToastTipsenvironmentPhoto: "请上传商家环境照片" })
            }
        } else if (this.state.tabCurrent == 1 && current == 2) {
            // 营业执照
            if (!businessLicenseimg) {
                errMsg = true;
                this.setState({
                    ToastTipsBusinessImg: "请上传商家营业执照图片"
                })
            }

            // 营业执照注册号
            if (!(/^[a-zA-Z0-9]{1,18}$/.test(registrationNumber))) {
                errMsg = true;
                this.setState({
                    ToastTipsBusinessNo: "请输入正确18位营业执照号码"
                })
            }

            // 执照名称
            if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(licenseName))) {
                errMsg = true;
                this.setState({
                    ToastTipsCornBusName: "请输入正确营业执照名称"
                })
            }

            // 执照法人
            if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(legalPerson))) {
                errMsg = true;
                this.setState({
                    ToastTipsLegalName: "请输入用户法人姓名"
                })
            }
            // 营业执照有效期
            const businessNowTimeStamp = Date.now();
            const businessNow = new Date(businessNowTimeStamp);
            const businessNowTime = moment(businessNow).unix();
            const businessDateTime = moment(businessLicenseValidity).unix();

            const businessNowYear = moment(businessNow).year();
            const businessNowMonth = moment(businessNow).month() + 1;
            const businessNowDay = moment(businessNow).date();
            const businessDateYear = moment(businessLicenseValidity).year();
            const businessDateMonth = moment(businessLicenseValidity).month() + 1;
            const businessDateDay = moment(businessLicenseValidity).date();
            if (!businessLicenseValidity) {
                errMsg = true;
                this.setState({
                    ToastTipsBusinessDate: "请输入正确有效期"
                })
            } else if (businessDateTime < businessNowTime) {
                if (businessNowYear == businessDateYear && businessNowMonth == businessDateMonth && businessNowDay == businessDateDay) {
                } else {
                    errMsg = true;
                    this.setState({
                        ToastTipsBusinessDate: "请输入正确有效期"
                    })
                }
            }

        }
        if (errMsg != true) {
            this.setState({ tabCurrent: current })
        }
    }
    /**打开地图 */
    openMap = () => {
        router.push('/SubmitQualifications/map')
    }
    /**获取经营品类 */
    getManageType = () => {
        request({
            url: '/supplier/store/category',
            method: 'get',
        }).then(res => {
            let { data } = res;
            this.setState({ manage_list: data });
        });
    }
    /**经营类型的选中变色未确定 */
    tempCheckout = (id: any, label: string) => {
        this.setState({ tempmanage_list_value: id, tempselector: label });
    }
    closeCheckout = () => {
        this.setState({ actionSheetShow: false });
    }
    /**经营类型的选择 */
    checkout = () => {
        let data = { ...this.state.data, manage_list_value: this.state.tempmanage_list_value, selector: this.state.tempselector };
        this.setStroage(data);
        this.setState({ data, actionSheetShow: false })
    }
    onChange1 = (files1: any, type: any, index: any) => {
        Toast.loading('');
        if (files1[0]) {
            let img = files1[0].url;
            upload(img).then(res => {
                Toast.hide()
                let environmentPhoto1 = res.data.path || '';
                let data = { ...this.state.data, environmentPhoto1: environmentPhoto1 };
                this.setStroage(data);
                this.setState({ files1, data });
            })
        } else {
            Toast.hide();
            let data = { ...this.state.data, environmentPhoto1: '' };
            this.setStroage(data);
            this.setState({ files1, data });
        }
    }
    onChange2 = (files2: any, type: any, index: any) => {
        Toast.loading('');
        if (files2[0]) {
            let img = files2[0].url;
            upload(img).then(res => {
                Toast.hide()
                let environmentPhoto2 = res.data.path || '';
                let data = { ...this.state.data, environmentPhoto2: environmentPhoto2 };
                this.setStroage(data);
                this.setState({ files2, data });
            })
        } else {
            Toast.hide()
            let data = { ...this.state.data, environmentPhoto2: '' };
            this.setStroage(data);
            this.setState({ files2, data });
        }
    }

    closeDoorPhoto = (e: any) => {
        let data = { ...this.state.data, storePhoto: '' };
        this.setStroage(data);
        this.setState({ data });
        e.stopPropagation();
    }
    closeEnvPhoto1 = (e: any) => {
        let data = { ...this.state.data, environmentPhoto1: '' };
        this.setStroage(data);
        this.setState({ files1: [], data });
        e.stopPropagation();
    }
    closeEnvPhoto2 = (e: any) => {
        let data = { ...this.state.data, environmentPhoto2: '' };
        this.setStroage(data);
        this.setState({ files2: [], data });
        e.stopPropagation();
    }

    getBytes = (str: string) => {
        let num = 0
        for (let i = 0; i < str.length; i++) {
            /*字符串的charCodeAt()方法获取对应的ASCII码值
            汉字的ASCII大于255,其它的ASCII编码值在0-255之间*/
            str.charCodeAt(i) > 255 ? num += 2 : num += 1;
        }
        return num;
    }

    getOldData = () => {
        let that = this;
        Toast.loading('');
        request({
            url: '/supplier/store/examines/recent/record',
            method: 'get'
        }).then(res => {
            Toast.hide();
            if (res.data && res.data.id) {
                request({
                    url: '/supplier/store/examines/' + res.data.id,
                    method: 'get'
                }).then(res => {
                    let { data } = res;
                    let temp = {
                        province_id: data.province_id,
                        city_id: data.city_id,
                        county_id: data.county_id,
                        lng: data.lng,
                        lat: data.lat,

                        storeName: data.store_name,
                        storeAddress: data.store_address,
                        storeHouseNumber: data.store_address_info,
                        phone: data.store_telephone,
                        manage_type: data.store_type,
                        selector: '?',
                        storesMails: data.email,
                        storePhoto: data.door_photo,
                        environmentPhoto1: data.environmental_photo[0],
                        environmentPhoto2: data.environmental_photo[1],

                        idCardimg1: data.identity_card_positive_image,
                        idCardimg2: data.identity_card_opposite_image,
                        idCardimg3: data.identity_card_handheld_image,
                        name: data.identity_name,
                        idCardNum: data.identity_card,
                        idCardValidity: data.identity_card_valid_until,

                        businessLicenseimg: data.business_license_photo,
                        registrationNumber: data.registration_number,
                        licenseName: data.license_name,
                        legalPerson: data.legal_person_name,
                        businessLicenseValidity: data.license_valid_until,
                    };
                    that.setState({
                        data: temp,
                        store_type: data.store_type,
                        store_remarks: data.store_remarks,
                        business_type: data.business_type,
                        business_remarks: data.business_remarks,
                        identity_type: data.identity_type,
                        identity_remarks: data.identity_remarks
                    }, () => {
                        that.getStroage();
                    })
                }).catch((err) => {
                    that.getStroage();
                })
            } else {
                that.getStroage();
            }
        }).catch((err) => {
            Toast.hide();
            that.getStroage();
        })
    }
    //选择有效期
    chooseDate = (type: string) => {
        router.push({ pathname: '/SubmitQualifications/chooseDate', query: { type } })
    }
    //上传图片
    onChangeIdImg = (filesType: string, imgUrlType: string, files: any) => {
        Toast.loading('');
        if (files[0]) {
            let img = files[0].url;
            upload(img).then(res => {
                Toast.fail('上传成功');
                Toast.hide()
                let returnUrl = res.data.path || '';
                let data = { ...this.state.data, [imgUrlType]: returnUrl };
                this.setStroage(data);
                this.setState({ [filesType]: files, data }, () => {
                    if (imgUrlType == 'idCardimg1' || imgUrlType == 'idCardimg2') { this.serachInfo('1') }
                    else if (imgUrlType == 'businessLicenseimg') { this.serachInfo('3') }
                })
            }).catch(err => {
                Toast.fail('上传失败');
            })
        } else {
            Toast.fail('上传失败');
            Toast.hide();
            let data = { ...this.state.data, [imgUrlType]: '' };
            this.setStroage(data);
            this.setState({ [filesType]: files, data });
        }
    }
    //取消图片
    onCloseImg = (filesType: string, imgUrlType: string,) => {
        let data = { ...this.state.data, [imgUrlType]: '' };
        this.setStroage(data);
        this.setState({ [filesType]: [], data })
    }
    //看例子,设置例子上传按钮对应的状态
    exampleShow = (imgUrlType: string, exampleImgurl: string) => {
        Toast.loading('', 1500, () => { }, true);
        let temp: any;
        if (imgUrlType == 'idCardimg1' || imgUrlType == 'idCardimg2' || imgUrlType == 'idCardimg3') { temp = this.state.rules3 }
        else if (imgUrlType == 'businessLicenseimg') { temp = this.state.rules2 }
        else if (imgUrlType == 'storePhoto') { temp = this.state.rules1 }
        else { temp = [] }
        this.setState({ exampleImgUrlType: imgUrlType, exampleImgurl: exampleImgurl, exampleRules: temp, exampleImgShow: true }, () => {
            Toast.hide();
        })
    }

    //例子上传,组件内
    onUpload = (exampleImgUrlType: string) => (files: any) => {
        let data = this.state.data;
        data[exampleImgUrlType] = files.returnImgUrl;
        this.setStroage(data);
        this.setState({ data }, () => {
            if (exampleImgUrlType == 'idCardimg1' || exampleImgUrlType == 'idCardimg2') { this.serachInfo('1') }
            else if (exampleImgUrlType == 'businessLicenseimg') { this.serachInfo('3') }
        })
    }
    //例子取消
    onCancle = () => {
        this.setState({ exampleImgShow: false })
    }
    // 设置缓存
    setStroage = (data: object) => {
        console.log(data);
        localStorage.setItem('SubmitQualifications', JSON.stringify(data));
        localStorage.setItem('SubmitQualificationsTime', JSON.stringify(new Date().getTime()));
    }
    //获取缓存
    getStroage = () => {
        //小于一天86400000毫秒时执行
        if (localStorage.getItem('SubmitQualificationsTime') && (new Date().getTime() - JSON.parse(localStorage.getItem('SubmitQualificationsTime')) < 86400000)) {
            let stroage: any = JSON.parse(localStorage.getItem('SubmitQualifications'));
            let tempData = {
                province_id: 0,
                city_id: 0,
                county_id: 0,
                lng: 0,
                lat: 0,
                //门店信息
                storeName: '',
                storeAddress: '',
                storeHouseNumber: '',
                phone: '',
                manage_type: '',
                manage_list_value: 0,
                selector: '',
                storesMails: '',
                storePhoto: '',
                environmentPhoto1: '',
                environmentPhoto2: '',
                //身份信息
                idCardimg1: '',
                idCardimg2: '',
                idCardimg3: '',
                name: '',
                idCardNum: '',
                idCardValidity: '',

                //营业执照信息
                businessLicenseimg: '',
                registrationNumber: '',
                licenseName: '',
                legalPerson: '',
                businessLicenseValidity: ''
            }
            let temp = { ...tempData, ...stroage };
            console.log(temp);
            this.setState({ data: temp });
        }
    }
    //输入框
    handlechange = (type: any, e: any) => {
        let data = this.state.data;
        data[type] = e.target.value.trim();
        this.setStroage(data);
        this.setState({ data })
    }

    serachInfo = (type: string | number) => {
        if (type == '1' && this.state.data.idCardimg1 && this.state.data.idCardimg2) {
            Toast.loading('识别中');
            request({
                url: 'v3/idcard',
                method: 'get',
                params: {
                    idcard_front_img: this.state.data.idCardimg1,
                    idcard_back_img: this.state.data.idCardimg2
                }
            }).then(res => {
                Toast.hide();
                let { data, code } = res;
                if (code == 200) {
                    let idCardNum = data.front.words_result['公民身份号码'].words
                    let name = data.front.words_result['姓名'].words;
                    let idCardValidity = data.back.words_result['失效日期'].words;
                    if (idCardValidity != '长期') {
                        idCardValidity = moment(idCardValidity).format("YYYY-MM-DD")
                    }
                    if (idCardNum && name) {
                        let data = this.state.data;
                        data['name'] = name;
                        data['idCardNum'] = idCardNum;
                        data['idCardValidity'] = idCardValidity;
                        this.setStroage(data);
                        this.setState({ data });
                        Toast.success('识别成功', 2);
                    } else {
                        Toast.fail('识别失败，请手动填写信息', 2);
                    }
                } else {
                    Toast.fail('识别失败，请手动填写信息', 2);
                }
            }).catch(err => {
                Toast.hide();
                Toast.fail('识别失败', 2)
            })
        } else if (type == '3' && this.state.data.businessLicenseimg) {
            Toast.loading('识别中');
            request({
                url: 'v3/business_license',
                method: 'get',
                params: {
                    business_license_img: this.state.data.businessLicenseimg
                }
            }).then(res => {
                Toast.hide();
                let { data, code } = res;
                if (code == 200) {
                    let licenseName = data['单位名称'].words;
                    let registrationNumber = data['社会信用代码'].words;
                    let legalPerson = data['法人'].words;
                    let businessLicenseValidity = data['有效期'].words;
                    Toast.hide();
                    if (licenseName && registrationNumber && legalPerson && businessLicenseValidity) {
                        let data = this.state.data;
                        data['licenseName'] = licenseName;
                        data['registrationNumber'] = registrationNumber;
                        data['legalPerson'] = legalPerson;
                        data['businessLicenseValidity'] = businessLicenseValidity;
                        this.setStroage(data);
                        this.setState({ data });
                        Toast.success('识别成功', 2);
                    } else {
                        Toast.fail('识别失败，请手动填写信息', 2);
                    }
                } else {
                    Toast.fail('识别失败，请手动填写信息', 2);
                }
            }).catch(err => {
                Toast.hide();
                Toast.fail('识别失败', 2)
            })
        }
    }
    //提交
    submitInfo = async () => {
        await this.setState({
            ToastTipsstoreName: '',
            ToastTipsstoreAddress: '',
            ToastTipsstoreHouseNumber: '',
            ToastTipsphone: '',
            ToastTipsmanage_type: '',
            ToastTipsstoresMails: '',
            ToastTipsstorePhoto: '',
            ToastTipsenvironmentPhoto: '',

            ToastTipsLegalIDImg: "",
            ToastTipsContactName: "",
            ToastTipsLegalIdNo: "",
            ToastTipsIDDate: "",

            ToastTipsBusinessImg: "",
            ToastTipsBusinessNo: "",
            ToastTipsCornBusName: "",
            ToastTipsLegalName: "",
            ToastTipsBusinessDate: "",
        })
        const {
            province_id,
            city_id,
            county_id,
            lng,
            lat,
            //门店
            storeName,
            storeAddress,
            storeHouseNumber,
            phone,
            manage_list_value,
            storesMails,
            storePhoto,
            environmentPhoto1,
            environmentPhoto2,
            //身份信息
            idCardimg1,
            idCardimg2,
            idCardimg3,
            name,
            idCardNum,
            idCardValidity,

            //营业执照信息
            businessLicenseimg,
            registrationNumber,
            licenseName,
            legalPerson,
            businessLicenseValidity
        } = this.state.data;


        let errMsg = false;
        // if (this.getBytes(storeName)) {
        if (!storeName) {
            errMsg = true;
            this.setState({ ToastTipsstoreName: "请输入门店名称" })
        }
        if (!storeAddress) {
            errMsg = true;
            this.setState({ ToastTipsstoreAddress: "请输入门店地址" })
        }
        if (!storeHouseNumber) {
            errMsg = true;
            this.setState({ ToastTipsstoreHouseNumber: "请输入商家门店地址信息" })
        }
        if (!/^1[3456789]\d{9}$/.test(phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(phone)) {
            errMsg = true;
            this.setState({ ToastTipsphone: "请输入正确11位手机号码或7-8位座机号码" })
        }
        if (!manage_list_value) {
            errMsg = true;
            this.setState({ ToastTipsmanage_type: "请选择商家品类信息" })
        }
        if (!(new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(storesMails))) {
            errMsg = true;
            this.setState({ ToastTipsstoresMails: "请输入正确邮箱信息" })
        }
        if (storePhoto.length < 1) {
            errMsg = true;
            this.setState({ ToastTipsstorePhoto: "请上传商家门店照片" })
        }
        if (environmentPhoto1.length < 1 || environmentPhoto2.length < 1) {
            errMsg = true;
            this.setState({ ToastTipsenvironmentPhoto: "请上传商家环境照片" })
        }

        // 身份证照片
        if (!idCardimg1 || !idCardimg2 || !idCardimg3) {
            errMsg = true;
            this.setState({
                ToastTipsLegalIDImg: "请上传身份证正反面图片"
            })
        }
        // 身份证姓名
        if (!(/^[\u4E00-\u9FA5]{1,}$/.test(name))) {
            errMsg = true;
            this.setState({
                ToastTipsContactName: "请输入用户身份证姓名"
            })
        }
        // 身份证号
        if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(idCardNum)) {
            errMsg = true;
            this.setState({
                ToastTipsLegalIdNo: "请输入正确身份证号码"
            })
        }
        const nowTimeStamp = Date.now();
        const now = new Date(nowTimeStamp);
        const nowTime = moment(now).unix();
        const dateTime = moment(idCardValidity).unix();

        const nowYear = moment(now).year();
        const nowMonth = moment(now).month() + 1;
        const nowDay = moment(now).date();

        const dateYear = moment(idCardValidity).year();
        const dateMonth = moment(idCardValidity).month() + 1;
        const dateDay = moment(idCardValidity).date();
        if (!idCardValidity) {
            errMsg = true;
            this.setState({
                ToastTipsIDDate: "请输入正确有效期"
            })
        } else if (dateTime < nowTime) {
            if (nowYear == dateYear && nowMonth == dateMonth && nowDay == dateDay) {
            } else {
                errMsg = true;
                this.setState({
                    ToastTipsIDDate: "请输入正确有效期"
                })
            }
        }

        // 营业执照
        if (!businessLicenseimg) {
            errMsg = true;
            this.setState({
                ToastTipsBusinessImg: "请上传商家营业执照图片"
            })
        }

        // 营业执照注册号
        if (!(/^[a-zA-Z0-9]{1,18}$/.test(registrationNumber))) {
            errMsg = true;
            this.setState({
                ToastTipsBusinessNo: "请输入正确18位营业执照号码"
            })
        }

        // 执照名称
        if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(licenseName))) {
            errMsg = true;
            this.setState({
                ToastTipsCornBusName: "请输入正确营业执照名称"
            })
        }

        // 执照法人
        if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(legalPerson))) {
            errMsg = true;
            this.setState({
                ToastTipsLegalName: "请输入用户法人姓名"
            })
        }

        // 身份证姓名对比用户法人姓名
        if (name != legalPerson) {
            errMsg = true;
            this.setState({
                ToastTipsContactName: "用户身份证姓名和用户法人姓名不一致"
            })
        }

        // 营业执照有效期
        const businessNowTimeStamp = Date.now();
        const businessNow = new Date(businessNowTimeStamp);
        const businessNowTime = moment(businessNow).unix();
        const businessDateTime = moment(businessLicenseValidity).unix();

        const businessNowYear = moment(businessNow).year();
        const businessNowMonth = moment(businessNow).month() + 1;
        const businessNowDay = moment(businessNow).date();
        const businessDateYear = moment(businessLicenseValidity).year();
        const businessDateMonth = moment(businessLicenseValidity).month() + 1;
        const businessDateDay = moment(businessLicenseValidity).date();
        if (!businessLicenseValidity) {
            errMsg = true;
            this.setState({
                ToastTipsBusinessDate: "请输入正确有效期"
            })
        } else if (businessDateTime < businessNowTime) {
            if (businessNowYear == businessDateYear && businessNowMonth == businessDateMonth && businessNowDay == businessDateDay) {
            } else {
                errMsg = true;
                this.setState({
                    ToastTipsBusinessDate: "请输入正确有效期"
                })
            }
        }

        if (errMsg == true) { return }
        else {
            Toast.loading('');
            //请求
            request({
                url: '/supplier/store/examines',
                method: 'POST',
                data: {
                    environmental_photo: [environmentPhoto1, environmentPhoto2],
                    store_name: storeName,
                    store_address: storeAddress,
                    store_address_info: storeHouseNumber,
                    province_id,
                    city_id,
                    county_id,
                    store_telephone: phone,
                    category_id: manage_list_value,
                    door_photo: storePhoto,
                    lng,
                    lat,
                    business_license_photo: businessLicenseimg,
                    registration_number: registrationNumber,
                    license_name: licenseName,
                    legal_person_name: legalPerson,
                    is_license_long_time: businessLicenseValidity == '长期' ? 1 : 0,
                    license_valid_until: businessLicenseValidity != '长期' ? businessLicenseValidity : undefined,
                    identity_card_positive_image: idCardimg1,
                    identity_card_opposite_image: idCardimg2,
                    identity_card_handheld_image: idCardimg3,
                    identity_name: name,
                    identity_card: idCardNum,
                    is_identity_card_long_time: idCardValidity == '长期' ? 1 : 0,
                    identity_card_valid_until: idCardValidity != '长期' ? idCardValidity : undefined,
                    email: storesMails,
                }
            }).then(res => {
                Toast.hide();
                if (res.status_code == 201 || res.status_code == 200) {
                    Toast.success('提交成功', 5, () => {
                        router.push({ pathname: '/' })
                    })
                    localStorage.removeItem('SubmitQualifications');
                } else {
                    Toast.success(res.message, 5)
                }
            }).catch(err => {
                Toast.hide();
                Toast.fail(err.message, 5)
            })
        }
    }

    render() {
        const {
            tabCurrent,

            ToastTipsstoreName,
            ToastTipsstoreAddress,
            ToastTipsstoreHouseNumber,
            ToastTipsphone,
            ToastTipsmanage_type,
            ToastTipsstoresMails,
            ToastTipsstorePhoto,
            ToastTipsenvironmentPhoto,

            ToastTipsLegalIDImg,
            ToastTipsContactName,
            ToastTipsLegalIdNo,
            ToastTipsIDDate,

            ToastTipsBusinessImg,
            ToastTipsBusinessNo,
            ToastTipsCornBusName,
            ToastTipsLegalName,
            ToastTipsBusinessDate,

            store_type,
            store_remarks,
            business_type,
            business_remarks,
            identity_type,
            identity_remarks,

        } = this.state;

        return (
            <div className={styles.creatStorePage} >
                <Header title='创建门店' color='dark' />
                <div className={tabCurrent == 1 ? styles.tabContent2 : tabCurrent == 2 ? styles.tabContent3 : styles.tabContent1}> </div>
                {
                    tabCurrent == 1 && store_type == 4 ? <div className={styles.errToastBox}><div className={styles.errToast}>{store_remarks}</div>  </div> : null
                }
                {
                    tabCurrent == 2 && business_type == 4 ? <div className={styles.errToastBox}> <div className={styles.errToast}>{business_remarks} </div> </div> : null
                }
                {
                    tabCurrent == 3 && identity_type == 4 ? <div className={styles.errToastBox}> <div className={styles.errToast}>{identity_remarks} </div> </div> : null
                }
                {
                    tabCurrent == 0 ?
                        <div className={styles.backgroundContent}>

                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>门店名称</div>
                                <input className={styles.inputBox} placeholder="请输入门店名称" onChange={this.handlechange.bind(this, 'storeName')} value={this.state.data.storeName} />
                            </div>
                            {
                                ToastTipsstoreName ?
                                    <div className={styles.groub_hint}>{ToastTipsstoreName}</div> : null
                            }
                            <div className={styles.selectItem} onClick={this.openMap}>
                                <div className={styles.selectTitle}>门店地址</div>
                                {
                                    this.state.data.storeAddress ?
                                        <div onClick={this.openMap} className={styles.unSelectBoxDiv} >{this.state.data.storeAddress} </div>
                                        :
                                        <div className={styles.selectBox} >请选择地址</div>
                                }
                                {
                                    !this.state.data.storeAddress ? <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                                        : null
                                }
                            </div>
                            {
                                ToastTipsstoreAddress ?
                                    <div className={styles.groub_hint}>{ToastTipsstoreAddress}</div> : null
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>详细地址</div>
                                <input className={styles.inputBox} placeholder="道路、门牌号、楼栋号、单元室等" onChange={this.handlechange.bind(this, 'storeHouseNumber')} value={this.state.data.storeHouseNumber} />
                            </div>
                            {
                                ToastTipsstoreHouseNumber ?
                                    <div className={styles.groub_hint}>{ToastTipsstoreHouseNumber}</div> : null
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>门店电话</div>
                                <input className={styles.inputBox} placeholder="填写手机号" maxLength={11} onChange={this.handlechange.bind(this, 'phone')} value={this.state.data.phone} />
                            </div>
                            {
                                ToastTipsphone ?
                                    <div className={styles.groub_hint}>{ToastTipsphone}</div> : null
                            }
                            <div className={styles.selectItem} onClick={() => { this.setState({ actionSheetShow: true }) }}>
                                <div className={styles.selectTitle}>经营品类</div>
                                {
                                    this.state.data.selector ?
                                        <div className={styles.unSelectBox} >{this.state.data.selector}</div>
                                        :
                                        <div className={styles.selectBox} >请选择品类</div>
                                }
                                <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />

                            </div>
                            {
                                ToastTipsmanage_type ?
                                    <div className={styles.groub_hint}>{ToastTipsmanage_type}</div> : null
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>邮箱</div>
                                <input className={styles.inputBox} placeholder="请输入邮箱地址" onChange={this.handlechange.bind(this, 'storesMails')} value={this.state.data.storesMails} />
                            </div>
                            {
                                ToastTipsstoresMails ?
                                    <div className={styles.groub_hint}>{ToastTipsstoresMails}</div> : null
                            }
                            <div className={styles.doorPhotoContent}>
                                <div className={styles.doorPhotoTitle}>上传门头照</div>
                                <div className={styles.doorPhotoPickerBox} >
                                    {
                                        this.state.data.storePhoto ?
                                            <div className={styles.closeBox} >
                                                <img className={styles.close} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.closeDoorPhoto.bind(this)} />
                                                <img className={styles.doorPhotoPickerImg} src={"http://oss.tdianyi.com/" + this.state.data.storePhoto} />
                                            </div>
                                            :
                                            <div className={styles.closeBox} onClick={this.exampleShow.bind(this, 'storePhoto', 'http://oss.tdianyi.com/front/KcrsrfW8mzAtC2b8fDw5JAWxHWZKhnAz.png')}>
                                                <img className={styles.doorPhotoPickerImg} src="http://oss.tdianyi.com/front/KDMP8M6nQ3hKDWaBpTEMa8YPwaGsA748.png" />
                                            </div>
                                    }
                                </div>
                                <div className={styles.doorPhotoPickerText} >上传包含招牌的门店照片</div>
                            </div>
                            {
                                ToastTipsstorePhoto ?
                                    <div className={styles.groub_hint}>{ToastTipsstorePhoto}</div> : null
                            }
                            <div className={styles.environmentContent}>
                                <div className={styles.doorPhotoTitle}>上传环境照</div>
                                <div className={styles.doorPhotoList}>
                                    {
                                        this.state.data.environmentPhoto1 ?
                                            <div className={styles.doorPhotoItemBox}>
                                                <div className={styles.doorPhotoItem}>
                                                    <img className={styles.close} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.closeEnvPhoto1.bind(this)} />
                                                    <img className={styles.doorPhotoPickerImg} src={"http://oss.tdianyi.com/" + this.state.data.environmentPhoto1} />
                                                </div>
                                                <div className={styles.doorPhotoItemText}>上传环境照</div>
                                            </div>
                                            :
                                            <div className={styles.doorPhotoItemBox}>
                                                <div className={styles.doorPhotoItem}>
                                                    <div className={styles.doorPhotoItemArea}>
                                                        <ImagePicker
                                                            accept={"image/*"}
                                                            className={styles.PickerBtn}
                                                            files={this.state.files1}
                                                            multiple={false}
                                                            length={1}
                                                            selectable={this.state.files1.length < 1}
                                                            onChange={this.onChange1}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={styles.doorPhotoItemText}>上传环境照</div>
                                            </div>
                                    }
                                    {
                                        this.state.data.environmentPhoto2 ?
                                            <div className={styles.doorPhotoItemBox}>
                                                <div className={styles.doorPhotoItem}>
                                                    <img className={styles.close} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.closeEnvPhoto2.bind(this)} />
                                                    <img className={styles.doorPhotoPickerImg} src={"http://oss.tdianyi.com/" + this.state.data.environmentPhoto2} />
                                                </div>
                                                <div className={styles.doorPhotoItemText}>上传环境照</div>
                                            </div>
                                            :
                                            <div className={styles.doorPhotoItemBox}>
                                                <div className={styles.doorPhotoItem}>
                                                    <div className={styles.doorPhotoItemArea}>
                                                        <ImagePicker
                                                            className={styles.PickerBtn}
                                                            files={this.state.files2}
                                                            multiple={false}
                                                            length={1}
                                                            selectable={this.state.files2.length < 1}
                                                            onChange={this.onChange2}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={styles.doorPhotoItemText}>上传环境照</div>
                                            </div>
                                    }
                                </div>
                            </div>
                            {
                                ToastTipsenvironmentPhoto ?
                                    <div className={styles.groub_hint}>{ToastTipsenvironmentPhoto}</div> : null
                            }
                        </div> : null
                }

                {
                    tabCurrent == 1 ?
                        <div className={styles.backgroundContent}>
                            <div className={styles.contentTitle}>营业执照备案</div>
                            <div className={styles.businessLicenseuploadBox}>
                                {
                                    this.state.data.businessLicenseimg ?
                                        <div className={styles.businessLicenseContent}>
                                            <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.businessLicenseimg} />
                                            <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'businessLicenseFiles', 'businessLicenseimg')} />
                                        </div>
                                        :
                                        <div className={styles.businessLicenseContent} onClick={this.exampleShow.bind(this, 'businessLicenseimg', 'http://oss.tdianyi.com/front/iTZbCjcCTiM72KrJscH57JZtnHGKfJYS.png')}>
                                            <img className={styles.backgImg} src="http://oss.tdianyi.com/front/Q6MABkNi3yN4GB8ypREBwGAw85jSeybP.png" />
                                        </div>
                                }
                                <div className={styles.businessLicenseTitle}>上传文字清晰图片，露出边框和国微</div>
                            </div>
                            {
                                ToastTipsBusinessImg ? (
                                    <Flex justify="end" className={styles.toast_tips_img}>
                                        <span>{ToastTipsBusinessImg}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>注册号</div>
                                <input className={styles.inputBox} placeholder="同统一社会信用代码" onChange={this.handlechange.bind(this, 'registrationNumber')} value={this.state.data.registrationNumber} />
                            </div>
                            {
                                ToastTipsBusinessNo ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsBusinessNo}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>执照名称</div>
                                <input className={styles.inputBox} placeholder="无执照名称可填写经营者名称" onChange={this.handlechange.bind(this, 'licenseName')} value={this.state.data.licenseName} />
                            </div>
                            {
                                ToastTipsCornBusName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsCornBusName}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>法人姓名</div>
                                <input className={styles.inputBox} placeholder="请输入法人姓名" onChange={this.handlechange.bind(this, 'legalPerson')} value={this.state.data.legalPerson} />
                            </div>
                            {
                                ToastTipsLegalName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsLegalName}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.selectItem} onClick={this.chooseDate.bind(this, '2')} >
                                <div className={styles.selectTitle}>有效期</div>
                                {
                                    this.state.data.businessLicenseValidity ?
                                        <div className={styles.unSelectBox} >{this.state.data.businessLicenseValidity}</div>
                                        :
                                        <div className={styles.selectBox} >选择有效期</div>
                                }
                                <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                            </div>
                            {
                                ToastTipsBusinessDate ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsBusinessDate}</span>
                                    </Flex>
                                ) : ""
                            }
                        </div> : null
                }

                {
                    tabCurrent == 2 ?
                        <div className={styles.backgroundContent}>
                            <div className={styles.contentTitle}>上传身份证信息</div>
                            <div className={styles.idCardBox}>
                                <div className={styles.idCarduploadBox}>
                                    {
                                        this.state.data.idCardimg1 ?
                                            <div className={styles.idCardContent} >
                                                <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.idCardimg1} />
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'idCardFiles1', 'idCardimg1')} />
                                            </div>
                                            :
                                            <div className={styles.idCardContent} onClick={this.exampleShow.bind(this, 'idCardimg1', 'http://oss.tdianyi.com/front/Pyt65rC8EZiNmbP85eTYYwXpp6dPRY2X.png')}>
                                                <img className={styles.backgImg} src="http://oss.tdianyi.com/front/NzHXAFYapJzFsTxDhjwWRKBfefAB7RQT.png" />
                                            </div>
                                    }
                                    <div className={styles.idCardTitle}>身份证正面</div>
                                </div>
                                <div className={styles.idCarduploadBox}>
                                    {
                                        this.state.data.idCardimg2 ?
                                            <div className={styles.idCardContent}>
                                                <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.idCardimg2} />
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'idCardFiles2', 'idCardimg2')} />
                                            </div>
                                            :
                                            <div className={styles.idCardContent} onClick={this.exampleShow.bind(this, 'idCardimg2', 'http://oss.tdianyi.com/front/nGCSmAXw2Ej5WEMPrdtXMp3JYdGfRAz3.png')}>
                                                <img className={styles.backgImg} src="http://oss.tdianyi.com/front/mKjpWtfFk2rDnyzCiCdKrKYKccjyGBtW.png" />
                                            </div>
                                    }
                                    <div className={styles.idCardTitle}>身份证反面</div>
                                </div>
                                <div className={styles.idCarduploadBox}>
                                    {
                                        this.state.data.idCardimg3 ?
                                            <div className={styles.idCardContent}>
                                                <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.idCardimg3} />
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'idCardFiles3', 'idCardimg3')} />
                                            </div>
                                            :
                                            <div className={styles.idCardContent} onClick={this.exampleShow.bind(this, 'idCardimg3', 'http://oss.tdianyi.com/front/PefSyZzCcw4kbitmDG2HESmretBnwM4d.png')}>
                                                <img className={styles.backgImg} src="http://oss.tdianyi.com/front/rdz4ZQ5bt4MenNyntnkFB7zRFr3jwxCH.png" />
                                            </div>
                                    }
                                    <div className={styles.idCardTitle}>手持身份证正面</div>
                                </div>
                            </div>
                            {
                                ToastTipsLegalIDImg ? (
                                    <Flex justify="end" className={styles.toast_tips_img}>
                                        <span>{ToastTipsLegalIDImg}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>姓名 </div>
                                <input className={styles.inputBox} placeholder="请输入姓名 " onChange={this.handlechange.bind(this, 'name')} value={this.state.data.name} />
                            </div>
                            {
                                ToastTipsContactName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsContactName}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>身份证号</div>
                                <input className={styles.inputBox} placeholder="请输入身份证号" onChange={this.handlechange.bind(this, 'idCardNum')} value={this.state.data.idCardNum} />
                            </div>
                            {
                                ToastTipsLegalIdNo ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsLegalIdNo}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.selectItem} onClick={this.chooseDate.bind(this, '1')} >
                                <div className={styles.selectTitle}>有效期</div>
                                {
                                    this.state.data.idCardValidity ?
                                        <div className={styles.unSelectBox} >{this.state.data.idCardValidity}</div>
                                        :
                                        <div className={styles.selectBox} >请选择有效期</div>
                                }
                                <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                            </div>
                            {
                                ToastTipsIDDate ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsIDDate}</span>
                                    </Flex>
                                ) : ""
                            }
                        </div> : null
                }

                {
                    this.state.actionSheetShow ? <div className={styles.bottomBoxMask}>
                        <div className={styles.bottomTypeBox}>
                            <div className={styles.bottomBoxTypeTitle}>
                                <div className={styles.titleText}>请选择经营品类</div>
                                <img className={styles.titleClose} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.closeCheckout} />
                            </div>
                            <div className={styles.bottomBoxTypeContent}>
                                {
                                    this.state.manage_list.map((item: any, index: any) => {
                                        return (<div className={item.id == this.state.tempmanage_list_value ? styles.bottomBoxTypeItemSelset : styles.bottomBoxTypeItem} key={item.id} onClick={this.tempCheckout.bind(this, item.id, item.name)}>{item.name}</div>)
                                    })
                                }
                            </div>
                            <div className={styles.bottomBoxTypeBtnBox}>
                                <div className={styles.bottomBoxTypeBtn} onClick={this.checkout}>确定</div>
                            </div>
                        </div>
                    </div> : null
                }


                {
                    tabCurrent == 0 ? <div className={styles.bottomBox}>
                        <div className={styles.submitBtnCenter} onClick={this.changeTabCurrent.bind(this, 1)}>下一步</div>
                    </div> : null
                }
                {
                    tabCurrent == 1 ? <div className={styles.bottomBox}>
                        <div className={styles.saveBtn} onClick={this.changeTabCurrent.bind(this, 0)}>上一步</div>
                        <div className={styles.submitBtn} onClick={this.changeTabCurrent.bind(this, 2)}>下一步</div>
                    </div> : null
                }
                {
                    tabCurrent == 2 ? <div className={styles.bottomBox}>
                        <div className={styles.saveBtn} onClick={this.changeTabCurrent.bind(this, 1)} >上一步</div>
                        <div className={styles.submitBtn} onClick={this.submitInfo}>提交</div>
                    </div> : null
                }

                {
                    this.state.exampleImgShow ? <ExampleImg
                        exampleImg={this.state.exampleImgurl}
                        excampleList={this.state.exampleRules}
                        onUpload={this.onUpload(this.state.exampleImgUrlType)}
                        onCancle={this.onCancle}
                    /> : null
                }
            </div >
        )
    }
}



