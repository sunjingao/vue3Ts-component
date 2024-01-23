<template>
  <div :class="[`${CLS_PRE}-select`]" ref="referenceD">
    <v-input
      v-bind="$attrs"
      :modelValue="selectedObjRt.label"
      v-click-outside="handleClickOutside"
      @clear="handleClear"
      :placeholder="placeholder"
      :clearable="clearable"
      readonly
    >
      <template #behind>
        <span
          v-show="!clearable || (clearable && !modelValue)"
          :class="[`select-direction`]"
        >
          <i :class="[`iconfont`, `icon-v-down`, { up: isShowPopperRf }]"></i>
        </span>
      </template>
    </v-input>

    <div ref="popperD" :class="[`${CLS_PRE}-popper`]">
      <ul
        :class="[
          `${CLS_PRE}-popper-content`,
          `${CLS_PRE}-hover-show-scrollbar`,
        ]"
      >
        <slot></slot>
      </ul>
      <div :class="[`${CLS_PRE}-popper-arrow`]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, Ref, toRef } from 'vue';
import clickOutside from '@/directive/clickoutside/index';
import vInput from '@/component/input/src/index.vue';
import { usePopper } from '@/hook/usePopper';
import { OptionItem } from '@/component/option/src/type';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY
} from './config';
import { SelectObjItemType } from './type';

export default defineComponent({
  name: COMP_NAME,

  inheritAttrs: false,

  directives: {
    clickOutside
  },

  emits: EMITS_DEC,

  components: {
    vInput
  },

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const selectedObjRt = reactive<SelectObjItemType>({
      label: '',
      value: ''
    });

    const { referenceD, popperD, showPopper, hidePopper, isShowPopperRf } =
      usePopper();

    // 存在选中条目时，要让选中条目处于展示的最下方
    function adaptPosition() {
      const scrollContainer = (popperD as Ref<HTMLElement>).value.querySelector(
        `.${CLS_PRE}-popper-content`
      ) as HTMLElement;
      const activeItem = (popperD as Ref<HTMLElement>).value.querySelector('.active') as HTMLElement;
      if (!activeItem) {
        return;
      }
      scrollContainer.scrollTop = activeItem.offsetTop;
    }

    function closeTip() {
      hidePopper();
    }

    function showTip() {
      showPopper();
      adaptPosition();
    }

    function handleClickOutside(sign: boolean) {
      if (sign) {
        closeTip();
      } else {
        showTip();
      }
    }

    function handleClear(event: MouseEvent) {
      emit(EMITS.UPDATE_MODEL_VALUE, '');
      emit(EMITS.CLEAR, event);
      selectedObjRt.label = '';
      selectedObjRt.value = '';
    }

    function triggerClick(obj: OptionItem) {
      emit(EMITS.UPDATE_MODEL_VALUE, obj.value);
      selectedObjRt.value = obj.value;
      selectedObjRt.label = obj.label;
      closeTip();
    }

    function register(obj: OptionItem) {
      if (obj.isActive) {
        selectedObjRt.value = obj.value;
        selectedObjRt.label = obj.label;
      }
    }

    // eslint-disable-next-line
    function deleteItem() {}

    provide(
      PROVIDE_KEY,
      reactive({
        modelValue: toRef(props, 'modelValue'),
        register: register,
        triggerClick: triggerClick,
        deleteItem: deleteItem
      })
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      referenceD,
      popperD,
      isShowPopperRf,
      selectedObjRt,
      handleClickOutside,
      handleClear
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
