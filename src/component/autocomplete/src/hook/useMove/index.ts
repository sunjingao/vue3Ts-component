import { nextTick, Ref } from 'vue';
import { MOVE_TYPE } from '@/component/autocomplete/src/config';
import { ItemType, MoveTypeType } from '../../type';

export function useMove(popperContentRef: Ref<HTMLElement>, tipsData: ItemType[], activeIndexRef: Ref<number>) {
  // 处理按键事件
  function handleMove(type: MoveTypeType) {
    handlerActive(type);
    handlerPlace();
  }

  // 处理选中元素
  function handlerActive(type: MoveTypeType) {
    if (activeIndexRef.value < 0) {
      return (activeIndexRef.value = 0);
    }
    if (type === MOVE_TYPE.UP && activeIndexRef.value !== 0) {
      activeIndexRef.value -= 1;
    } else if (
      type === MOVE_TYPE.DOWN &&
      activeIndexRef.value !== tipsData.length - 1
    ) {
      activeIndexRef.value += 1;
    }
  }

  // 让活动元素在正确的位置展示
  function handlerPlace() {
    nextTick(() => {
      const popper = popperContentRef.value;
      const activeEle = popper.querySelector('.active');
      if (!activeEle) {
        return;
      }
      const popperClientRect = popper.getBoundingClientRect();
      const activeClientRect = activeEle.getBoundingClientRect();
      const itemHeight = activeClientRect.height;

      if (
        activeClientRect.top >
        popperClientRect.top + popperClientRect.height - itemHeight
      ) {
        popper.scrollTop += itemHeight;
        handlerPlace();
      } else if (activeClientRect.top < popperClientRect.top) {
        popper.scrollTop -= itemHeight;
        handlerPlace();
      }
    });
  }

  return {
    handleMove
  };
}
