import request from '@/utils/request'
/**
 *  获取表格的数据
 * @returns
 */
export const getRolesTabInfo = () => {
  return request({
    url: 'roles'
  })
}
/**
 * 删除用户权限
 * @param {展开行的id} roles
 * @param {删除标签的id} rights
 * @returns
 */
export const deletUserRuler = (roles, rights) => {
  return request({
    method: 'DELETE',
    url: `roles/${roles}/rights/${rights}`
  })
}
/**
 *  获取弹窗树形数据
 * @returns
 */
export const getTreeList = () => {
  return request({
    url: 'rights/tree'
  })
}
