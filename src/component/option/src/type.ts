import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type OptionItem = {
  value: string | number,
  label: string | number,
  isActive: boolean
}

export {
  ProvideValType,
  InstanceType,
  OptionItem
};
