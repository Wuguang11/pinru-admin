import request from '@/utils/request'
/**
 * 获取表格数据
 * @param {*} data
 * @returns
 */
export const getOrderTabData = (params) => {
  return request({
    url: 'orders',
    params
  })
}
