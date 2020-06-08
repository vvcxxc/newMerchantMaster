import { Model } from 'dva';

export interface Coupon {
    coupon_classification: string;
    coupon_classificationId: string | number;//分类id
    coupon_name: string;//券名字
    coupon_denomination: string | number;//面额
    coupon_purchasePrice: string | number;//购买价
    coupon_threshold: string | number;//门槛
    coupon_validity: string | number,//有效期（月）
    coupon_allUseNotice: Array<any>;//使用须知
    coupon_useNotice: Array<any>;//使用须知
    coupon_shareInfo: string;//分享信息
    coupon_img1: string;
    coupon_img2: string;
    coupon_img3: string;
    coupon_gift: Array<any>;
    start_date: string | number,//抢购有效期
    end_date: string | number,
    snap_price: string | number,//抢购价格
    snap_num: string | number,//抢购数量
    snap_limit: number,//抢购限制 0:无限制 1:x张/人
    snap_limitNum: string | number,//x张/人
    snap_promote: number,//0是1否
}
const model: Model = {
    namespace: 'addMoney',
    state: {
        coupon_classification: '',//分类
        coupon_classificationId: '',//分类id
        coupon_name: '',//券名字
        coupon_denomination: '',//面额
        coupon_purchasePrice: '',//购买价
        coupon_threshold: '',//门槛
        coupon_validity: 0,//有效期（月）
        coupon_allUseNotice: [
            { id: 0, value: '111111111111111111111111111111111', select: true },
            { id: 1, value: '222222222222222222222222222', select: true },
            { id: 2, value: '3333333333333333333333333333', select: true },
            { id: 3, value: '444444444444444444444444444444', select: true }
        ],//使用须知
        coupon_useNotice: [],//使用须知
        coupon_shareInfo: '',//分享信息
        coupon_img1: '',
        coupon_img2: '',
        coupon_img3: '',
        coupon_gift: [],
        start_date: '',//抢购有效期
        end_date: '',
        snap_price: '',//抢购价格
        snap_num: '',//抢购总数量
        snap_limit: 0,//抢购限制 0:无限制 1:x张/人
        snap_limitNum: 0,//x张/人
        snap_promote: 0,//0是1否
    },
    reducers: {
        setMoney(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        cleanCoupon(state) {
            return {
                ...state,
                coupon_classification: '',//分类
                coupon_classificationId: '',//分类id
                coupon_name: '',//券名字
                coupon_denomination: '',//面额
                coupon_purchasePrice: '',//购买价
                coupon_threshold: '',//门槛
                coupon_validity: 0,//有效期（月）
                coupon_allUseNotice: [],//使用须知
                coupon_useNotice: [],//使用须知
                coupon_shareInfo: '',//分享信息
                coupon_img1: '',
                coupon_img2: '',
                coupon_img3: '',
                coupon_gift: [],
                start_date: '',//抢购有效期
                end_date: '',
                snap_price: '',//抢购价格
                snap_num: '',//抢购数量
                snap_limit: 0,//抢购限制 0:无限制 1:x张/人
                snap_limitNum: 0,//x张/人
                snap_promote: 0,//0是1否
            }
        }
    }
}


export default model
