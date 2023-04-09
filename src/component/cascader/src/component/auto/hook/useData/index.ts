import { computed, Ref, ref, watch } from 'vue';
import { ModelValueItemType, OptionItemType, InputItemType } from '@/component/cascader/src/type';
import { AutoItemType } from '../../type';

export function useData(modelValueRf: Ref<ModelValueItemType[]>, optionsRf: Ref<OptionItemType[]>) {
  const selectedArrRf = ref<InputItemType[]>([]);

  const shownArrRf = ref<InputItemType[]>([]);

  const shownArrCp = computed(() => {
    if (shownArrRf.value.length === 0) {
      if (!optionsRf.value || optionsRf.value.length === 0) {
        return [];
      } else {
        return [optionsRf.value.map((item) => getNodeByTipIndex(item, 0))];
      }
    }
    const retArr = [];
    let lastArr: OptionItemType[] = [];

    for (let index = 0; index <= shownArrRf.value.length; index++) {
      if (index === 0) {
        lastArr = optionsRf.value;
      } else {
        lastArr = lastArr.find((item) => {
          return (
            item.value ===
            (shownArrRf.value[index - 1] && shownArrRf.value[index - 1].value)
          );
        }).children;
      }

      retArr.push(lastArr.map((item) => getNodeByTipIndex(item, index)));
    }
    return retArr;
  });

  function getEmptyTipNode() {
    return {
      value: '',
      label: '',
      disabled: false,
      selected: false,
      over: false,
      hasChildren: false
    } as AutoItemType;
  }

  function getModelNode(item: OptionItemType): InputItemType {
    return {
      value: item.value,
      label: item.label,
      disabled: item.disabled
    };
  }

  function getNodeByTipIndex(item: OptionItemType, index: number) {
    const selected =
      item.value ===
      (selectedArrRf.value[index] && selectedArrRf.value[index].value);
    const over =
      item.value === (shownArrRf.value[index] && shownArrRf.value[index].value);
    const disabled = item.disabled || false;
    const hasChildren = (item.children && item.children.length > 0) || false;

    const node = getEmptyTipNode();
    node.value = item.value;
    node.label = item.label;
    node.selected = selected;
    node.over = over;
    node.disabled = disabled;
    node.hasChildren = hasChildren;

    return node;
  }

  function resetValue() {
    if (!modelValueRf.value || modelValueRf.value.length === 0) {
      selectedArrRf.value = [];
      return;
    }

    const tempArr: InputItemType[] = [];

    let lastChild = optionsRf.value;
    for (let index = 0; index < modelValueRf.value.length; index++) {
      const item = lastChild.find(
        (item) => item.value === modelValueRf.value[index]
      );

      tempArr.push(getModelNode(item));

      lastChild = item.children;
    }

    selectedArrRf.value = tempArr;
    shownArrRf.value = tempArr.slice(0, -1);
  }

  watch(
    () => modelValueRf.value,
    () => {
      resetValue();
    },
    {
      immediate: true,
      deep: true
    }
  );

  return {
    selectedArrRf,
    shownArrRf,
    shownArrCp
  };
}
