<template>
  <div :class="[`${CLS_PRE}-image`]" ref="rootD">
    <template v-if="isWaitingRf">
      <template v-if="$slots.alt">
        <div :class="[`alt-part`]">
          <slot name="alt"></slot>
        </div>
      </template>
      <template v-else-if="alt">
        <div :class="[`alt-part`]">{{ alt }}</div>
      </template>
    </template>
    <template v-if="isErrorRf">
      <template v-if="$slots.error">
        <div :class="[`error-part`]">
          <slot name="error"></slot>
        </div>
      </template>
      <template v-else-if="error">
        <div :class="[`error-part`]">{{ error }}</div>
      </template>
    </template>
    <template v-if="isCorrectRf">
      <img ref="imgD" :class="[`img-part`]" :style="{ objectFit: fit }" />
    </template>
  </div>
</template>

<script lang="ts">
import { getStyle } from '@/util/dom';
import { throttle } from '@/util/bom';

import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  nextTick
} from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const isWaitingRf = ref(false); // 加载中
    const isErrorRf = ref(false); // 加载失败
    const isCorrectRf = ref(false); // 加载成功

    const rootD = ref<HTMLElement>();
    const imgD = ref<HTMLElement>();

    let scrollParent: HTMLElement = null; // 滚动监听元素
    let throttleUpdate: AnyCb = null; // 节流更新函数

    function initSigns() {
      isWaitingRf.value = true;
      isErrorRf.value = false;
      isCorrectRf.value = false;
    }

    function startDownLoadImg() {
      if (isWaitingRf.value || isErrorRf.value || isCorrectRf.value) {
        return;
      }

      const element = document.createElement('img');

      element.src = props.src;

      initSigns();

      bindEvents(element);
    }

    function setScrollParent() {
      if (!props.scrollContainer) {
        const rootElements = [
          document,
          document.documentElement,
          document.body
        ];
        const scrollAttrs = ['auto', 'scroll'];
        let parent = rootD.value.parentNode as HTMLElement;

        while (
          !scrollAttrs.includes(getStyle(parent, 'overflow')) &&
          !rootElements.includes(parent)
        ) {
          parent = parent.parentNode as HTMLElement;
        }

        scrollParent = (rootElements.includes(parent) ? document : parent) as HTMLElement;
      } else if (typeof props.scrollContainer === 'string') {
        scrollParent = document.querySelector(props.scrollContainer);
      } else {
        scrollParent = props.scrollContainer as HTMLElement;
      }
    }

    function handleLoad() {
      isCorrectRf.value = true;
      isWaitingRf.value = false;
      isErrorRf.value = false;

      nextTick(() => imgD.value && imgD.value.setAttribute('src', props.src));
    }

    function handleError() {
      isErrorRf.value = true;
      isWaitingRf.value = false;
      isCorrectRf.value = false;
    }

    function bindEvents(element: HTMLElement) {
      element.onload = handleLoad;
      element.onerror = handleError;
    }

    function bindLazyEvent() {
      scrollParent.addEventListener('scroll', throttleUpdate);
    }

    function removeLazyEvent() {
      scrollParent &&
        scrollParent.removeEventListener &&
        scrollParent.removeEventListener('scroll', throttleUpdate);
    }

    function lazyUpdate() {
      const clientRect = scrollParent.getBoundingClientRect();
      const currentEle = rootD.value.getBoundingClientRect();
      if (currentEle.top - clientRect.bottom <= props.showHeight) {
        startDownLoadImg();
      }
    }

    function setThrottleUpdate() {
      throttleUpdate = throttle(lazyUpdate, props.updateTimer);
    }

    onMounted(() => {
      if (props.lazy) {
        setScrollParent();

        setThrottleUpdate();

        bindLazyEvent();

        throttleUpdate();
      } else {
        startDownLoadImg();
      }
    });

    onBeforeUnmount(() => {
      if (props.lazy) {
        removeLazyEvent();
      }
    });

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      rootD,
      imgD,
      isWaitingRf,
      isErrorRf,
      isCorrectRf
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
