<template>
  <div
    v-show="isShowRf"
    :class="[`${CLS_PRE}-dialog`]"
    :style="{ zIndex: zIndexRf, width: width }"
  >
    <template v-if="$slots.title">
      <div @close-cb="handleClose">
        <slot name="title"></slot>
      </div>
    </template>
    <template v-else>
      <div :class="[`title-part`]">
        <div
          :class="[`title-content`]"
          :style="{ textAlign: center ? 'center' : 'left' }"
          v-html="title"
        ></div>
        <div
          v-if="showClose"
          :class="[`close-icon`, `${CLS_PRE}-no-select`]"
          @click="handleClose"
        >
          ×
        </div>
      </div>
    </template>

    <div :class="[`content-part`]">
      <slot v-if="$slots.default"></slot>
    </div>

    <template v-if="$slots.footer">
      <div
        :class="[`button-part`]"
        :style="{ justifyContent: center ? 'center' : 'flex-end' }"
      >
        <slot name="footer"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Loading from '@/component/loading/src/service';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const zIndexRf = ref('0');
    const isShowRf = ref(false);
    const loadingIns = Loading({
      target: document.body,
      showLoadingIcon: false
    });

    function hide() {
      if (!isShowRf.value) {
        return;
      }

      emit(EMITS.UPDATE_MODEL_VALUE, false);

      isShowRf.value = false;

      loadingIns.close();
    }

    function show() {
      if (isShowRf.value) {
        return;
      }

      emit(EMITS.UPDATE_MODEL_VALUE, true);

      loadingIns.open();

      zIndexRf.value = window.Popper.addZIndex();
      isShowRf.value = true;
    }

    function handleClose() {
      if (props.closeCallBack()) {
        hide();
      }
    }

    watch(
      () => props.modelValue,
      function (val) {
        val ? show() : hide();
      },
      {
        immediate: true
      }
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      isShowRf,
      zIndexRf,
      handleClose
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
