
import request from '@/services/request'

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

