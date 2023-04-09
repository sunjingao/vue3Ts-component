<template>
  <a
    :href="hrefCp"
    :class="[
      `${CLS_PRE}-link`,
      type,
      {
        [`disabled`]: disabled,
        [`underline`]: underline,
      },
    ]"
    @click="handleClick"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const hrefCp = computed(() => {
      return !props.disabled && props.href ? props.href : 'javascript:void(0);';
    });

    function handleClick(event: MouseEvent) {
      if (props.disabled) {
        return;
      }

      emit(EMITS.CLICK, event);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      hrefCp,
      handleClick
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
