import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type ModelValueType = number | string;

export {
  ProvideValType,
  InstanceType,
  ModelValueType
};
