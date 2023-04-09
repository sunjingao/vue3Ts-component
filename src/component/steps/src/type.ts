import comp from './index.vue';
import { Ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  alignCenter: boolean,
  space: number,
  active: number,
  error: boolean,
  simple: boolean,
  register: AnyCb,
  getCurIndexCp: AnyCb<unknown[], Ref<number>>,
  getIsLastCp: AnyCb<unknown[], Ref<boolean>>,
  destroyItem: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

export {
  ProvideValType,
  InstanceType
};
