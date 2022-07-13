import request from '@/utils/request'
/**
 * 获取表格数据
 * @param {当前页数} pagenum
 * @param {当前页尺寸} pagesize
 * @returns
 */
export const getPageInfo = (params) => {
  return request({
    url: 'users',
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
    url: 'users',
    params
  })
}
/**
 *
 * @param {子组件输入框用户信息} data
 * @returns
 */
export const addUser = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}
export const changeUserState = (id, state) => {
  return request({
    method: 'PUT',
    url: `users/${id}/state/${state}`
  })
}
