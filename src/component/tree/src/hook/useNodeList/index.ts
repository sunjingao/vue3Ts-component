import { computed, Ref, ref, watch } from 'vue';
import { CHECK_TYPES } from '@/component/tree/src/config';
import deepClone from '@/asset/js/deepClone';
import { InnerNodeType, NodeItemType } from '@/component/tree/src/type';

export function useNodeList(
  nodeListPropsRf: Ref<NodeItemType[]>,
  selectedKeyRf: Ref<string>,
  expandKeysRf: Ref<string[]>,
  checkedKeysRf: Ref<string[]>,
  getIsBaseChild: (node: NodeItemType) => boolean,
  getIsParent: (item: NodeItemType) => boolean
) {
  // 展示节点数据
  const nodeListRf = ref([]);

  function getCheckedCp(node: InnerNodeType) {
    return computed(() => {
      if (getIsBaseChild(node)) {
        return checkedKeysRf.value.includes(node.key)
          ? CHECK_TYPES.ALL
          : CHECK_TYPES.NONE;
      } else {
        const nodeList = node.nodeList;
        const res = nodeList.map((item) => item.checkType);
        if (res.every((item) => item === CHECK_TYPES.NONE)) {
          return CHECK_TYPES.NONE;
        }
        if (res.every((item) => item === CHECK_TYPES.ALL)) {
          return CHECK_TYPES.ALL;
        }
        return CHECK_TYPES.PART;
      }
    });
  }

  function setNodeValue(node: InnerNodeType, parentNode: NodeItemType) {
    node.key = node.key || ''; // 每个node的key
    node.label = node.label || ''; // 每个node显示的值
    node.nodeList = node.nodeList || null; // 子节点列表
    node.disabled = node.disabled || false; // 禁止选中
    node.selected = computed(() => selectedKeyRf.value === node.key); // 是否被选中
    node.checkType = getCheckedCp(node); // 多选框是否默认选中
    node.expandNode = computed(() => expandKeysRf.value.includes(node.key)); // 是否展开子节点
    node.parentNode = parentNode; // 父节点指针
    node.isParent = getIsParent(node); // 是否有子元素，有则显示展开或搜索图标
  }

  function setNodeList(nodeList: InnerNodeType[], parentNode: InnerNodeType = null) {
    if (!nodeList || nodeList.length === 0) {
      return '';
    }

    nodeList.forEach((x) => {
      setNodeValue(x as InnerNodeType, parentNode);

      setNodeList(x.nodeList, x);
    });
  }

  function resetNodeList() {
    if (!nodeListPropsRf.value || nodeListPropsRf.value.length === 0) {
      nodeListRf.value = [];
    } else {
      nodeListRf.value = deepClone(nodeListPropsRf.value);
      setNodeList(nodeListRf.value);
    }
  }

  watch(
    () => nodeListPropsRf.value,
    () => {
      resetNodeList();
    },
    {
      immediate: true,
      deep: true
    }
  );

  return {
    nodeListRf
  };
}
