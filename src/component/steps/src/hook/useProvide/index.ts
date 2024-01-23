import { ref, computed } from 'vue';

export function useProvide() {
  const regisInfoArrRf = ref([]);

  function register(val: unknown) {
    regisInfoArrRf.value.push(val);
  }

  function getCurIndexCp(val: unknown) {
    return computed(() => regisInfoArrRf.value.indexOf(val));
  }

  function getIsLastCp(val: unknown) {
    return computed(
      () =>
        regisInfoArrRf.value.indexOf(val) === regisInfoArrRf.value.length - 1
    );
  }

  function destroyItem(val: unknown) {
    const index = regisInfoArrRf.value.indexOf(val);
    regisInfoArrRf.value.splice(index, 1);
  }

  return {
    register,
    getCurIndexCp,
    getIsLastCp,
    destroyItem
  };
}
