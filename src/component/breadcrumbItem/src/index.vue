<template>
  <div :class="[`${CLS_PRE}-breadcrumb-item`, { 'show-href': isShowHrefCp }]">
    <div @click="handleJump">
      <slot></slot>
    </div>
    <span :class="[`separator`]">{{ separator }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

import { PROVIDE_KEY } from '@/component/breadcrumb/src/config';
import { ProvideValType } from '@/component/breadcrumb/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const injectOps = inject<ProvideValType>(PROVIDE_KEY);
    const isShowHrefCp = computed(() => {
      return !!props.to;
    });

    function handleJump() {
      props.to && (window.location.href = String(props.to));
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      separator: injectOps.separator,
      isShowHrefCp,
      handleJump
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
