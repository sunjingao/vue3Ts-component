import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type RangeType = {
  hour?: { start?: string | number, end?: string | number }[],
  minute?: { start?: string | number, end?: string | number }[],
  second?: { start?: string | number, end?: string | number }[],
}

type TimeType = {
  hour?: string | number,
  minute?: string | number,
  second?: string | number,
}

export {
  ProvideValType,
  InstanceType,
  RangeType,
  TimeType
};
