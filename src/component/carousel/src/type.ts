import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  register: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

type TriggerType = 'click' | 'hover';
type IndicatorType = 'outside' | 'inside' | 'none';
type ArrowType = 'always' | 'hover' | 'never';

export {
  ProvideValType,
  InstanceType,
  TriggerType,
  IndicatorType,
  ArrowType,
};
