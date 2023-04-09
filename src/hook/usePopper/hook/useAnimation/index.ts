import { getDom } from '@/hook/usePopper/util/index';
import { Component, onMounted, Ref } from 'vue';

export function useAnimation(popperD: Ref<HTMLElement | Component>) {
  let popperDom: HTMLElement;
  let transition_duration = 0;

  function addAniCls() {
    popperDom.style.opacity = '0';
    popperDom.style.transitionProperty = 'opacity';
    popperDom.style.transitionDuration = `${transition_duration}ms`;
  }

  function showOpaAni() {
    popperDom.style.opacity = '1';
  }

  async function closeOpaAni() {
    return new Promise((resolve) => {
      popperDom.style.opacity = '0';

      setTimeout(() => {
        resolve(undefined);
      }, transition_duration);
    });
  }

  onMounted(() => {
    let transition_str = '';
    popperDom = getDom(popperD);
    transition_str = getComputedStyle(popperDom).transitionDuration;
    if (transition_str && parseFloat(transition_str) > 0) {
      transition_duration = parseFloat(transition_str.split('s')[0]) * 1000;
    }
  });

  return {
    addAniCls,
    showOpaAni,
    closeOpaAni
  };
}
