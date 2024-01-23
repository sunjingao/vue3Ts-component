import { getDomByType } from '@/component/timepicker/src/util';
import { ComputedRef, Ref, ref } from 'vue';
import { TimeType } from '@/component/timepicker/src/type';
import { PickContentType } from '@/component/timepicker/src/component/auto/component/picker/type';

export function useScroll(contentCp: ComputedRef<PickContentType>, itemHeightRf: Ref<number>) {
  let timer: number = null;

  const hourD = ref(null);
  const minuteD = ref(null);
  const secondD = ref(null);

  function scrollByTypeAIndex(type: keyof TimeType, itemIndex: number) {
    const element = getDomByType(type, hourD, minuteD, secondD);
    element.scrollTop = (itemIndex - 2) * itemHeightRf.value;
  }

  function scrollToSelected() {
    for (const [type, item] of Object.entries(contentCp.value)) {
      const selectedIndex = item.findIndex((item) => item.isSelected);
      if (selectedIndex !== -1) {
        scrollByTypeAIndex(type as keyof PickContentType, selectedIndex);
      }
    }
  }

  function handleScroll(type: keyof PickContentType) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const element = getDomByType(type, hourD, minuteD, secondD);
      const scrollTop = element.scrollTop;
      const isNeedScroll =
        Math.abs(itemHeightRf.value - (scrollTop % itemHeightRf.value)) > 1;
      if (isNeedScroll) {
        const scrollTopItemNums =
          Math.round(scrollTop / itemHeightRf.value) + 2;
        scrollByTypeAIndex(type, scrollTopItemNums);
      }
    }, 100);
  }

  return {
    hourD,
    minuteD,
    secondD,
    scrollByTypeAIndex,
    scrollToSelected,
    handleScroll
  };
}
