// 将一位长度的字符串转为两位长度
export function getTwoNumberStr(value: string | number | null | undefined, defaultVal = '') {
  if (value === null || value === undefined || value === '') {
    return defaultVal;
  } else {
    const temp = typeof value === 'number' ? value.toString() : value;
    return temp.length < 2 ? `0${temp}` : temp;
  }
}
