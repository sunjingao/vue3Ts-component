<template>
  <span
    v-show="isShowRf"
    :class="[`${CLS_PRE}-tag`, type]"
    :style="{
      width: width,
      height: height,
      lineHeight: height,
    }"
  >
    <slot></slot>
    <i
      v-if="closeable"
      :class="[`iconfont`, `icon-v-delete`, `delete`]"
      @click.stop="handleClose"
    ></i>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const isShowRf = ref(true);

    function handleClose(event: Event) {
      hide();
      emit(EMITS.CLOSE, event);
    }

    function show() {
      isShowRf.value = true;
    }

    function hide() {
      isShowRf.value = false;
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
      show,
      hide
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      isShowRf,
      handleClose
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
