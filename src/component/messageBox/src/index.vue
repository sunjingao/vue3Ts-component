<template>
  <div
    v-show="isShowRf"
    :class="[`${CLS_PRE}-message-box`]"
    :style="{ zIndex: zIndexRf }"
  >
    <div :class="[`title-part`]">
      <div :class="[`title-content`]" v-html="title"></div>
      <div :class="[`close-icon`, `${CLS_PRE}-no-select`]" @click="handleClose">
        ×
      </div>
    </div>
    <div :class="[`content-part`]">
      <template v-if="content">
        <div :class="[`text`]" v-html="content"></div>
      </template>
      <v-input
        v-if="type === 'prompt'"
        ref="inputD"
        v-model="inputValueCp"
        :class="[`mt5`, 'aaa']"
        width="100%"
      ></v-input>
    </div>
    <div :class="[`button-part`]">
      <v-button v-if="type !== 'message'" @click="handleCancel">{{
        cancelButtonText
      }}</v-button>
      <v-button :class="[`ml10`]" type="primary" @click="handleConfirm">{{
        confirmButtonText
      }}</v-button>
    </div>
  </div>
</template>

<script lang="ts">
import Loading from '@/component/loading/src/service';

import { defineComponent, nextTick, ref } from 'vue';
import vInput from '@/component/input/src/index.vue';
import vButton from '@/component/button/src/index.vue';

import { InstanceType } from '@/component/input/src/type';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  components: {
    vInput,
    vButton
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const inputValueCp = ref('');
    const isShowRf = ref(false);
    const zIndexRf = ref(0);
    const inputD = ref<InstanceType>(null);
    const loadingIns = Loading({
      target: document.body,
      showLoadingIcon: false
    });

    function hide() {
      isShowRf.value = false;

      loadingIns.close();
    }

    function show() {
      isShowRf.value = true;
      zIndexRf.value = window.Popper.addZIndex();
      nextTick(() => {
        inputD.value && inputD.value.focus();
      });
      loadingIns.open();
    }

    function handleClose() {
      if (props.closeCallBack(inputValueCp.value || '')) {
        hide();
      }
    }

    function handleCancel() {
      if (props.cancelCallBack(inputValueCp.value || '')) {
        hide();
      }
    }

    function handleConfirm() {
      if (props.confirmCallBack(inputValueCp.value)) {
        hide();
      }
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
      inputD,
      isShowRf,
      zIndexRf,
      handleClose,
      inputValueCp,
      handleCancel,
      handleConfirm
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
