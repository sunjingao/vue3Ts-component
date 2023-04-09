<template>
  <v-select
    v-model="modelValue"
    @change="handleChangeVal"
    width="70px"
    height="30px"
    :class="[`${CLS_PRE}-sizes`]"
  >
    <v-option
      v-for="(item, key) in optionsArrCp"
      :key="key"
      :label="item.label"
      :disabled="item.disabled"
      :value="item.value"
    >
    </v-option>
  </v-select>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import vSelect from '@/component/select/src/index.vue';
import vOption from '@/component/option/src/index.vue';

import { CLS_PRE, COMP_NAME, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,
  components: {
    vSelect,
    vOption
  },
  emits: EMITS_DEC,
  props: PROPS_DES,
  setup(props, { emit, expose }) {
    const modelValue = ref(0);

    const optionsArrCp = computed(() => {
      return (
        (props.selectArr && [...props.selectArr]) || [
          { value: 10, label: 10 },
          { value: 20, label: 20 },
          { value: 30, label: 30 }
        ]
      );
    });

    function handleChangeVal(val: number) {
      emit(EMITS.SELECT_CHANGE, val);
    }

    watch(
      () => props.pageSize,
      (val) => {
        modelValue.value = val;
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
      modelValue,
      optionsArrCp,
      handleChangeVal
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
