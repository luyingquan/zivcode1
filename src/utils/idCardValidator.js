/**
 * 验证中国大陆居民身份证号
 * @param {string} idCard - 身份证号码
 * @returns {object} - 返回验证结果对象，包含是否有效、错误信息、以及解析出的基本信息
 */
export const validateIdCard = (idCard) => {
  // 返回结果对象
  const result = {
    isValid: false,
    message: '',
    info: {
      gender: '',
      birth: '',
      age: 0,
      province: ''
    }
  };

  // 省份代码映射
  const provinceMap = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江",
    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
    50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏",
    61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
    71: "台湾", 81: "香港", 82: "澳门"
  };

  // 加权因子
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  
  // 校验码
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  // 基本格式校验
  if (!idCard) {
    result.message = '身份证号不能为空';
    return result;
  }

  // 清除空格
  idCard = idCard.trim();

  // 长度校验
  if (idCard.length !== 18) {
    result.message = '身份证号长度必须为18位';
    return result;
  }

  // 格式校验：前17位必须是数字
  if (!/^\d{17}[\dX]$/i.test(idCard)) {
    result.message = '身份证号格式不正确';
    return result;
  }

  // 省份校验
  const provinceCode = idCard.substring(0, 2);
  if (!provinceMap[provinceCode]) {
    result.message = '身份证号的省份代码不正确';
    return result;
  }

  // 出生日期校验
  const year = parseInt(idCard.substring(6, 10));
  const month = parseInt(idCard.substring(10, 12));
  const day = parseInt(idCard.substring(12, 14));
  
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    result.message = '身份证号的出生日期不正确';
    return result;
  }

  // 校验码验证
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard.charAt(i)) * weights[i];
  }
  const checkCode = checkCodes[sum % 11];
  if (checkCode !== idCard.charAt(17).toUpperCase()) {
    result.message = '身份证号的校验码不正确';
    return result;
  }

  // 验证通过，解析基本信息
  result.isValid = true;
  result.message = '验证通过';
  
  // 解析性别（倒数第二位，奇数为男，偶数为女）
  const genderCode = parseInt(idCard.charAt(16));
  result.info.gender = genderCode % 2 === 1 ? '男' : '女';
  
  // 解析出生日期
  result.info.birth = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  // 计算年龄
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - (month - 1);
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age--;
  }
  result.info.age = age;
  
  // 解析省份
  result.info.province = provinceMap[provinceCode];

  return result;
};

// 使用示例：
/*
const result = validateIdCard('110101199003077777');
console.log(result);
{
  isValid: true/false,
  message: '验证通过' 或 错误信息,
  info: {
    gender: '男'/'女',
    birth: '1990-03-07',
    age: 33,
    province: '北京'
  }
}
*/ 