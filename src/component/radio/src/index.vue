<template>
  <span
    :class="[
      `${CLS_PRE}-radio`,
      {
        border: isBorderCp,
        disabled: isDisabledCp,
        checked: isCheckedCp,
      },
    ]"
    @click="handleToggle"
  >
    <i :class="[`${CLS_PRE}-radio-icon`]"></i>
    <span :class="[`${CLS_PRE}-radio-content`]">
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';
import { PROVIDE_KEY } from '@/component/radioGroup/src/config';
import { ProvideValType } from '@/component/radioGroup/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const injectOps = inject<ProvideValType | undefined>(PROVIDE_KEY, undefined);

    const isSingle = !injectOps;

    const isCheckedCp = computed(() => {
      if (isSingle) {
        return props.modelValue === props.value;
      } else {
        return injectOps.modelValue === props.value;
      }
    });

    const isBorderCp = computed(() => {
      return props.border || (!isSingle && injectOps.border) || false;
    });

    const isDisabledCp = computed(() => {
      return props.disabled || (!isSingle && injectOps.disabled) || false;
    });

    function handleToggle() {
      if (isDisabledCp.value) {
        return;
      }

      if (
        (isSingle && props.modelValue === props.value) ||
        (!isSingle && injectOps.modelValue === props.value)
      ) {
        return;
      }

      if (isSingle) {
        emit(EMITS.CHANGE, props.value);
      } else {
        injectOps.changeMV(props.value);
      }
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      isCheckedCp,
      isBorderCp,
      isDisabledCp,
      handleToggle
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
