<template>
  <div
    @click="handleToggle"
    :class="[`${CLS_PRE}-switch`, { disabled: disabled }]"
  >
    <div
      v-if="$slots.before"
      :class="[`${CLS_PRE}-switch-before`]"
      :style="{
        color: modelValue ? inactiveFontColor : activeFontColor,
      }"
    >
      <slot name="before"></slot>
    </div>

    <div
      :class="[`${CLS_PRE}-switch-middle`]"
      :style="{
        width: width,
        height: height,
        border: `1px solid ${modelValue ? activeBgColor : inactiveBgColor}`,
        borderRadius: height,
        backgroundColor: modelValue ? activeBgColor : inactiveBgColor,
      }"
    >
      <i
        :class="[`${CLS_PRE}-switch-middle-move-circle`]"
        :style="{
          width: `calc(${height} - 2px)`,
          height: `calc(${height} - 2px)`,
          left: circleLeftCp,
          backgroundColor: circleBgColor,
        }"
      ></i>
    </div>

    <div
      v-if="$slots.behind"
      :class="[`${CLS_PRE}-switch-behind`]"
      :style="{
        color: modelValue ? activeFontColor : inactiveFontColor,
      }"
    >
      <slot name="behind"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const circleLeftCp = computed(() => {
      return props.modelValue
        ? `calc(${props.width} - ${props.height})`
        : '0px';
    });

    function handleToggle() {
      if (props.disabled) {
        return;
      }
      emit(EMITS.UPDATE_MODEL_VALUE, !props.modelValue);
      emit(EMITS.CHANGE, !props.modelValue);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      circleLeftCp,
      handleToggle
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
