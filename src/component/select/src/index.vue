<template>
  <div
    :class="[`${CLS_PRE}-dib`, classCp]"
    :style="{
      ...styleCp,
    }"
  >
    <component
      v-if="multiple"
      :is="'selectMultiple'"
      v-bind="$attrs"
      @update:modelValue="handleChangeMV"
    >
      <slot></slot>
    </component>
    <component
      v-else
      :is="'selectSingle'"
      v-bind="$attrs"
      @update:modelValue="handleChangeMV"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script lang="ts">
import selectSingle from './component/selectSingle/index.vue';
import selectMultiple from './component/selectMultiple/index.vue';
import { computed, defineComponent } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  inheritAttrs: false,

  components: {
    selectSingle,
    selectMultiple
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const classCp = computed(() =>
      Array.isArray(props.class) ? props.class : [props.class]
    );
    const styleCp = computed(() => props.style);

    function handleChangeMV(value: string) {
      emit(EMITS.UPDATE_MODEL_VALUE, value);
      emit(EMITS.CHANGE, value);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      classCp,
      styleCp,
      handleChangeMV
    };
  }
});
</script>
