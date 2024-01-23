<template>
  <div
    :class="[`${CLS_PRE}-timepicker`]"
    v-click-outside="handleClickOutside"
    :style="{ width: inputWidthCp, height: height }"
  >
    <v-input
      :readonly="!editable"
      ref="referenceD"
      :modelValue="inputValueCp"
      :width="inputWidthCp"
      :height="height"
      :clearable="clearable"
      :placeholder="placeholder"
      @keydown.up.prevent
      @keydown.down.prevent
      @clear="handleClear"
      @keydown.tab="handleTab"
      @keydown.enter="handleEnter"
      @keydown.esc="handleEsc"
    >
      <template #front>
        <span
          :class="[`iconfont`, `icon-v-time`, `${CLS_PRE}-timepicker-front`]"
        ></span>
      </template>
      <template #behind>
        <i
          :class="[`iconfont`, `icon-v-down`, `arrow`, { up: isShowPopperRf }]"
        ></i>
      </template>
    </v-input>

    <!--自动提示组件-->
    <auto
      ref="popperD"
      :showEndTime="showEndTime"
      :itemHeight="itemHeight"
      :itemWidth="itemWidth"
      :startTime="startTimeCp"
      :endTime="endTimeCp"
      :startRange="startRange"
      :endRange="endRange"
      :isShowPopper="isShowPopperRf"
      @close="handleClose"
      @complete="handleComplete"
    ></auto>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, toRef } from 'vue';
import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';
import clickOutside from '@/directive/clickoutside/index';
import auto from './component/auto/index.vue';
import { usePopper } from '@/hook/usePopper';
import { useData } from '@/component/timepicker/src/hook/useData';
import { useInput } from '@/component/timepicker/src/hook/useInput';
import { InstanceType as AutoType, AutoEmitType } from '@/component/timepicker/src/component/auto/type';
import { InstanceType as InputType } from '@/component/input/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  directives: {
    clickOutside: clickOutside
  },

  components: {
    auto: auto
  },

  props: PROPS_DES,

  setup(props, { expose }) {
    const { referenceD, popperD, isShowPopperRf, showPopper, hidePopper } =
      usePopper();

    const {
      startTimeCp,
      endTimeCp,
      setData,
      clearData,
      setValidData,
      inputValueCp,
      inputWidthCp
    } = useData(
      toRef(props, 'startDefaultTime'),
      toRef(props, 'endDefaultTime'),
      toRef(props, 'startRange'),
      toRef(props, 'endRange'),
      toRef(props, 'showEndTime'),
      toRef(props, 'separator'),
      toRef(props, 'width'),
      popperD as Ref<AutoType>
    );

    const {
      handleEnter,
      handleEsc,
      handleClear,
      handleTab,
      handleClickOutside
    } = useInput(
      toRef(props, 'separator'),
      toRef(props, 'showEndTime'),
      referenceD as Ref<InputType>,
      popperD as Ref<AutoType>,
      isShowPopperRf,
      inputValueCp,
      showPopper,
      hidePopper,
      clearData,
      setData,
      setValidData
    );

    function handleClose() {
      hidePopper();
    }

    function handleComplete(obj: AutoEmitType) {
      setData(obj.startTime, obj.endTime);

      hidePopper();
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
      isShowPopperRf,
      startTimeCp,
      endTimeCp,
      inputWidthCp,
      inputValueCp,
      handleClickOutside,
      handleEnter,
      handleEsc,
      handleClear,
      handleTab,
      handleClose,
      handleComplete
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
