// 三种情况 dom，ref dom，ref 组件
import { Component, Ref } from 'vue';
import { ComponentPublicInstance } from '@vue/runtime-core';

export function getDom(val: HTMLElement | Ref<Component> | Ref<HTMLElement>) {
  if ((val as HTMLElement).nodeType) {
    return val;
  } else {
    const value = (val as (Ref<Component> | Ref<HTMLElement>)).value;
    if ((value as ComponentPublicInstance).$el) {
      return (value as ComponentPublicInstance).$el;
    } else {
      return value;
    }
  }
}
