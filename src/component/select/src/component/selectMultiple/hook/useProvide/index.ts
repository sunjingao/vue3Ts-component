import { ref } from 'vue';
import { OptionItem } from '@/component/option/src/type';

export function useProvide() {
  const regisInfoArrRf = ref<OptionItem[]>([]);

  function register(obj: OptionItem) {
    regisInfoArrRf.value.push(obj);
  }

  function deleteItem(ins: OptionItem) {
    const index = regisInfoArrRf.value.indexOf(ins);
    regisInfoArrRf.value.splice(index, 1);
  }
  return {
    regisInfoArrRf,
    register,
    deleteItem
  };
}
