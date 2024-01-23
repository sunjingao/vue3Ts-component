import { Ref, ref, watch } from 'vue';
import { DEFAULT_YEAR } from '@/component/datepicker/src/component/yearpicker/config';
import { getIsDisabled } from '@/component/datepicker/src/util/index';
import { YearItemType, YearRangeItemType } from '@/component/datepicker/src/component/yearpicker/type';
import { SelectedYearType } from '@/component/datepicker/src/type';

export function useData(rangeRf: Ref<YearRangeItemType[]>, selectedDateRf: Ref<SelectedYearType>) {
  const startYearRf = ref<number>();
  const endYearRf = ref<number>();
  const itemArrRf = ref<YearItemType[]>([]);

  function getIsSelected(titleYear: number) {
    return titleYear === selectedDateRf.value.year;
  }

  function setContent() {
    itemArrRf.value = [];

    for (
      let yearIndex = startYearRf.value;
      yearIndex <= endYearRf.value;
      yearIndex++
    ) {
      itemArrRf.value.push({
        value: yearIndex,
        isSelected: getIsSelected(yearIndex),
        isDisabled: getIsDisabled(rangeRf.value, yearIndex)
      });
    }
  }

  function resetSetting() {
    const year = selectedDateRf.value.year || DEFAULT_YEAR;
    startYearRf.value = parseFloat(`${String(year).slice(0, -1)}0`);
    endYearRf.value = parseFloat(`${String(year).slice(0, -1)}9`);

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
    startYearRf,
    endYearRf,
    itemArrRf,
    setContent
  };
}
