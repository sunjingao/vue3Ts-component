
type SettingsType = {
  el: HTMLElement,
  isCancel: boolean,
  delay: number, // 默认延时
  disabled: boolean, // 默认是否禁止选中
  distance: number, // 默认触发回调的距离
  callBack: AnyCb, // 默认回调函数
  scrollThrottle: AnyCb
}

export {
  SettingsType
};
