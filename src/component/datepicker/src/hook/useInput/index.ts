import { DATE_TYPES, EMITS } from '@/component/datepicker/src/config';
import { getIsDisabled } from '@/component/datepicker/src/util';
import { computed, getCurrentInstance, nextTick, Ref } from 'vue';
import { getTwoNumberStr } from '@/util/string';
import { YearRangeItemType } from '@/component/datepicker/src/component/yearpicker/type';
import { DateRangeItemType } from '@/component/datepicker/src/component/datePicker/type';
import { MonthRangeItemType } from '@/component/datepicker/src/component/monthpicker/type';
import {
  DatepikerType,
  NoSelectedType,
  SelectedDateType,
  SelectedMonthType,
  SelectedYearType
} from '@/component/datepicker/src/type';
import { InstanceType } from '@/component/input/src/type';

function getIsInputValValid(val: string, type: typeof DATE_TYPES[keyof typeof DATE_TYPES], separator: string) {
  // eslint-disable-next-line
  const YEAR_REG = new RegExp('^\\d{4}$');
  const MONTH_REG = new RegExp(`^\\d{4}${separator}\\d{2}$`);
  const DATE_REG = new RegExp(`^\\d{4}${separator}\\d{2}${separator}\\d{2}$`);
  const TYPE_REG = {
    [DATE_TYPES.YEAR]: YEAR_REG,
    [DATE_TYPES.MONTH]: MONTH_REG,
    [DATE_TYPES.DATE]: DATE_REG
  };
  return TYPE_REG[type].test(val);
}

export function useInput(
  typeRf: Ref<DatepikerType>,
  separatorRf: Ref<string>,
  editableRf: Ref<boolean>,
  rangeRf: Ref<(YearRangeItemType | MonthRangeItemType | DateRangeItemType)[]>,
  inputD: Ref<InstanceType>,
  selectedDateRt: SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType,
  hidePopper: AnyCb,
  setSelectedValue: (obj: (SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType)) => void
) {
  const { emit } = getCurrentInstance();

  const inputValueCp = computed(() => {
    if (Object.values(selectedDateRt).every((item) => item === '')) {
      return '';
    }
    let tempValue = '';
    if (typeRf.value === DATE_TYPES.YEAR) {
      tempValue = `${selectedDateRt.year || ''}`;
    } else if (typeRf.value === DATE_TYPES.MONTH) {
      if (!selectedDateRt.year || !selectedDateRt.month) {
        tempValue = '';
      } else {
        tempValue = `${selectedDateRt.year}${
          separatorRf.value
        }${getTwoNumberStr(selectedDateRt.month.toString())}`;
      }
    } else {
      if (
        !selectedDateRt.year ||
        !selectedDateRt.month ||
        !selectedDateRt.date
      ) {
        tempValue = '';
      } else {
        tempValue = `${selectedDateRt.year}${
          separatorRf.value
        }${getTwoNumberStr(selectedDateRt.month)}${
          separatorRf.value
        }${getTwoNumberStr(selectedDateRt.date)}`;
      }
    }
    return tempValue;
  });

  function resetInput() {
    inputD.value.ref.value = inputValueCp.value;
  }

  function setCrtSelectedVal(val: string) {
    const time = new Date(val.split(separatorRf.value).join('-'));
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();

    const isDisabled = getIsDisabled(rangeRf.value, year, month, date);

    if (val === '') {
      return setSelectedValue({});
    }

    if (
      !getIsInputValValid(val, typeRf.value, separatorRf.value) ||
      isDisabled
    ) {
      return;
    }

    const temp = {
      year: year,
      month: month + 1,
      date: date
    };
    setSelectedValue(temp);
  }

  function handleClear() {
    hidePopper();
    setSelectedValue({});
    emit(EMITS.CLEAR, selectedDateRt);
  }

  function handleEnter(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    setCrtSelectedVal(val);
    hidePopper();
    emit(EMITS.ENTER, selectedDateRt);
    nextTick(() => resetInput());
  }

  function handleEsc() {
    hidePopper();
  }

  function handleBlur() {
    emit(EMITS.BLUR, selectedDateRt);
    nextTick(() => resetInput());
  }

  return {
    inputValueCp,
    handleClear,
    handleEnter,
    handleEsc,
    handleBlur
  };
}
