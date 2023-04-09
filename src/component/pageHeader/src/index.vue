<template>
  <div :class="[`${CLS_PRE}-page-header`]">
    <div :class="[`title-part`]" @click="handleBack">
      <div v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <div v-else>
        <span :class="[`iconfont`, `icon-go-left`]"></span>
        <span :class="[`title`]">{{ title }}</span>
      </div>
    </div>
    <span :class="[`separate-part`]">|</span>
    <div :class="[`content-part`]">
      <div v-if="$slots.content">
        <slot name="content"></slot>
      </div>
      <div v-else>
        <span>{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';
import { defineComponent } from 'vue';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(_, { emit, expose }) {
    function handleBack() {
      emit(EMITS.BACK);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      handleBack
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
