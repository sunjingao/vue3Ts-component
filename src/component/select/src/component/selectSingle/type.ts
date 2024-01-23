import comp from './index.vue';

type ProvideValType = {
  modelValue: string | number,
  register: AnyCb,
  triggerClick: AnyCb,
  deleteItem: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

type SelectObjItemType = {
  label: number | string,
  value: number | string,
}

type ModelValueItemType = number | string;

export {
  ProvideValType,
  InstanceType,
  SelectObjItemType,
  ModelValueItemType
};
