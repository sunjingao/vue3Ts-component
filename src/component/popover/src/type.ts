import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type ThemeType = 'dark' | 'light';

type TriggerType = 'hover' | 'focus' | 'click' | 'manual';

export {
  ProvideValType,
  InstanceType,
  ThemeType,
  TriggerType
};
