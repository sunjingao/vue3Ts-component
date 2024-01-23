import { computed, getCurrentInstance, Ref, ref, watch } from 'vue';
import { CHECK_TYPES, EMITS } from '@/component/tree/src/config';
import { CheckedOpsType, InnerNodeType, NodeItemType } from '@/component/tree/src/type';

export function useCheckbox(checkedOpsRf: Ref<CheckedOpsType>, nodeListRf: Ref<NodeItemType[]>) {
  const { emit } = getCurrentInstance();

  // 选中节点key值数组
  const checkedKeysRf = ref([]);

  function getIsBaseChild(node: NodeItemType) {
    return !node.nodeList || node.nodeList.length === 0;
  }

  function changeBaseChildCheck(item: NodeItemType, type: number) {
    if (type === CHECK_TYPES.ALL) {
      if (!checkedKeysRf.value.includes(item.key)) {
        checkedKeysRf.value.push(item.key);
      }
    } else {
      if (checkedKeysRf.value.includes(item.key)) {
        const index = checkedKeysRf.value.indexOf(item.key);
        checkedKeysRf.value.splice(index, 1);
      }
    }
  }

  function setNodeCheckType(node: NodeItemType, type: number) {
    if (getIsBaseChild(node)) {
      changeBaseChildCheck(node, type);
      return;
    }

    node.nodeList.forEach((item) => {
      setNodeCheckType(item, type);
    });
  }

  function setSpecialChildNodes(nodeList: NodeItemType[]) {
    nodeList.forEach((item) => {
      if (checkedOpsRf.value.defaultCheckedKeys.includes(item.key)) {
        setNodeCheckType(item, CHECK_TYPES.ALL);
        return;
      }
      if (!getIsBaseChild(item)) {
        setSpecialChildNodes(item.nodeList);
      }
    });
  }

  function resetCheckKeys() {
    if (checkedOpsRf.value.isShow === false) {
      checkedKeysRf.value = [];
      return;
    }

    if (checkedOpsRf.value.checkedAll) {
      for (const item of Object.values(nodeListRf.value)) {
        setNodeCheckType(item, CHECK_TYPES.ALL);
      }
    }

    if (checkedOpsRf.value.defaultCheckedKeys) {
      setSpecialChildNodes(nodeListRf.value);
    }
  }

  watch(
    () => checkedOpsRf.value,
    () => {
      resetCheckKeys();
    },
    {
      immediate: true,
      deep: true
    }
  );

  const isShowCheckboxCp = computed(() => {
    return checkedOpsRf.value && checkedOpsRf.value.isShow;
  });

  function changeCheck(item: InnerNodeType) {
    let res = -1;
    if (
      item.checkType === CHECK_TYPES.NONE ||
      item.checkType === CHECK_TYPES.PART
    ) {
      res = CHECK_TYPES.ALL;
    } else {
      res = CHECK_TYPES.NONE;
    }

    setNodeCheckType(item, res);

    emit(EMITS.CHECK, item, checkedKeysRf);
  }

  return {
    checkedKeysRf,
    isShowCheckboxCp,
    changeCheck,
    getIsBaseChild
  };
}
