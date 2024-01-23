import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  modelValue: number | string | boolean,
  border: boolean,
  disabled: boolean,
  changeMV: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

export {
  ProvideValType,
  InstanceType
};
