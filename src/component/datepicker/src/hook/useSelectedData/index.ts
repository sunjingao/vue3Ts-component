import { getCurrentInstance, reactive, Ref, watch } from 'vue';
import { EMITS, DATE_TYPES } from '@/component/datepicker/src/config';
import {
  DatepikerType,
  NoSelectedType,
  SelectedDateType,
  SelectedMonthType,
  SelectedYearType
} from '@/component/datepicker/src/type';
import { YearRangeItemType } from '@/component/datepicker/src/component/yearpicker/type';
import { MonthRangeItemType } from '@/component/datepicker/src/component/monthpicker/type';
import { DateRangeItemType } from '@/component/datepicker/src/component/datePicker/type';

export function useSelectedData(
  defaultTimeRf: Ref<SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType>,
  rangeRf: Ref<(YearRangeItemType | MonthRangeItemType | DateRangeItemType)[]>,
  typeRf: Ref<DatepikerType>
) {
  const selectedDateRt = reactive<SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType>({
    year: undefined
  }); // 传递给子组件的时间内容

  const { emit } = getCurrentInstance();

  function getNumber(val: number) {
    return parseInt(String(val));
  }

  function setTime(obj: SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType = {}) {
    if (typeRf.value === DATE_TYPES.YEAR) {
      selectedDateRt.year = obj.year;
      selectedDateRt.month = '';
      selectedDateRt.date = '';
    } else if (typeRf.value === DATE_TYPES.MONTH) {
      selectedDateRt.year = obj.year;
      selectedDateRt.month = obj.month;
      selectedDateRt.date = '';
    } else {
      selectedDateRt.year = obj.year;
      selectedDateRt.month = obj.month;
      selectedDateRt.date = obj.date;
    }
  }

  function setSelectedValue(obj: SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType) {
    if (
      typeRf.value === DATE_TYPES.YEAR &&
      getNumber((selectedDateRt as SelectedYearType).year) !== getNumber((obj as SelectedYearType).year)
    ) {
      emit(EMITS.CHANGE, obj);
      setTime(obj);
    } else if (
      typeRf.value === DATE_TYPES.MONTH &&
      (getNumber((selectedDateRt as SelectedMonthType).year) !== getNumber((obj as SelectedYearType).year) ||
        getNumber((selectedDateRt as SelectedMonthType).month) !== getNumber((obj as SelectedMonthType).month))
    ) {
      emit(EMITS.CHANGE, obj);
      setTime(obj);
    } else if (
      getNumber((selectedDateRt as SelectedDateType).year) !== getNumber((obj as SelectedDateType).year) ||
      getNumber((selectedDateRt as SelectedDateType).month) !== getNumber((obj as SelectedDateType).month) ||
      getNumber((selectedDateRt as SelectedDateType).date) !== getNumber((obj as SelectedDateType).date)
    ) {
      emit(EMITS.CHANGE, obj);
      setTime(obj);
    }
  }

  watch(
    [() => defaultTimeRf.value, () => rangeRf.value],
    () => {
      setTime(defaultTimeRf.value);
    },
    {
      immediate: true,
      deep: true
    }
  );

  return {
    selectedDateRt,
    setSelectedValue
  };
}
