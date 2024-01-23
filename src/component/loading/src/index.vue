<template>
  <div
    :class="[`${CLS_PRE}-loading`, loadingClass]"
    :style="{
      top: top,
      left: left,
      width: width,
      height: height,
      opacity: opacity,
      zIndex: zIndex,
    }"
  >
    <div :class="[`content`, contentClass]">
      <component v-if="componentName" :is="componentName"></component>
      <template v-else>
        <i
          v-if="showLoadingIcon"
          :class="[`iconfont`, `icon-v-loading`, `loading-img`]"
        ></i>
        <div :class="[`text`]" v-if="content" v-html="content"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      ...toRefs(props.params)
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
