import comp from './index.vue';

type ProvideValType = {
  modelValue: (number | string)[],
  register: AnyCb,
  triggerClick: AnyCb,
  deleteItem: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

type ModelValueItemType = number | string;

export {
  ProvideValType,
  InstanceType,
  ModelValueItemType
};
