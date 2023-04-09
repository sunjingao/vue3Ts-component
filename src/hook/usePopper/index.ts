import { Component, onMounted, onUnmounted, Ref, ref } from 'vue';
import { getDom } from './util/index';
import { useAnimation } from '@/hook/usePopper/hook/useAnimation';

export function usePopper(placement = 'bottom-start') {
  let popperHandler: Window['Popper']; // popper组件实例化后的句柄
  const referenceD = ref<HTMLElement | Component>() as Ref<HTMLElement | Component>;
  const popperD = ref<HTMLElement | Component>() as Ref<HTMLElement | Component>;

  const isShowPopperRf = ref(true);

  const { addAniCls, showOpaAni, closeOpaAni } = useAnimation(popperD);

  function createPopper() {
    // 三种情况 dom，ref dom， ref 组件
    const refDom = getDom(referenceD);
    const popperDom = getDom(popperD);

    popperHandler = new window.Popper(refDom, popperDom, {
      updateImmediately: false,
      placement: placement,
      modifiers: {
        // 设置输入框和弹层之间的距离
        offset: {
          offset: [0, 10]
        }
      }
    });
  }

  function initHidePopper() {
    popperHandler.hide();
    isShowPopperRf.value = false;
  }

  onMounted(() => {
    createPopper();

    initHidePopper();

    addAniCls();
  });

  onUnmounted(() => {
    popperHandler.destroy();
  });

  function updatePopper() {
    popperHandler.update();
  }

  function showPopper() {
    if (isShowPopperRf.value) {
      return;
    }

    popperHandler.show();
    isShowPopperRf.value = true;

    showOpaAni();
  }

  async function hidePopper() {
    if (!isShowPopperRf.value) {
      return;
    }

    await closeOpaAni();

    popperHandler.hide();
    isShowPopperRf.value = false;
  }

  return {
    referenceD,
    popperD,
    isShowPopperRf,
    updatePopper,
    showPopper,
    hidePopper
  };
}
