import request from '@/utils/request'
/**
 * 获取级联选择器的数据
 * @returns
 */
export const getGoodsCategories = () => {
  return request({
    url: '/categories'
  })
}
/**
 * 获取表格的数据
 * @param {级联三级标题的id} id
 * @param {} params
 * @returns
 */
export const getTableData = (id, params) => {
  return request({
    url: `categories/${id}/attributes`,
    params
  })
}
/**
 * 保存表格下拉标签的数据
 * @param {*} catId
 * @param {*} attrId
 * @param {*} data
 * @returns
 */
export const saveTagInfo = (catId, attrId, data) => {
  return request({
    method: 'PUT',
    url: `categories/${catId}/attributes/${attrId}`,
    data
  })
}
/**
 * 新增属性/参数
 * @param {级联选择器三级id} catId
 * @param {输入的数据} data
 * @returns
 */
export const addparams = (catId, data) => {
  return request({
    method: 'POST',
    url: `categories/${catId}/attributes`,
    data
  })
}
/**
 * 编辑参数
 * @param {级联选择器三级id} catId
 * @param {当前行的id} id
 * @param {*} data
 * @returns
 */
export const editParams = (catId, id, data) => {
  return request({
    method: 'PUT',
    url: `categories/${catId}/attributes/${id}`,
    data
  })
}
/**
 * 删除参数
* @param {级联选择器三级id} catId
 * @param {当前行的id} id
 * @returns
 */
export const deleteParams = (catId, id) => {
  return request({
    method: 'DELETE',
    url: `categories/${catId}/attributes/${id}`
  })
}
