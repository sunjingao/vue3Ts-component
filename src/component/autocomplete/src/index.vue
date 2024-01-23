<template>
  <div
    :class="[`${CLS_PRE}-autocomplete`]"
    v-click-outside="handleClickOutside"
  >
    <v-input
      ref="referenceD"
      v-bind="$attrs"
      v-model="inputValueCp"
      @focus="handleFocus"
      @keydown.up.prevent="handleMove(MOVE_TYPE.UP)"
      @keydown.down.prevent="handleMove(MOVE_TYPE.DOWN)"
      @keydown.enter="handleEnter"
      @keydown.esc="handleEsc"
    >
      <template #front>
        <slot name="front"></slot>
      </template>
      <template #behind>
        <slot name="behind"></slot>
        <i :class="[`iconfont`, `icon-v-down`, { up: isShowPopperRf }]"></i>
      </template>
    </v-input>
    <div
      ref="popperD"
      :class="[`${CLS_PRE}-popper`, `${CLS_PRE}-hover-show-scrollbar`]"
      :style="{ lineHeight: itemHeight }"
    >
      <!--存在插槽时渲染-->
      <template v-if="$slots.default">
        <div
          v-for="(item, index) in options"
          :key="index"
          :class="[
            `${CLS_PRE}-popper-item`,
            { active: activeIndexRf === index },
          ]"
          @click="handleClickOpn(item)"
        >
          <slot :item="item"></slot>
        </div>
      </template>
      <!--不存在插槽时渲染-->
      <template v-else>
        <div
          v-for="(item, index) in options"
          :key="index"
          :class="[
            `${CLS_PRE}-popper-item`,
            { active: activeIndexRf === index },
          ]"
          @click="handleClickOpn(item)"
          v-html="item.label"
        ></div>
      </template>

      <div :class="[`${CLS_PRE}-popper-arrow`]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import clickOutside from '@/directive/clickoutside/index';
import { useMove } from './hook/useMove/index';
import { defineComponent, ref, computed, Ref } from 'vue';
import { usePopper } from '@/hook/usePopper';
import { InstanceType } from '@/component/input/src/type';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  MOVE_TYPE
} from './config';
import { ItemType } from './type';

export default defineComponent({
  name: COMP_NAME,

  inheritAttrs: false,

  directives: {
    clickOutside: clickOutside
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const activeIndexRf = ref(-1);

    const { referenceD, popperD, isShowPopperRf, showPopper, hidePopper } =
      usePopper();

    const { handleMove } = useMove(popperD as Ref<HTMLElement>, props.options, activeIndexRf);

    const inputValueCp = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit(EMITS.UPDATE_MODEL_VALUE, val);
        emit(EMITS.INPUT, val);
        showTips();
      }
    });

    function showTips() {
      if (isShowPopperRf.value) {
        return;
      }
      showPopper();
      (popperD as Ref<HTMLElement>).value.scrollTop = 0;
    }

    function closeTips() {
      if (!isShowPopperRf.value) {
        return;
      }
      hidePopper();
      activeIndexRf.value = -1;
      referenceD.value && (referenceD as Ref<InstanceType>).value.blur();
    }

    function confirmItem(item: ItemType) {
      emit(EMITS.UPDATE_MODEL_VALUE, item.label);
      emit(EMITS.CHANGE, { ...item });
      closeTips();
    }

    function handleClickOutside(sign: boolean) {
      if (!sign) {
        return;
      }
      closeTips();
    }

    function handleFocus() {
      emit(EMITS.FOCUS, inputValueCp.value);
      showTips();
    }

    function handleClickOpn(item: ItemType) {
      confirmItem(item);
    }

    function handleEnter() {
      if (activeIndexRf.value === -1) {
        return;
      }
      confirmItem(props.options[activeIndexRf.value]);
    }

    function handleEsc() {
      closeTips();
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      MOVE_TYPE,
      activeIndexRf,
      referenceD,
      popperD,
      isShowPopperRf,
      inputValueCp,
      handleMove,
      handleEnter,
      handleEsc,
      handleClickOpn,
      handleClickOutside,
      handleFocus
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
