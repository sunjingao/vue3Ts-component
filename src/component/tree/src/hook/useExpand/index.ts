import { getCurrentInstance, Ref, ref, watch } from 'vue';
import { EMITS } from '@/component/tree/src/config';
import { ExpandOpsType, NodeItemType } from '@/component/tree/src/type';

export function useExpand(expandOpsRf: Ref<ExpandOpsType>, nodeListRf: Ref<NodeItemType[]>) {
  const { emit } = getCurrentInstance();

  // 展开节点key值数组
  const expandKeysRf = ref([]);

  function getIsParent(item: NodeItemType) {
    return item.nodeList && item.nodeList.length >= 0;
  }

  function addAllExpandNode(nodeList: NodeItemType[]) {
    nodeList.forEach((item) => {
      if (getIsParent(item)) {
        expandKeysRf.value.push(item.key);
        addAllExpandNode(item.nodeList);
      }
    });
  }

  function resetExpandNode() {
    if (expandOpsRf.value.expandAll) {
      expandKeysRf.value = [];
      return addAllExpandNode(nodeListRf.value);
    }

    if (
      expandOpsRf.value.defaultExpandedKeys &&
      expandOpsRf.value.defaultExpandedKeys.length > 0
    ) {
      return (expandKeysRf.value = [...expandOpsRf.value.defaultExpandedKeys]);
    }
  }

  watch(
    () => expandOpsRf.value,
    () => {
      resetExpandNode();
    },
    {
      deep: true,
      immediate: true
    }
  );

  function changeExpand(item: NodeItemType) {
    if (expandKeysRf.value.includes(item.key)) {
      const index = expandKeysRf.value.indexOf(item.key);
      expandKeysRf.value.splice(index, 1);
    } else {
      expandKeysRf.value.push(item.key);
    }

    emit(EMITS.EXPAND, item, expandKeysRf);
  }

  return {
    expandKeysRf,
    changeExpand,
    getIsParent
  };
}
