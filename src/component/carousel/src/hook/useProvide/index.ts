import { ref } from 'vue';

export function useProvide() {
  const regisInfoArrRf = ref<unknown[]>([]);

  function register(val: unknown) {
    regisInfoArrRf.value.push(val);
  }

  return {
    regisInfoArrRf,
    register
  };
}
