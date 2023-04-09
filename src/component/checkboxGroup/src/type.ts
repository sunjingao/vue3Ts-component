import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  border: boolean,
  modelValue: (number | string)[],
  disabled: boolean,
  isIndeterminate: boolean,
  changeMV: AnyCb,
};

type InstanceType = CompInstanceType<typeof comp>;

type ModelValueItemType = number | string;

export {
  ProvideValType,
  InstanceType,
  ModelValueItemType
};
