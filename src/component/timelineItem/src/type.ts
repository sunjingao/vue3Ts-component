import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type PlacementType = 'top' | 'bottom';

export {
  ProvideValType,
  InstanceType,
  PlacementType
};
