<template>
  <div
    ref="referenceD"
    :class="[`${CLS_PRE}-date-picker`]"
    :style="{ width: width }"
    v-click-outside="handleClickOutside"
  >
    <!--input组件-->
    <v-input
      ref="inputD"
      :readonly="!editable"
      :modelValue="inputValueCp"
      :placeholder="placeholder"
      :width="width"
      :height="height"
      :clearable="clearable"
      @clear="handleClear"
      @blur="handleBlur"
      @keydown.enter="handleEnter"
      @keydown.esc="handleEsc"
    >
      <template #front>
        <i
          :class="[`iconfont`, `icon-v-date`, `${CLS_PRE}-date-picker-front`]"
        ></i>
      </template>
      <template #behind>
        <i
          :class="[`iconfont`, `icon-v-down`, `arrow`, { up: isShowPopperRf }]"
        ></i>
      </template>
    </v-input>

    <div ref="popperD">
      <component
        v-if="type === 'year'"
        :is="'year-picker'"
        :range="range"
        :selectedDate="selectedDateRt"
        @select="handleSelect"
      ></component>
      <component
        v-if="type === 'month'"
        :is="'month-picker'"
        :range="range"
        :selectedDate="selectedDateRt"
        @select="handleSelect"
      ></component>
      <component
        v-if="type === 'date'"
        :is="'date-picker'"
        :range="range"
        :selectedDate="selectedDateRt"
        @select="handleSelect"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';

import vInput from '@/component/input/src/index.vue';
import datePicker from './component/datePicker/index.vue';
import monthPicker from './component/monthpicker/index.vue';
import yearPicker from './component/yearpicker/index.vue';

import clickOutside from '@/directive/clickoutside/index';
import { usePopper } from '@/hook/usePopper';
import { useSelectedData } from '@/component/datepicker/src/hook/useSelectedData';
import { useInput } from '@/component/datepicker/src/hook/useInput';
import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

import { InstanceType } from '@/component/input/src/type';
import { NoSelectedType, SelectedDateType, SelectedMonthType, SelectedYearType } from '@/component/datepicker/src/type';

export default defineComponent({
  name: COMP_NAME,

  directives: {
    clickOutside: clickOutside
  },

  components: {
    vInput: vInput,
    datePicker: datePicker,
    monthPicker: monthPicker,
    yearPicker: yearPicker
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const inputD = ref<InstanceType>(null);

    const { referenceD, popperD, showPopper, hidePopper, isShowPopperRf } =
      usePopper();

    const { selectedDateRt, setSelectedValue } = useSelectedData(
      toRef(props, 'defaultTime'),
      toRef(props, 'range'),
      toRef(props, 'type')
    );

    const { inputValueCp, handleClear, handleEnter, handleEsc, handleBlur } =
      useInput(
        toRef(props, 'type'),
        toRef(props, 'separator'),
        toRef(props, 'editable'),
        toRef(props, 'range'),
        inputD,
        selectedDateRt,
        hidePopper,
        setSelectedValue
      );

    function handleClickOutside(sign: boolean) {
      if (sign) {
        hidePopper();
      } else {
        showPopper();
      }
    }

    // 用户选中时间
    function handleSelect(value: SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType) {
      hidePopper();
      setSelectedValue(value);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      referenceD,
      popperD,
      inputD,
      isShowPopperRf,
      inputValueCp,
      handleClickOutside,
      handleClear,
      handleEnter,
      handleEsc,
      handleBlur,
      handleSelect,
      selectedDateRt
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
