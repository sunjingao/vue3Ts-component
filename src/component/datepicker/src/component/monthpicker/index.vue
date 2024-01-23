<template>
  <div :class="[`${CLS_PRE}-month-picker`, `${CLS_PRE}-popper`]">
    <div :class="[`${CLS_PRE}-popper-content`]">
      <div :class="[`title`]">
        <div @click="handleYears(OPERATE_NUM.MIN_YEAR)">&lt;&lt;</div>
        <div>{{ shownYearRf }}</div>
        <div @click="handleYears(OPERATE_NUM.ADD_YEAR)">&gt;&gt;</div>
      </div>
      <div :class="[`content`]">
        <div
          v-for="(item, index) in itemArrRf"
          @click.stop="handleConfirm(item)"
          :class="[
            item.isDisabled ? 'disabled' : 'able',
            {
              selected: item.isSelected,
            },
          ]"
          :key="index"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
    <div :class="[`${CLS_PRE}-popper-arrow`]"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';
import { useData } from '@/component/datepicker/src/component/monthpicker/hook/useData';
import { MonthItemType } from '@/component/datepicker/src/component/monthpicker/type';

const OPERATE_NUM = {
  ADD_YEAR: 1,
  MIN_YEAR: -1
};

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const { shownYearRf, itemArrRf, setContent } = useData(
      toRef(props, 'range'),
      toRef(props, 'selectedDate')
    );

    function handleYears(num: number) {
      shownYearRf.value = shownYearRf.value + num;
      setContent();
    }

    function handleConfirm(item: MonthItemType) {
      if (item.isDisabled) {
        return;
      }

      emit(EMITS.SELECT, {
        year: shownYearRf.value,
        month: item.month + 1
      });
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      OPERATE_NUM,
      shownYearRf,
      itemArrRf,
      handleYears,
      handleConfirm
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
