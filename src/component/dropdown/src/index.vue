<template>
  <div
    :class="[`${CLS_PRE}-dropdown`]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    v-click-outside="handleClickOutside"
  >
    <div ref="referenceD" @click="handleRefClick" :class="[`reference`]">
      <v-button-group v-if="splitButton">
        <v-button v-bind="$attrs" @click.stop>
          <slot></slot>
        </v-button>
        <v-button v-bind="$attrs" :class="[`split-right-button`]">
          <i
            :class="[
              `iconfont`,
              `icon-v-down`,
              `arrow`,
              { up: isShowPopperRf },
            ]"
          ></i>
        </v-button>
      </v-button-group>
      <template v-else>
        <slot></slot>
        <i
          :class="[`iconfont`, `icon-v-down`, `arrow`, { up: isShowPopperRf }]"
        ></i>
      </template>
    </div>
    <div ref="popperD" :class="[`${CLS_PRE}-popper`]">
      <slot name="dropdown" :class="[`${CLS_PRE}-popper-content`]"></slot>
      <div :class="[`${CLS_PRE}-popper-arrow`]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import vButtonGroup from '@/component/buttonGroup/src/index.vue';
import vButton from '@/component/button/src/index.vue';
import clickOutside from '@/directive/clickoutside/index';
import { usePopper } from '@/hook/usePopper';
import { provide, reactive, defineComponent } from 'vue';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY
} from './config';

export default defineComponent({
  name: COMP_NAME,

  inheritAttrs: false,

  components: {
    vButtonGroup,
    vButton
  },

  directives: {
    clickOutside
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const hideTimeout = 200;
    let hideTimer: number = null; // 因为下拉框和展示部分之间有一段距离，需要用延时来实现下拉框不隐藏的效果

    const { referenceD, popperD, showPopper, hidePopper, isShowPopperRf } =
      usePopper(props.placement);

    function closeTips() {
      hidePopper();
    }

    function openTips() {
      showPopper();
    }

    function toggleTips() {
      if (isShowPopperRf.value) {
        closeTips();
      } else {
        openTips();
      }
    }

    function handleClickOutside(sign: boolean) {
      if (!sign || props.hoverTrigger || !props.hideOnClick) {
        return;
      }
      closeTips();
    }

    function handleRefClick() {
      if (props.hoverTrigger) {
        return;
      }

      if (props.hideOnClick) {
        toggleTips();
      } else {
        openTips();
      }
    }

    function handleMouseEnter() {
      if (!props.hoverTrigger) {
        return;
      }

      clearTimeout(hideTimer);

      openTips();
    }

    function handleMouseLeave() {
      if (!props.hoverTrigger) {
        return;
      }

      hideTimer = setTimeout(() => {
        closeTips();
      }, hideTimeout);
    }

    // dropdown-item触发了点击事件
    function changeOption(val: unknown, event: MouseEvent) {
      emit(EMITS.COMMAND, val, event);

      if (props.hideOnClick) {
        closeTips();
      }
    }

    provide(
      PROVIDE_KEY,
      reactive({
        changeOption: changeOption
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
      handleMouseEnter,
      handleMouseLeave,
      handleClickOutside,
      handleRefClick
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
