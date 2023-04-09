<template>
  <div :class="[`${CLS_PRE}-collapse-item`]">
    <div :class="[`title`, { disabled: disabled }]" @click="handleToggle">
      <template v-if="$slots.title">
        <div :class="[`title-content`]">
          <slot name="title"></slot>
        </div>
      </template>
      <template v-else>
        <div :class="[`title-content`]">{{ title }}</div>
      </template>
      <i
        v-if="showDirection"
        :class="[
          `iconfont`,
          `icon-v-down`,
          `arrow`,
          {
            up: isShowContentCp,
          },
        ]"
      ></i>
    </div>
    <div :class="[`content`]" :style="{ height: heightCp }">
      <div :class="[`words`]" ref="wordsD">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue';

import { COMP_NAME, CLS_PRE, PROPS_DES } from './config';
import { PROVIDE_KEY } from '@/component/collapse/src/config';
import { ProvideValType } from '@/component/collapse/src/type';

export default defineComponent({
  name: COMP_NAME,

  props: PROPS_DES,

  setup(props, { expose }) {
    const injectOps = inject<ProvideValType>(PROVIDE_KEY);

    const wordsD = ref<HTMLElement>();

    const isShowContentCp = computed(() => {
      if (injectOps.accordion) {
        return injectOps.modelValue === props.value;
      } else {
        return (injectOps.modelValue as unknown[]).includes(props.value);
      }
    });

    const heightCp = computed(() => {
      const element = wordsD.value;
      return isShowContentCp.value
        ? `${element && element.getBoundingClientRect().height}px`
        : '0px';
    });

    function handleToggle() {
      if (props.disabled) {
        return;
      }

      injectOps.changeActive(props.value);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      wordsD,
      handleToggle,
      isShowContentCp,
      heightCp
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
