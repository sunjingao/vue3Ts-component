import { createApp } from 'vue';
import './css/index.scss';
import Alert from '@/component/alert/src/index.vue';
import { CLS_PRE } from './config';
import { getStyle } from '@/util/dom';
import { OptionType, SettingType } from './type';
import { InstanceType } from '@/component/alert/src/type';

const getInstance = function (setting: SettingType, options: OptionType) {
  return createApp(Alert, {
    type: options.type || 'tip',
    title: options.title || '',
    closable: options.closable === undefined ? true : options.closable,
    showIcon: options.showIcon === undefined ? true : options.showIcon,
    plain: options.plain === undefined ? true : options.plain,
    closeText: options.closeText || '',
    textCenter: options.textCenter === undefined ? false : options.textCenter,
    description: options.description || '',
    closeMethod: function () {
      setting.close();
    }
  }).mount(document.createElement('div')) as InstanceType;
};

function getSettings(options: OptionType) {
  const settings: SettingType = {
    isOpen: false,
    timer: -1,
    container: document.querySelector(`.${CLS_PRE}-message`),
    timeout: options.timeout || 3000,
    open: null,
    close: null
  };
  if (!settings.container) {
    settings.container = document.createElement('div');
    settings.container.classList.add(`${CLS_PRE}-message`);
    document.documentElement.appendChild(settings.container);
  }
  return settings;
}

function setZIndex(ins: InstanceType) {
  ins.$el.style.zIndex = window.Popper.addZIndex();
}

function setOpenSetting(settings: SettingType) {
  settings.isOpen = true;
}

function closeOpenSetting(settings: SettingType) {
  settings.isOpen = false;
  clearTimeout(settings.timer);
  settings.timer = null;
}

function addCls(instance: InstanceType) {
  instance.$el.classList.add(`${CLS_PRE}-message-item`);
}

function removeCls(instance: InstanceType) {
  instance.$el.classList.remove(`${CLS_PRE}-message-item`);
}

function addDom(settings: SettingType, instance: InstanceType) {
  settings.container.appendChild(instance.$el);
}

function removeDom(settings: SettingType, instance: InstanceType) {
  settings.container.removeChild(instance.$el);
}

function addAni(instance: InstanceType) {
  return new Promise((resolve) => {
    setTimeout(() => {
      instance.$el.classList.add(`${CLS_PRE}-opa-show`);
      resolve(undefined);
    });
  });
}

function removeAni(instance: InstanceType) {
  let transitionTime = 0;
  try {
    transitionTime = parseFloat(getStyle(instance.$el, 'transition-duration'));
  } catch (e) {
    return;
  }
  transitionTime = (transitionTime * 1000) || 0;
  return new Promise((resolve) => {
    instance.$el.classList.remove(`${CLS_PRE}-opa-show`);
    setTimeout(() => {
      resolve(undefined);
    }, transitionTime);
  });
}

function closeAuto(settings: SettingType) {
  settings.timer = setTimeout(() => {
    settings.close();
  }, settings.timeout);
}

export default function (options: OptionType) {
  const settings = getSettings(options);
  const instance = getInstance(settings, options);

  return Object.assign(settings, {
    open: async function () {
      if (settings.isOpen) {
        return;
      }

      setOpenSetting(settings);

      setZIndex(instance);

      addCls(instance);

      addDom(settings, instance);

      await addAni(instance);

      closeAuto(settings);
    },

    close: async function close() {
      if (!settings.isOpen) {
        return;
      }

      closeOpenSetting(settings);

      await removeAni(instance);

      removeCls(instance);

      removeDom(settings, instance);
    }
  });
}
