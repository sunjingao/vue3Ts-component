import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type AutoItemType = {
  value: number | string,
  label: number | string,
  selected: boolean,
  over: boolean,
  disabled: boolean,
  hasChildren: boolean,
}

export {
  ProvideValType,
  InstanceType,
  AutoItemType
};
