<template>
  <div
    :class="[`${CLS_PRE}-tooltip`]"
    ref="referenceD"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div>
      <slot></slot>
    </div>
    <div ref="popperD" :class="[`${CLS_PRE}-popper`, theme]">
      <div :class="[`${CLS_PRE}-popper-content`]">
        <template v-if="$slots.content">
          <slot name="content"></slot>
        </template>
        <template v-else>{{ content }}</template>
      </div>

      <div :class="[`${CLS_PRE}-popper-arrow`]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { usePopper } from '@/hook/usePopper';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const { referenceD, popperD, showPopper, hidePopper } = usePopper(
      props.placement
    );

    function handleMouseenter() {
      if (props.disabled) {
        return;
      }
      showPopper();
    }

    function handleMouseleave() {
      if (props.disabled) {
        return;
      }
      hidePopper();
    }

    watch(
      () => props.disabled,
      (val) => {
        if (val) {
          hidePopper();
        }
      }
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
      showPopper,
      hidePopper
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      referenceD,
      popperD,
      handleMouseenter,
      handleMouseleave
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
