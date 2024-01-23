<template>
  <div :class="[`${CLS_PRE}-steps`]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRef } from 'vue';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY
} from './config';

import { useProvide } from './hook/useProvide/index';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,
  setup(props, { expose }) {
    const { register, getCurIndexCp, getIsLastCp, destroyItem } = useProvide();

    provide(
      PROVIDE_KEY,
      reactive({
        alignCenter: toRef(props, 'alignCenter'),
        space: toRef(props, 'space'),
        active: toRef(props, 'active'),
        error: toRef(props, 'error'),
        simple: toRef(props, 'simple'),
        register: register,
        getCurIndexCp: getCurIndexCp,
        getIsLastCp: getIsLastCp,
        destroyItem: destroyItem
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
