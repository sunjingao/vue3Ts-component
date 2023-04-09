import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type MonthItemType = {
  month: number,
  value: string,
  isDisabled: boolean,
  isSelected: boolean
}

type MonthRangeItemType = {
  start: {
    year: number,
    month: number,
  }
} | {
  end: {
    year: number,
    month: number,
  }
} | {
  start: {
    year: number,
    month: number,
  },
  end: {
    year: number,
    month: number,
  }
}

export {
  ProvideValType,
  InstanceType,
  MonthItemType,
  MonthRangeItemType
};
