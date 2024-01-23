import comp from './index.vue';

type InstanceType = CompInstanceType<typeof comp>;

type CompType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  type: CompType,
  width: string,
  height: string,
};

export {
  ProvideValType,
  InstanceType,
  CompType
};
