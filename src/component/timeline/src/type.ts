import comp from './index.vue';
import { ComputedRef } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  register: AnyCb,
  getIsLastCp: AnyCb<[unknown], ComputedRef<boolean>>,
  destroyItem: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

export {
  ProvideValType,
  InstanceType
};
