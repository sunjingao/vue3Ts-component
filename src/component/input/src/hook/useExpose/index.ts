import { Ref } from 'vue';

export function useExpose(inputD: Ref<HTMLInputElement>) {
  function select() {
    inputD.value.select();
  }

  function focus() {
    inputD.value.focus();
  }

  function blur() {
    inputD.value.blur();
  }

  return {
    select,
    focus,
    blur
  };
}
