import request from '@/utils/request'
/**
 *  获取菜单列表
 */
export const getMenus = () => {
  return request({
    url: '/menus'
  })
}
