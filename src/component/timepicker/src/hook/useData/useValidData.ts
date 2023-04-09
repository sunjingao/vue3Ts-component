import { reactive } from 'vue';
import { TimeType } from '@/component/timepicker/src/type';

export function useValidData(startTimeRt: TimeType, endTimeRt: TimeType) {
  const validStartTimeRt = reactive<TimeType>({
    hour: '',
    minute: '',
    second: ''
  });

  const validEndTimeRt = reactive<TimeType>({
    hour: '',
    minute: '',
    second: ''
  });

  function saveLastValidData() {
    validStartTimeRt.hour = startTimeRt.hour;
    validStartTimeRt.minute = startTimeRt.minute;
    validStartTimeRt.second = startTimeRt.second;

    validEndTimeRt.hour = endTimeRt.hour;
    validEndTimeRt.minute = endTimeRt.minute;
    validEndTimeRt.second = endTimeRt.second;
  }

  function getValidData() {
    return {
      validStartTimeRt,
      validEndTimeRt
    };
  }

  return {
    saveLastValidData,
    getValidData
  };
}
