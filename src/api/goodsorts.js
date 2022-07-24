import request from '@/utils/request'
/**
 * 获取表格数据及弹出框级联选择器数据
 * @param {*} params
 * @returns
 */
export const getGoodSortData = (params) => {
  return request({
    url: 'categories',
    params
  })
}
// 报存分类参数
export const addGoodsSorts = (data) => {
  return request({
    method: 'POST',
    url: 'categories',
    data
  })
}
