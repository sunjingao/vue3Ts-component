import { Ref } from 'vue';
import { TimeType } from '@/component/timepicker/src/type';

export function getDom(domD: Ref<HTMLElement> | Ref<HTMLElement[]>) {
  return Array.isArray(domD.value) ? domD.value[0] : domD.value;
}

export function getDomByType(
  type: keyof TimeType,
  hourD: Ref<HTMLElement>,
  minuteD: Ref<HTMLElement>,
  secondD: Ref<HTMLElement>
) {
  let domD = null;
  if (type === 'hour') {
    domD = hourD;
  } else if (type === 'minute') {
    domD = minuteD;
  } else {
    domD = secondD;
  }
  return getDom(domD);
}
