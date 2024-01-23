<template>
  <div
    :class="[
      `${CLS_PRE}-dropdown-item`,
      { disabled: disabled, divided: divided },
    ]"
  >
    <div @click="handleClick">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';
import { PROVIDE_KEY } from '@/component/dropdown/src/config';
import { ProvideValType } from '@/component/dropdown/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const injectOps = inject<ProvideValType>(PROVIDE_KEY);

    function handleClick(event: MouseEvent) {
      if (props.disabled) {
        return;
      }

      injectOps.changeOption(props.command, event);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      handleClick
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
