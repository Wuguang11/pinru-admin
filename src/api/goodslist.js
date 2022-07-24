import request from '@/utils/request'
/**
 *
 * @param {请求参数} params
 * @returns
 */
export const getGoodInfoList = (params) => {
  return request({
    url: 'goods',
    params
  })
}
/**
 * 筛选表格数据
 * @param {用户输入的关键词} query
 * @param {当前页数} pagenum
 * @param {当前页尺寸} pagesize
 * @returns
 */
export const filterPageInfo = (params) => {
  return request({
    url: 'goods',
    params
  })
}
