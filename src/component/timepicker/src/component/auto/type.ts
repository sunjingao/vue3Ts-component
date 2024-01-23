import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type AutoEmitType = {
  startTime?: {
    hour?: number | string,
    minute?: number | string,
    second?: number | string,
  },
  endTime?: {
    hour?: number | string,
    minute?: number | string,
    second?: number | string,
  }
}

export {
  ProvideValType,
  InstanceType,
  AutoEmitType
};
