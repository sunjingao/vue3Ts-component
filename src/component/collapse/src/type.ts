import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  modelValue: (number | string)[] | number | string,
  accordion: boolean,
  changeActive: AnyCb,
};

type InstanceType = CompInstanceType<typeof comp>;

export {
  ProvideValType,
  InstanceType
};
