import { createApp } from 'vue';
import './css/index.scss';
import Alert from '@/component/alert/src/index.vue';
import { CLS_PRE } from './config';
import { getStyle } from '@/util/dom';
import { OptionType, SettingType } from './type';
import { InstanceType } from '@/component/alert/src/type';

const getInstance = function (settings: SettingType, options: OptionType) {
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
      settings.close();
    }
  }).mount(document.createElement('div')) as InstanceType;
};

function getSettings(options: OptionType) {
  const settings: SettingType = {
    isOpen: false,
    timer: null,
    direction: options.direction,
    container: document.querySelector(
      `.${CLS_PRE}-notification-${options.direction}`
    ),
    timeout: options.timeout || 3000,
    open: null,
    close: null
  };
  if (!settings.container) {
    settings.container = document.createElement('div');
    settings.container.classList.add(
      `${CLS_PRE}-notification-${settings.direction}`
    );
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

function addCls(settings: SettingType, options: OptionType, instance: InstanceType) {
  instance.$el.classList.add(`${CLS_PRE}-notification-item`);
  if (settings.direction.includes('bottom')) {
    instance.$el.classList.add(`${CLS_PRE}-mb10`);
  } else {
    instance.$el.classList.add(`${CLS_PRE}-mt10`);
  }

  if (settings.direction.includes('top')) {
    instance.$el.style.marginTop = `${options.offset}px`;
  } else {
    instance.$el.style.marginBottom = `${options.offset}px`;
  }
}

function removeCls(instance: InstanceType) {
  instance.$el.classList.remove(`${CLS_PRE}-notification-item`);
  instance.$el.classList.remove(`${CLS_PRE}-mb10`);
  instance.$el.classList.remove(`${CLS_PRE}-mt10`);
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
  let transitionTime = parseFloat(getStyle(instance.$el, 'transition-duration'));
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

      addCls(settings, options, instance);

      addDom(settings, instance);

      await addAni(instance);

      closeAuto(settings);
    },
    close: async function () {
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
