import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type MarksItemType = { left: string, value: string };

export {
  ProvideValType,
  InstanceType,
  MarksItemType
};
