// 内置手机号正则字符串
const innerPhoneReg =
  '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$';

/**
 * 手机号正则校验
 * @param phone 手机号
 * @param phoneReg 正则字符串
 * @returns true - 校验通过 false - 校验失败
 */
export const phoneRegCheck = (phone) => {
  const phoneRegExp = new RegExp(innerPhoneReg);
  return phoneRegExp.test(phone);
};

module.exports = {
  phoneRegCheck,
};

