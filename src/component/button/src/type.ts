import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type CompType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger';

export {
  ProvideValType,
  InstanceType,
  CompType
};
