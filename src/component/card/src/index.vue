<template>
  <div :class="[`${CLS_PRE}-card`]">
    <template v-if="$slots.header">
      <div :class="[`header`]" :style="headerStyle">
        <slot name="header"></slot>
      </div>
    </template>
    <template v-if="$slots.default">
      <div :class="[`content`]" :style="contentStyle">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(_, { expose }) {

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
