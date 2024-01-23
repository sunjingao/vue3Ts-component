import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type DateItemType = {
  year: number,
  month: number,
  date: number,
  isDisabled: boolean,
  isSelected: boolean
}

type DateRangeItemType = {
  start: {
    year: number,
    month: number,
    date: number,
  }
} | {
  end: {
    year: number,
    month: number,
    date: number,
  }
} | {
  start: {
    year: number,
    month: number,
    date: number
  },
  end: {
    year: number,
    month: number,
    date: number
  }
}

export {
  ProvideValType,
  InstanceType,
  DateItemType,
  DateRangeItemType
};
