<template>
  <v-input
    v-model="inputValRf"
    :class="[`${CLS_PRE}-jumper`]"
    width="70px"
    height="30px"
    type="number"
    :min="1"
    :max="total"
    numberRequired
    numberInt
    @blur="handleChangeVal"
    @enter="handleChangeVal"
  ></v-input>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,
  emits: EMITS_DEC,
  props: PROPS_DES,
  setup(props, { emit, expose }) {
    const inputValRf = ref(0);

    function handleChangeVal() {
      if (props.modelValue === inputValRf.value) {
        return;
      }
      emit(EMITS.UPDATE_MODEL_VALUE, inputValRf.value);
    }

    watch(
      () => props.modelValue,
      (val) => {
        inputValRf.value = val;
      },
      {
        immediate: true
      }
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      inputValRf,
      handleChangeVal
    };
  }
});
</script>
<style lang="scss" src="./css/index.scss" scoped></style>
