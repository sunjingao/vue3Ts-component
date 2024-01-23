<template>
  <div :class="[`${CLS_PRE}-collapse`]">
    <slot></slot>
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

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    function changeActive(activeName: string) {
      let openItems;
      if (props.accordion) {
        emit(EMITS.UPDATE_MODEL_VALUE, (openItems = activeName));
      } else {
        openItems = [...(props.modelValue || [])];

        if (openItems.includes(activeName)) {
          openItems.splice(openItems.indexOf(activeName), 1);
        } else {
          openItems.push(activeName);
        }

        emit(EMITS.UPDATE_MODEL_VALUE, openItems);
      }

      emit(EMITS.CHANGE, openItems);
    }

    provide(
      PROVIDE_KEY,
      reactive({
        modelValue: toRef(props, 'modelValue'),
        accordion: toRef(props, 'accordion'),
        changeActive: changeActive
      })
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
