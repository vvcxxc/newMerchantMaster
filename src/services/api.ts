import request from './request';

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
