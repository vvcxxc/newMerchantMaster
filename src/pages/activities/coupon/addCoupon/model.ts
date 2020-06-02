import { Model } from 'dva';

export interface Coupon {
    coupon_classification: string;
    coupon_classificationId: string | number;//分类id
    coupon_name: string;//券名字
    coupon_marketPrice: string | number;//市场价
    coupon_purchasePrice: string | number;//购买价
    coupon_validity: string | number,//有效期（月）
    coupon_useNotice: Array<any>;//使用须知
    coupon_shareInfo: string;//分享信息
    coupon_img1: string;
    coupon_img2: string;
    coupon_img3: string;
    coupon_gift: Array<any>;
    snap_validity: string | number,//抢购有效期（月）
    snap_price: string | number,//抢购价格
    snap_num: string | number,//抢购数量
    snap_limit: number,//抢购限制 0:无限制 1:x张/人
    snap_limitNum: string | number,//x张/人
    snap_promote: number,//0是1否
}
const model: Model = {
    namespace: 'addCoupon',
    state: {
        coupon_classification: '',//分类
        coupon_classificationId: '',//分类id
        coupon_name: '',//券名字
        coupon_marketPrice: '',//市场价
        coupon_purchasePrice: '',//购买价
        coupon_validity: 0,//有效期（月）
        coupon_useNotice: [],//使用须知
        coupon_shareInfo: '',//分享信息
        coupon_img1: '',
        coupon_img2: '',
        coupon_img3: '',
        coupon_gift: [],
        snap_validity: 0,//抢购有效期（月）
        snap_price: '',//抢购价格
        snap_num: '',//抢购总数量
        snap_limit: 0,//抢购限制 0:无限制 1:x张/人
        snap_limitNum: 0,//x张/人
        snap_promote: 0,//0是1否
    },
    reducers: {
        setCoupon(state, { payload }) {
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
                coupon_marketPrice: '',//市场价
                coupon_purchasePrice: '',//购买价
                coupon_validity: 0,//有效期（月）
                coupon_useNotice: [],//使用须知
                coupon_shareInfo: '',//分享信息
                coupon_img1: '',
                coupon_img2: '',
                coupon_img3: '',
                coupon_gift: [],
                snap_validity: 0,//抢购有效期（月）
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
