import request from '@/utils/request'
/**
 *  获取数据列表
 * @returns
 */
export const getRightListener = () => {
  return request({
    url: 'rights/list'
  })
}
