<template>
  <span
    :class="[
      `${CLS_PRE}-checkbox`,
      {
        border: isBorderCp,
        disabled: isDisabledCp,
        checked: isCheckedCp,
        'not-all': isIndeterminate,
      },
    ]"
    @click="handleToggle"
  >
    <i :class="[`${CLS_PRE}-checkbox-icon`]"></i>
    <span :class="[`${CLS_PRE}-checkbox-content`]">
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

import { PROVIDE_KEY } from '@/component/checkboxGroup/src/config';
import { ProvideValType } from '@/component/checkboxGroup/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const injectOps = inject<ProvideValType | undefined>(PROVIDE_KEY, undefined);

    const isSingle = !injectOps;

    const isCheckedCp = computed(() => {
      if (isSingle) {
        if (props.isIndeterminate) {
          return false;
        } else {
          return props.modelValue === true;
        }
      } else {
        const checkedValue = injectOps.modelValue;
        return checkedValue.includes(props.value as number | string);
      }
    });

    const isBorderCp = computed(() => {
      return isSingle ? props.border : injectOps.border;
    });

    const isDisabledCp = computed(() => {
      return isSingle ? props.disabled : props.disabled || injectOps.disabled;
    });

    function handleToggle() {
      if (isDisabledCp.value) {
        return;
      } else if (props.isIndeterminate) {
        emit(EMITS.PART_CHECK_CHANGE);
        return;
      }

      if (isSingle) {
        emit(EMITS.UPDATE_MODEL_VALUE, !props.modelValue);
        emit(EMITS.CHANGE, !props.modelValue);
      } else {
        let checkedArr = [...injectOps.modelValue];

        if (isCheckedCp.value) {
          checkedArr = checkedArr.filter((x) => x !== props.value);
        } else {
          checkedArr.push(props.value as number | string);
        }

        // injectOps.changeMV(checkedArr.sort((a, b) => (a as number) - (b as number)));
        injectOps.changeMV(checkedArr.sort((a, b) => (a as number) - (b as number)));
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
      isDisabledCp,
      isBorderCp,
      handleToggle
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
