import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type ItemType = { label: number | string, value: number | string };

type MoveTypeType = 'up' | 'down';

export {
  ProvideValType,
  InstanceType,
  ItemType,
  MoveTypeType
};
