/**
 *  校验邮箱
 * @param {传入输入邮箱的值} data
 */
export const validateTheEmail = (data) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(data)
}
/**
 *
 * @param {输入的手机号} data
 * @returns
 */
export const validateTheMobile = (data) => {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/
  return reg.test(data)
}
