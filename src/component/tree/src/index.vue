<template>
  <div :class="[`${CLS_PRE}-tree`]">
    <div v-if="nodeListRf.length > 0">
      <node
        :showCheckbox="isShowCheckboxCp"
        :nodeList="nodeListRf"
        :parentSelected="isParentSelectedCp"
        :level="1"
      >
        <template v-if="$slots.default" #default="{ item }">
          <slot :item="item"></slot>
        </template>
      </node>
    </div>
    <div v-else class="v-tree-no-data">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRef } from 'vue';
import node from './component/node/index.vue';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY
} from './config';
import { useExpand } from '@/component/tree/src/hook/useExpand';
import { useCheckbox } from '@/component/tree/src/hook/useCheckbox';
import { useSelected } from '@/component/tree/src/hook/useSelected';
import { useNodeList } from '@/component/tree/src/hook/useNodeList';

export default defineComponent({
  name: COMP_NAME,

  components: {
    node: node
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { expose }) {

    const { expandKeysRf, changeExpand, getIsParent } = useExpand(
      toRef(props, 'expandOps'),
      toRef(props, 'nodeList')
    );

    const { selectedKeyRf, isParentSelectedCp, changeSelect } = useSelected(
      toRef(props, 'selectedOps')
    );

    const { checkedKeysRf, isShowCheckboxCp, changeCheck, getIsBaseChild } =
      useCheckbox(toRef(props, 'checkedOps'), toRef(props, 'nodeList'));

    const { nodeListRf } = useNodeList(
      toRef(props, 'nodeList'),
      selectedKeyRf,
      expandKeysRf,
      checkedKeysRf,
      getIsBaseChild,
      getIsParent
    );

    provide(
      PROVIDE_KEY,
      reactive({
        changeCheck: changeCheck,
        changeSelect: changeSelect,
        changeExpand: changeExpand
      })
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      nodeListRf,
      isShowCheckboxCp,
      isParentSelectedCp
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
