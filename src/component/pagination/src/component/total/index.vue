<template>
  <span :class="[`${CLS_PRE}-total`]">共{{ total }}条</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { COMP_NAME, CLS_PRE, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,
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
