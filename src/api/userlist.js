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
 *  添加用户
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
/**
 *  改变状态
 * @param {用户的id} id
 * @param {开关的状态} state
 * @returns
 */
export const changeUserState = (id, state) => {
  return request({
    method: 'PUT',
    url: `users/${id}/state/${state}`
  })
}
/**
 *  编辑用户
 * @param {编辑的用户id} id
 * @param {编辑的数据} data
 * @returns
 */
export const editUser = (id, data) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data
  })
}
/**
 *  删除用户
 * @param {用户的id} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}
/**
 *  获取角色列表
 * @returns
 */
export const getRoleInfo = () => {
  return request({
    url: 'roles'
  })
}

export const updateRole = (id, rid) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}
