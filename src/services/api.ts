import request from './request';


/**
 * 发送验证码
 * @param phone
 */
export const sendVerificationCode = (phone: string | number) =>
  request({
    method: 'PUT',
    url: '/supplier/common/phoneCode',
    data: {
      scene: 1,
      phone
    }
  })

/**
 *  校验短信验证码
 */
export const verifyPhoneCode = (code_key: string | number, code: string | number) =>
  request({
    method: 'PUT',
    url: '/supplier/common/checkoutPhoneCode',
    data: {
      code_key,
      code
    }
  })

/**
 * 登录
 */
export const phoneLogin = (permitCode: string | number) =>
  request({
    url: '/supplier/authorizations',
    method: 'POST',
    data: {
      scenes: 2,
      permitCode
    }
  })



/**
 * 获取审核的id
 */
export const getAuditId = () => {
  return request({
    method: 'GET',
    url: '/supplier/store/examines/recent/record'
  })
}

/**
 * 资料审核进度
*/
export const getAuditRecord = (id:number) =>
  request({
    method: 'GET',
    url: '/supplier/store/examines/process/' + id
  })

/**
 *  添加礼品
 */
export const addGift = (data: object) =>
  request({
    method: 'POST',
    url: '/supplier/gift',
    data
  })

/**
 *  获取我的礼品列表
 */
export const getMyGiftList = (page: number | string) =>
  request({
    method: 'GET',
    url: '/supplier/gift',
    params: {
      page
    }
  })

/**
 *  获取礼品详情
 */
export const getGiftDetails = (id: number | string) =>
  request({
    method: 'GET',
    url: '/supplier/gift/' +id
  })

/**
 * 上下架礼品
 */
export const upDownGift = (gift_ids: any, status: number) =>
  request({
    method: 'POST',
    url: '/supplier/gift/updateStatus',
    data: {
      gift_ids,
      status
    }
  })
