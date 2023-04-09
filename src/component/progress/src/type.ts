import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type TypeType = 'line' | 'circle';

type BgColorArrType = { bgColor: string, percentage: number }[];

type BgColorType = string | AnyCb | BgColorArrType;

export {
  ProvideValType,
  InstanceType,
  TypeType,
  BgColorArrType,
  BgColorType
};
