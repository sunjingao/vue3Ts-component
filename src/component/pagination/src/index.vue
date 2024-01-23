<template>
  <div :class="[`${CLS_PRE}-pagination`]">
    <pager
      v-show="layoutArrRf.includes('pager')"
      :style="{ order: layoutArrRf.indexOf('pager') }"
      v-model="inputValueRf"
      :total="pagerTotalRf"
      :isButton="isButton"
      @pageChange="handlePageChange"
    ></pager>
    <jumper
      v-show="layoutArrRf.includes('jumper')"
      :style="{ order: layoutArrRf.indexOf('jumper') }"
      :modelValue="inputValueRf"
      :total="total"
      @update:modelValue="handleChangeCurPage"
    ></jumper>
    <sizes
      v-show="layoutArrRf.includes('sizes')"
      :selectArr="selectArr"
      :pageSize="pageSize"
      :style="{ order: layoutArrRf.indexOf('sizes') }"
      @selectChange="handleSelectChange"
    ></sizes>
    <total
      v-show="layoutArrRf.includes('total')"
      :total="total"
      :style="{ order: layoutArrRf.indexOf('total') }"
    ></total>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

import jumper from './component/jumper/index.vue';
import pager from './component/pager/index.vue';
import sizes from './component/sizes/index.vue';
import total from './component/total/index.vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  components: { jumper, pager, sizes, total },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const inputValueRf = ref(0);
    const pagerTotalRf = ref(0);

    const layoutArrRf = computed(() => {
      return props.layout ? [...props.layout] : ['pager'];
    });

    function initInputValue() {
      inputValueRf.value = 1;
    }

    function setPagerTotalRf(val: number) {
      if (props.total <= 0) {
        pagerTotalRf.value = 0;
      } else {
        pagerTotalRf.value = Math.ceil(props.total / val);
      }
    }

    function handlePageChange(val: number) {
      emit(EMITS.PAGE_CHANGE, val);
    }

    function handleChangeCurPage(val: number) {
      inputValueRf.value = val;
      emit(EMITS.PAGE_CHANGE, val);
    }

    function handleSelectChange(val: number) {
      if (val === props.pageSize) {
        return;
      }

      initInputValue();
      setPagerTotalRf(val);
      emit(EMITS.SELECT_CHANGE, val);
    }

    watch(
      () => props.total,
      () => {
        initInputValue();
        setPagerTotalRf(props.pageSize);
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
      layoutArrRf,
      pagerTotalRf,
      inputValueRf,
      handlePageChange,
      handleChangeCurPage,
      handleSelectChange
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
