import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type LayoutType = ('pager' | 'jumper' | 'sizes' | 'total')[];

type SelectItemType = { label: number | string, value: number };

export {
  ProvideValType,
  InstanceType,
  LayoutType,
  SelectItemType
};
