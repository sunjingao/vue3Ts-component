import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type RegisterItemType = {
  value: string,
  label: string,
  disabled: boolean,
  isActiveCp: boolean
}

export {
  ProvideValType,
  InstanceType,
  RegisterItemType
};
