import { computed, getCurrentInstance, Ref, ref, watch } from 'vue';
import { EMITS } from '@/component/tree/src/config';
import { NodeItemType, SelectedOpsType } from '@/component/tree/src/type';

export function useSelected(selectedOpsRf: Ref<SelectedOpsType>) {
  const { emit } = getCurrentInstance();

  // 选中节点key值数组
  const selectedKeyRf = ref('');

  const isParentSelectedCp = computed(() => {
    return selectedOpsRf.value && selectedOpsRf.value.parentSelected;
  });

  watch(
    () => selectedOpsRf.value,
    () => {
      selectedKeyRf.value = selectedOpsRf.value.defaultSelectedKeys;
    },
    {
      immediate: true,
      deep: true
    }
  );

  function changeSelect(item: NodeItemType) {
    selectedKeyRf.value = item.key;
    emit(EMITS.SELECT, item);
  }

  return {
    selectedKeyRf,
    isParentSelectedCp,
    changeSelect
  };
}
