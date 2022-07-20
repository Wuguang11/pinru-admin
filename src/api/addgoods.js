import request from '@/utils/request'
// 获取基本信息部分层级显示数据
export const getcategories = () => {
  return request({
    url: 'categories'
  })
}
// 获取商品信息部分数据
export const getGoodsAttribute = (id, params) => {
  return request({
    url: `categories/${id}/attributes`,
    params
  })
}
