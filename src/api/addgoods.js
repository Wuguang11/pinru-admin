import request from '@/utils/request'
export const getcategories = () => {
  return request({
    url: 'categories'
  })
}
