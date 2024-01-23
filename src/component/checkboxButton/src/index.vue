<template>
  <span
    :class="[
      `${CLS_PRE}-checkbox-button`,
      {
        disabled: isDisabledCp,
        checked: isCheckedCp,
      },
    ]"
    @click="handleToggle"
  >
    <span :class="[`${CLS_PRE}-checkbox-content`]">
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

import { PROVIDE_KEY } from '@/component/checkboxGroup/src/config';
import { ProvideValType } from '@/component/checkboxGroup/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const injectOps = inject<ProvideValType>(PROVIDE_KEY);

    const isCheckedCp = computed(() =>
      injectOps.modelValue.includes(props.value as number | string)
    );

    const isDisabledCp = computed(() => {
      return props.disabled || injectOps.disabled;
    });

    function handleToggle() {
      if (isDisabledCp.value) {
        return;
      }

      let checkedValueArr = [...injectOps.modelValue];

      if (isCheckedCp.value) {
        checkedValueArr = checkedValueArr.filter((x) => x !== props.value);
      } else {
        checkedValueArr.push(props.value as number | string);
      }

      injectOps.changeMV(checkedValueArr.sort((a, b) => (a as number) - (b as number)));
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      isDisabledCp,
      isCheckedCp,
      handleToggle
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
