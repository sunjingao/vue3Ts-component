import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type SelectedYearType = {
  year: number,
  month?: '',
  date?: ''
}

type SelectedMonthType = {
  year: number,
  month: number,
  date?: ''
}

type SelectedDateType = {
  year: number,
  month: number,
  date: number
}

type NoSelectedType = {
  year?: '',
  month?: '',
  date?: ''
}

type DatepikerType = 'year' | 'month' | 'date';

export {
  ProvideValType,
  InstanceType,
  SelectedYearType,
  SelectedMonthType,
  SelectedDateType,
  NoSelectedType,
  DatepikerType
};
