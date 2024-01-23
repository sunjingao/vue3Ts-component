<template>
  <button
    :class="[
      `${CLS_PRE}-button`,
      `${CLS_PRE}-${typeCp}-btn`,
      {
        [`${CLS_PRE}-plain`]: plain,
        [`${CLS_PRE}-round`]: round,
        [`${CLS_PRE}-disabled`]: isDisabledCp,
      },
    ]"
    :style="{
      width: widthCp,
      height: heightCp,
    }"
    :disabled="isDisabledCp"
    @click="handleClick"
  >
    <i
      v-if="loading"
      :class="[`iconfont`, `icon-v-loading`, `${CLS_PRE}-loading-icon`]"
    ></i>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';
import { PROVIDE_KEY } from '../../buttonGroup/src/config';
import { ProvideValType } from '../../buttonGroup/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {

    const injectOps = inject<ProvideValType | undefined>(PROVIDE_KEY, undefined);

    const isDisabledCp = computed(() => {
      return props.disabled || props.loading;
    });

    const typeCp = computed(() => {
      return props.type || (injectOps && injectOps.type) || 'default';
    });

    const widthCp = computed(() => {
      return props.width || (injectOps && injectOps.width) || 'auto';
    });

    const heightCp = computed(() => {
      return props.height || (injectOps && injectOps.height) || 'auto';
    });

    function handleClick(event: MouseEvent) {
      if (props.disabled || props.loading) {
        return event.stopPropagation();
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
      isDisabledCp,
      typeCp,
      widthCp,
      heightCp,
      handleClick
    };
  }
});
</script>
<style lang="scss" src="./css/index.scss" scoped></style>
