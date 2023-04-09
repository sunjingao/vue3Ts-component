<template>
  <div :class="[`${CLS_PRE}-radio-group`]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRef } from 'vue';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY
} from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    function changeMV(value: unknown) {
      emit(EMITS.UPDATE_MODEL_VALUE, value);
      emit(EMITS.CHANGE, value);
    }

    provide(
      PROVIDE_KEY,
      reactive({
        modelValue: toRef(props, 'modelValue'),
        border: toRef(props, 'border'),
        disabled: toRef(props, 'disabled'),
        changeMV: changeMV
      })
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
