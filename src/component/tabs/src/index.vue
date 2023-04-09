<template>
  <div :class="[`${CLS_PRE}-tabs`, position]">
    <div :class="['title', position, type]">
      <template v-for="item in regisInfoArrRf">
        <div
          v-if="item.isShow"
          :key="item.value"
          @mouseenter="handleMouseenter(item)"
          @mouseleave="handleMouseleave(item)"
          @click="handleSelect(item, $event)"
          :class="[
            'item',
            type,
            { active: item.isActiveCp, disabled: item.disabled },
          ]"
        >
          <div>{{ item.label }}</div>
          <i
            v-show="item.isShowCloseCp"
            :class="[`close`]"
            @click.stop="handleClose(item, $event)"
            >×</i
          >
        </div>
      </template>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRef } from 'vue';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY
} from './config';

import { useProvide } from './hook/useProvide/index';
// import { TabItemType } from '@/component/tabPane/src/type';
import { TabItemType } from './type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const { regisInfoArrRf, register, destroyItem } = useProvide(
      toRef(props, 'modelValue'),
      toRef(props, 'closable')
    );

    function setSelect(item: TabItemType, event: Event) {
      if (props.modelValue === item.value) {
        return;
      }
      emit(EMITS.TAB_CLICK, item.value, item.label, event);
      emit(EMITS.UPDATE_MODEL_VALUE, item.value);
    }

    function setNextSelect(item: TabItemType, event: Event) {
      const selectedIndex = regisInfoArrRf.value.indexOf(item);

      for (
        let index = selectedIndex + 1;
        index < regisInfoArrRf.value.length;
        index++
      ) {
        const instance = regisInfoArrRf.value[index];
        if (!instance.disabled && instance.isShow) {
          setSelect(instance, event);
          return;
        }
      }

      for (let index = selectedIndex - 1; index >= 0; index--) {
        const instance = regisInfoArrRf.value[index];
        if (!instance.disabled && instance.isShow) {
          setSelect(instance, event);
          return;
        }
      }
    }

    function handleClose(item: TabItemType, event: Event) {
      item.isShow = false;

      emit(EMITS.CLOSE, item.value, item.label, event);

      setNextSelect(item, event);
    }

    function handleMouseenter(item: TabItemType) {
      if (item.disabled) {
        return;
      }
      item.isHoverRf = true;
    }

    function handleMouseleave(item: TabItemType) {
      if (item.disabled) {
        return;
      }
      item.isHoverRf = false;
    }

    function handleSelect(item: TabItemType, event: Event) {
      if (item.disabled) {
        return;
      }
      setSelect(item, event);
    }

    provide(
      PROVIDE_KEY,
      reactive({
        register: register,
        destroyItem: destroyItem,
        modelValue: toRef(props, 'modelValue')
      })
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      regisInfoArrRf,
      handleMouseenter,
      handleMouseleave,
      handleSelect,
      handleClose
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
