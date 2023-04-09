<template>
  <div :class="[`${CLS_PRE}-panel`]">
    <tip
      v-for="(item, index) in shownArrCp"
      :key="index"
      :item="item"
      :index="index"
      :itemWidth="itemWidth"
      :popperMaxHeight="popperMaxHeight"
      :itemHeight="itemHeight"
      :hoverTrigger="hoverTrigger"
      :style="{
        marginLeft: (index > 0 ? -1 : 0) + 'px',
      }"
      @mouseEnter="handleMouseEnter"
      @select="handleSelect"
    >
      <template #default="{ item }" v-if="$slots.default">
        <slot :item="item"></slot>
      </template>
    </tip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

import tip from './component/tip/index.vue';
import { useData } from '@/component/cascader/src/component/auto/hook/useData';

import { AutoItemType } from './type';

export default defineComponent({
  name: COMP_NAME,

  components: {
    tip
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const { selectedArrRf, shownArrRf, shownArrCp } = useData(
      toRef(props, 'modelValue'),
      toRef(props, 'options')
    );

    function emitSelected() {
      emit(EMITS.SELECT, selectedArrRf.value);
    }

    function handleMouseEnter(item: AutoItemType, arrIndex: number) {
      shownArrRf.value.splice(arrIndex, shownArrRf.value.length, item);
      emit(EMITS.MOUSE_ENTER);
    }

    function handleSelect(item: AutoItemType) {
      selectedArrRf.value = [...shownArrRf.value, item];
      emitSelected();
    }

    function clear() {
      selectedArrRf.value = [];
      shownArrRf.value = [];
      emit(EMITS.SELECT, []);
    }

    // 禁止外部修改
    const selectedArrCp = computed(() => selectedArrRf.value);

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
      clear,
      selectedArrCp
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      shownArrCp,
      handleMouseEnter,
      handleSelect
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
