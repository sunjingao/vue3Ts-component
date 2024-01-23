import { computed, getCurrentInstance, reactive, Ref, watch } from 'vue';
import { getTwoNumberStr } from '@/util/string';
import { EMITS, TIME_SEPARATOR } from '@/component/timepicker/src/config';
import { useValidData } from './useValidData';
import { RangeType, TimeType } from '@/component/timepicker/src/type';
import { InstanceType } from '@/component/timepicker/src/component/auto/type';

export function useData(
  startDefaultTimeRf: Ref<TimeType>,
  endDefaultTimeRf: Ref<TimeType>,
  startRangeRf: Ref<RangeType>,
  endRangeRf: Ref<RangeType>,
  showEndTimeRf: Ref<boolean>,
  separatorRf: Ref<string>,
  widthRf: Ref<string>,
  tipD: Ref<InstanceType>
) {
  const { emit } = getCurrentInstance();

  const startTimeRt = reactive<TimeType>({
    hour: '',
    minute: '',
    second: ''
  });

  const endTimeRt = reactive<TimeType>({
    hour: '',
    minute: '',
    second: ''
  });

  const { saveLastValidData, getValidData } = useValidData(
    startTimeRt,
    endTimeRt
  );

  const inputValueCp = computed(() => {
    const inputShowTimeArr = [];

    if (Object.values(startTimeRt).every((item) => item !== '')) {
      inputShowTimeArr.push(
        getTwoNumberStr(startTimeRt.hour) +
          separatorRf.value +
          getTwoNumberStr(startTimeRt.minute) +
          separatorRf.value +
          getTwoNumberStr(startTimeRt.second)
      );
    } else {
      inputShowTimeArr.push('');
    }

    if (showEndTimeRf.value) {
      if (Object.values(endTimeRt).every((item) => item !== '')) {
        inputShowTimeArr.push(
          getTwoNumberStr(endTimeRt.hour) +
            separatorRf.value +
            getTwoNumberStr(endTimeRt.minute) +
            separatorRf.value +
            getTwoNumberStr(endTimeRt.second)
        );
      } else {
        inputShowTimeArr.push('');
      }
    }

    return inputShowTimeArr.join(TIME_SEPARATOR);
  });

  const inputWidthCp = computed(() =>
    widthRf.value ? widthRf.value : showEndTimeRf.value ? '200px' : '180px'
  );

  function getIsSelectedDataValid() {
    function getIsClearStatus() {
      const isStartTimeClear = Object.values(startTimeRt).every(
        (val) => !val
      );
      const isEndTimeClear = Object.values(endTimeRt).every(
        (val) => !val
      );
      if (!showEndTimeRf.value) {
        return isStartTimeClear;
      } else {
        return isEndTimeClear && isEndTimeClear;
      }
    }

    return getIsClearStatus() || !tipD.value.getIsSelectedDisabled();
  }

  function emitSelect() {
    emit(EMITS.SELECT, startTimeRt, showEndTimeRf.value ? endTimeRt : '');
  }

  function setDataDirect(startTime: TimeType, endTime: TimeType) {
    startTimeRt.hour = startTime && startTime.hour;
    startTimeRt.minute = startTime && startTime.minute;
    startTimeRt.second = startTime && startTime.second;

    endTimeRt.hour = endTime && endTime.hour;
    endTimeRt.minute = endTime && endTime.minute;
    endTimeRt.second = endTime && endTime.second;
  }

  function setData(startTime: TimeType, endTime: TimeType) {
    if (!showEndTimeRf.value) {
      if (
        startTime.hour === startTimeRt.hour &&
        startTime.minute === startTimeRt.minute &&
        startTime.second === startTimeRt.second
      ) {
        return;
      }
    } else {
      if (
        startTime.hour === startTimeRt.hour &&
        startTime.minute === startTimeRt.minute &&
        startTime.second === startTimeRt.second &&
        endTime.hour === endTimeRt.hour &&
        endTime.minute === endTimeRt.minute &&
        endTime.second === endTimeRt.second
      ) {
        return;
      }
    }

    setDataDirect(startTime, endTime);

    if (getIsSelectedDataValid()) {
      saveLastValidData();
      emitSelect();
    }
  }

  function clearData() {
    const startTimeObj: TimeType = {
      hour: '',
      minute: '',
      second: ''
    };
    const endTimeObj: TimeType = {
      hour: '',
      minute: '',
      second: ''
    };
    emit(EMITS.CLEAR, startTimeObj, endTimeObj);
    setData(startTimeObj, endTimeObj);
  }

  function resetDataDefault() {
    const startTimeObj: TimeType = {
      hour: getTwoNumberStr(
        startDefaultTimeRf.value && startDefaultTimeRf.value.hour,
        ''
      ),
      minute: getTwoNumberStr(
        startDefaultTimeRf.value && startDefaultTimeRf.value.minute,
        ''
      ),
      second: getTwoNumberStr(
        startDefaultTimeRf.value && startDefaultTimeRf.value.second,
        ''
      )
    };
    const endTimeObj: TimeType = {
      hour: getTwoNumberStr(
        endDefaultTimeRf.value && endDefaultTimeRf.value.hour,
        ''
      ),
      minute: getTwoNumberStr(
        endDefaultTimeRf.value && endDefaultTimeRf.value.minute,
        ''
      ),
      second: getTwoNumberStr(
        endDefaultTimeRf.value && endDefaultTimeRf.value.second,
        ''
      )
    };

    setDataDirect(startTimeObj, endTimeObj);

    saveLastValidData();
  }

  watch(
    [
      () => startRangeRf.value,
      () => startDefaultTimeRf.value,
      () => endRangeRf.value,
      () => endDefaultTimeRf.value
    ],
    () => {
      resetDataDefault();
    },
    {
      deep: true,
      immediate: true
    }
  );

  // 禁止直接操作数据
  const startTimeCp = computed(() => {
    return startTimeRt;
  });
  // 禁止直接操作数据
  const endTimeCp = computed(() => {
    return endTimeRt;
  });

  function setValidData() {
    if (getIsSelectedDataValid()) {
      return;
    }

    const { validStartTimeRt, validEndTimeRt } = getValidData();

    setData(validStartTimeRt, validEndTimeRt);
  }

  return {
    startTimeCp,
    endTimeCp,
    inputValueCp,
    inputWidthCp,
    setData,
    clearData,
    setValidData
  };
}
