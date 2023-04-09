import { SettingsType } from './type';
import { throttle } from '@/util/bom';

const addEvents = function (settings: SettingsType) {
  settings.el.addEventListener('scroll', settings.scrollThrottle);
};

const removeEvents = function (settings: SettingsType) {
  settings.el.removeEventListener('scroll', settings.scrollThrottle);
};

function scroll(settings: SettingsType) {
  return function () {
    if (settings.isCancel) {
      return;
    }
    const height = settings.el.clientHeight + settings.el.scrollTop + settings.distance;
    if (height >= settings.el.scrollHeight) {
      settings.isCancel = true;
      removeEvents.bind(settings);
      settings.callBack(() => {
        settings.isCancel = false;
        addEvents(settings);
      });
    }
  };
}

export default {
  name: 'infinite-scroll',

  mounted: function (el: HTMLElement, binding: { value: AnyCb }) {
    const settings = {
      el: el,
      isCancel: false,
      delay: parseFloat(el.getAttribute('infinite-scroll-delay')) || 500, // 默认延时
      disabled: el.getAttribute('infinite-scroll-disabled') === 'true', // 默认是否禁止选中
      distance: isNaN(parseFloat(el.getAttribute('infinite-scroll-distance'))) ? 100 : parseFloat(el.getAttribute('infinite-scroll-distance')), // 默认触发回调的距离
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      callBack: binding.value || function () {}, // 默认回调函数
      scrollThrottle: null as AnyCb
    };

    if (settings.disabled) {
      return;
    }

    settings.scrollThrottle = throttle(scroll(settings), settings.delay);

    addEvents(settings);
  }
};
