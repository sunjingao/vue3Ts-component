import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type DataItemType = {
  value: string | number,
  label: string | number,
  key: string | number,
  checked?: boolean,
  disabled?: boolean
}

type SettingType = {
  canCheckedNum: number,
  checkedNum: number,
  checkedNotDisabledNum: number,
  amount: number
}

type TransferBoxType = 'source' | 'target';

export {
  ProvideValType,
  InstanceType,
  DataItemType,
  SettingType,
  TransferBoxType
};
