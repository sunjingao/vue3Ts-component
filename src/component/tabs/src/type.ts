import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  register: AnyCb,
  destroyItem: AnyCb,
  modelValue: string
};

type InstanceType = CompInstanceType<typeof comp>;

type TypeType = 'card' | 'default';

type PositionType = 'top' | 'right' | 'bottom' | 'left';

type TabItemType = {
  value: string,
  label: string,
  disabled: boolean,
  isActiveCp: boolean,
  isShow: boolean,
  isHoverRf: boolean,
  isShowCloseCp: boolean,
}

export {
  ProvideValType,
  InstanceType,
  TypeType,
  PositionType,
  TabItemType
};
