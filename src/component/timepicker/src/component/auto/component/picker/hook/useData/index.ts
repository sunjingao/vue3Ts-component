import { computed, Ref } from 'vue';
import { START_TIME } from '@/component/timepicker/src/component/auto/component/picker/config';
import { getTwoNumberStr } from '@/util/string';
import { RangeType, TimeType } from '@/component/timepicker/src/type';
import { PickEmptyPointType, PickContentType } from '@/component/timepicker/src/component/auto/component/picker/type';

const EMPTY_POINT: PickEmptyPointType = {
  value: null,
  isDisabled: true,
  isSelected: false
};

export function useData(modelValueRf: Ref<TimeType>, rangeRf: Ref<RangeType>) {
  const currentTimeCp = computed(() => {
    return {
      hour: modelValueRf.value.hour || START_TIME.HOUR,
      minute: modelValueRf.value.minute || START_TIME.MINUTE,
      second: modelValueRf.value.second || START_TIME.SECOND
    };
  });

  const contentCp = computed(() => {
    const contentTime: PickContentType = {
      hour: [],
      minute: [],
      second: []
    };

    for (const hMsTag of Object.keys(currentTimeCp.value)) {
      const maxIndex = hMsTag === 'hour' ? 24 : 60;

      const timeArr = [];

      // 时间段的开头和结尾的展示都有两个空
      timeArr.unshift(EMPTY_POINT, EMPTY_POINT);

      for (let index = 0; index < maxIndex; index++) {
        timeArr.push({
          value: getTwoNumberStr(index),
          isDisabled: getIsDisabled(hMsTag as keyof TimeType, index),
          isSelected: getIsSelected(hMsTag as keyof TimeType, index)
        });
      }

      // 时间段的开头和结尾的展示都有两个空
      timeArr.push(EMPTY_POINT, EMPTY_POINT);

      contentTime[hMsTag as keyof TimeType] = timeArr;
    }

    return contentTime;
  });

  function getIsDisabled(hMsTag: keyof TimeType, index: number) {
    if (!rangeRf.value || Object.keys(rangeRf.value).length <= 0) {
      return false;
    }

    return !rangeRf.value[hMsTag].some((x) => {
      if (!x.start) {
        return index <= x.end;
      } else if (!x.end) {
        return index >= x.start;
      }
      return index >= x.start && index <= x.end;
    });
  }

  function getIsSelected(hMsTag: keyof TimeType, index: number | string) {
    return parseFloat(String(currentTimeCp.value[hMsTag])) === parseFloat(String(index));
  }

  return {
    contentCp
  };
}
