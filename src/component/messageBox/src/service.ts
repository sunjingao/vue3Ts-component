import MessageBox from './index.vue';
import { createApp } from 'vue';
import { InstanceType, OptionsType } from './type';

const parent = document.documentElement;

function nullCb() {
  return true;
}

const getInstance = function (options: OptionsType) {
  return createApp(MessageBox, {
    type: options.type || 'message',
    title: options.title || '',
    content: options.content || '',
    cancelButtonText: options.cancelButtonText || '取消',
    confirmButtonText: options.confirmButtonText || '确认',
    cancelCallBack: options.cancelCallBack || nullCb,
    confirmCallBack: options.confirmCallBack || nullCb,
    closeCallBack: options.closeCallBack || nullCb
  }).mount(document.createElement('div')) as InstanceType;
};

export default function (options: OptionsType) {
  const instance = getInstance(options);

  return {
    open: () => {
      parent.appendChild(instance.$el);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance as any).show();
    },
    close: () => {
      parent.removeChild(instance.$el);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance as any).hide();
    }
  };
}
