import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type YearItemType = {
  value: number,
  isDisabled: boolean,
  isSelected: boolean
}

type YearRangeItemType = {
  start: {
    year: number,
  }
} | {
  end: {
    year: number,
  }
} | {
  start: {
    year: number,
  },
  end: {
    year: number,
  }
}

export {
  ProvideValType,
  InstanceType,
  YearItemType,
  YearRangeItemType
};
