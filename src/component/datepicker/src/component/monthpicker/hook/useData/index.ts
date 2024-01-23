import {
  DEFAULT_YEAR,
  RELATE_MONTH
} from '@/component/datepicker/src/component/monthpicker/config';
import { getIsDisabled } from '@/component/datepicker/src/util/index';
import { Ref, ref, watch } from 'vue';
import { MonthItemType, MonthRangeItemType } from '@/component/datepicker/src/component/monthpicker/type';
import { SelectedMonthType } from '@/component/datepicker/src/type';

export function useData(rangeRf: Ref<MonthRangeItemType[]>, selectedDateRf: Ref<SelectedMonthType>) {
  const shownYearRf = ref<number>();
  const itemArrRf = ref<MonthItemType[]>([]);

  function getIsSelected(shownYear: number, month: number) {
    return (
      shownYear === selectedDateRf.value.year &&
      month === selectedDateRf.value.month - 1
    );
  }

  // tip赋值
  function setContent() {
    itemArrRf.value = [];

    for (let month = 0; month < 12; month++) {
      itemArrRf.value.push({
        month: month,
        value: RELATE_MONTH[month as keyof typeof RELATE_MONTH],
        isDisabled: getIsDisabled(rangeRf.value, shownYearRf.value, month),
        isSelected: getIsSelected(shownYearRf.value, month)
      });
    }
  }

  function resetSetting() {
    shownYearRf.value = selectedDateRf.value.year || DEFAULT_YEAR;
    setContent();
  }

  watch(
    [() => rangeRf.value, () => selectedDateRf.value],
    () => {
      resetSetting();
    },
    {
      immediate: true,
      deep: true
    }
  );

  return {
    shownYearRf,
    itemArrRf,
    setContent
  };
}
