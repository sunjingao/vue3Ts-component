<template>
  <div :class="[`${CLS_PRE}-cascader`]" v-click-outside="handleClickOutside">
    <v-input
      ref="referenceD"
      readonly
      :placeholder="placeholder"
      :modelValue="inputValueCp"
      :width="width"
      :height="height"
      :clearable="clearable"
      :title="inputValueCp"
      @clear="handleClear"
    >
      <template #behind>
        <span
          v-show="!clearable || (clearable && !inputValueCp)"
          :class="[`select-direction`]"
        >
          <i :class="['iconfont', 'icon-v-down', { up: isShowPopperRf }]"></i>
        </span>
      </template>
    </v-input>

    <div :class="[`${CLS_PRE}-popper`]" ref="popperD">
      <div :class="[`${CLS_PRE}-popper-content`]">
        <auto
          ref="autoD"
          :modelValue="modelValue"
          :options="options"
          :itemWidth="itemWidth"
          :popperMaxHeight="popperMaxHeight"
          :itemHeight="itemHeight"
          :hoverTrigger="hoverTrigger"
          @mouseEnter="handleMouseEnter"
          @select="handleSelect"
        >
          <template #default="{ item }" v-if="$slots.default">
            <slot :item="item"></slot>
          </template>
        </auto>
        <div :class="[`${CLS_PRE}-popper-arrow`]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';

import clickOutside from '@/directive/clickoutside/index';
import { usePopper } from '@/hook/usePopper';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

import auto from './component/auto/index.vue';

import { OptionItemType, InputItemType } from './type';
import { InstanceType } from './component/auto/type';

export default defineComponent({
  name: COMP_NAME,

  directives: {
    clickOutside: clickOutside
  },

  components: {
    auto
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const {
      referenceD,
      popperD,
      showPopper,
      hidePopper,
      updatePopper,
      isShowPopperRf
    } = usePopper();

    const autoD = ref<InstanceType>();

    const inputValueCp = computed(() => {
      if (
        !autoD.value ||
        !autoD.value.selectedArrCp ||
        autoD.value.selectedArrCp.length === 0
      ) {
        return '';
      }

      if (props.showAllLevels) {
        return autoD.value.selectedArrCp
          .map((item: InputItemType) => item.label)
          .join(props.separator);
      } else {
        return autoD.value.selectedArrCp[autoD.value.selectedArrCp.length - 1]
          .label;
      }
    });

    function emitSelected(val: OptionItemType[]) {
      const res = val.map((item) => item.value);
      emit(EMITS.UPDATE_MODEL_VALUE, res);
      emit(EMITS.SELECT, res);
    }

    function handleMouseEnter() {
      nextTick(() => updatePopper());
    }

    function handleSelect(val: OptionItemType[]) {
      emitSelected(val);
      setTimeout(() => {
        hidePopper();
      });
    }

    function handleClickOutside(sign: boolean) {
      sign ? hidePopper() : showPopper();
    }

    function handleClear(event: MouseEvent) {
      emit(EMITS.CLEAR, event);
      autoD.value.clear();
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      referenceD,
      popperD,
      autoD,
      isShowPopperRf,
      inputValueCp,
      handleClickOutside,
      handleSelect,
      handleMouseEnter,
      handleClear
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
