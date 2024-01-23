<template>
  <li
    @click.stop="handleClickOption(value, label, $event)"
    :class="[
      `${CLS_PRE}-option`,
      {
        active: isActiveCp,
        disabled: disabled,
      },
    ]"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>{{ label }}</template>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  reactive,
  onBeforeUnmount,
  toRef,
  onBeforeMount
} from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

import { PROVIDE_KEY as SINGLE_KEY } from '@/component/select/src/component/selectSingle/config';
import { PROVIDE_KEY as Multiple_KEY } from '@/component/select/src/component/selectMultiple/config';

import { ProvideValType as MultipleProvideValType } from '@/component/select/src/component/selectMultiple/type';
import { ProvideValType as SingleProvideValType } from '@/component/select/src/component/selectSingle/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const injectOps =
      inject<MultipleProvideValType>(Multiple_KEY, undefined) || inject<SingleProvideValType>(SINGLE_KEY, undefined);

    const isActiveCp = computed(() => {
      if (Array.isArray(injectOps.modelValue)) {
        return injectOps.modelValue.includes(props.value);
      } else {
        return injectOps.modelValue === props.value;
      }
    });
    const registerOps = reactive({
      value: toRef(props, 'value'),
      label: toRef(props, 'label'),
      isActive: isActiveCp
    });

    function handleClickOption() {
      if (props.disabled) {
        return;
      }

      injectOps.triggerClick(registerOps);
    }

    onBeforeMount(() => {
      injectOps.register(registerOps);
    });

    onBeforeUnmount(() => {
      injectOps.deleteItem && injectOps.deleteItem(registerOps);
    });

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      isActiveCp,
      handleClickOption
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
