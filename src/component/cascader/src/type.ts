import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type ModelValueItemType = number | string;

type OptionItemType = {
  label: number | string,
  value: number | string,
  disabled: boolean,
  children?: OptionItemType[]
};

type InputItemType = {
  value: number | string,
  label: number | string,
  disabled: boolean
};

export {
  ProvideValType,
  InstanceType,
  ModelValueItemType,
  OptionItemType,
  InputItemType
};
