import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  changeOption: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

export {
  ProvideValType,
  InstanceType
};
