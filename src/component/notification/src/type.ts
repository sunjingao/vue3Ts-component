// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type OptionType = {
  // 标题文字
  title?: string,
  // success、warning、tip、error
  type?: 'success' | 'warning' | 'tip' | 'error',
  // 是否直接关闭
  closable?: boolean,
  // 关闭处展示的文字
  closeText?: string,
  // 是否展示icon
  showIcon?: boolean,
  // 标题 和 描述处的内容的水平的肚脐方式
  textCenter?: boolean,
  zIndex?: string,
  closeMethod?: AnyCb
  timeout?: number,
  plain?: boolean,
  description: boolean,
  direction: string,
  offset: string
}

type SettingType = {
  isOpen: boolean,
  timer: number,
  direction: string,
  container: HTMLElement,
  timeout: number,
  open: () => void,
  close: () => void,
}

export {
  ProvideValType,
  OptionType,
  SettingType
};
