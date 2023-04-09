import { Ref } from 'vue';

export function useExpose(textareaRef: Ref<HTMLElement>, modelValueRf: Ref<string>) {
  function clear() {
    modelValueRf.value = '';
    textareaRef.value.querySelector('textarea')?.focus();
  }

  function select() {
    textareaRef.value.querySelector('textarea')?.select();
  }

  function focus() {
    textareaRef.value.querySelector('textarea')?.focus();
  }

  function blur() {
    textareaRef.value.querySelector('textarea')?.blur();
  }

  return {
    clear,
    select,
    focus,
    blur
  };
}
