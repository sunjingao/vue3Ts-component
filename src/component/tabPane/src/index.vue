<template>
  <div v-show="isActiveCp" :class="[`${CLS_PRE}-tab-pane`]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  onBeforeMount,
  onBeforeUnmount,
  toRef,
  computed
} from 'vue';

import { COMP_NAME, CLS_PRE, EMITS_DEC, PROPS_DES } from './config';

import { PROVIDE_KEY } from '@/component/tabs/src/config';
import { ProvideValType } from '@/component/tabs/src/type';

export default defineComponent({
  name: COMP_NAME,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {
    const injectOps = inject<ProvideValType>(PROVIDE_KEY);
    const isActiveCp = computed(() => props.value === injectOps.modelValue);

    const registerOps = reactive({
      value: undefined as string,
      label: undefined as string,
      disabled: false,
      isActiveCp: false
    });

    function registerCur() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      registerOps.value = toRef(props, 'value') as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      registerOps.label = toRef(props, 'label') as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      registerOps.disabled = toRef(props, 'disabled') as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      registerOps.isActiveCp = isActiveCp as any;

      injectOps.register(registerOps);
    }

    onBeforeMount(() => {
      registerCur();
    });

    onBeforeUnmount(() => {
      injectOps.destroyItem(registerOps);
    });

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      isActiveCp
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
