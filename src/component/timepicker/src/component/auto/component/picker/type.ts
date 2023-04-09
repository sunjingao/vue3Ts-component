import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type Instance = CompInstanceType<typeof comp>;

type PickEmptyPointType = {
  value: null,
  isDisabled: boolean,
  isSelected: boolean,
}

type PickContentType = {
  hour: {
    value: number | string,
    isDisabled: boolean,
    isSelected: boolean
  }[],
  minute: {
    value: number | string,
    isDisabled: boolean,
    isSelected: boolean
  }[],
  second: {
    value: number | string,
    isDisabled: boolean,
    isSelected: boolean
  }[],
}

export {
  ProvideValType,
  Instance,
  PickEmptyPointType,
  PickContentType
};
