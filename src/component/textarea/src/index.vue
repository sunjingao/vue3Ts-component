<template>
  <div :class="[`${CLS_PRE}-textarea`, classCp]" :style="styleCp">
    <textarea
      ref="textareaD"
      :value="modelValue"
      :placeholder="placeholder"
      v-bind="$attrs"
      :style="{
        ...styles,
        resize: resize,
      }"
      :class="[`${CLS_PRE}-textarea-content`]"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter="handleEnter"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
    >
    </textarea>
    <span v-if="showWordLimit" :class="[`${CLS_PRE}-counter`]">
      {{ textLenCp }} / {{ maxLength }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef } from 'vue';
import { useExpose } from './hook/useExpose';
import { useResize } from './hook/useResize';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';
import { isNotUndefined } from '@/util/type';
import { resetEditValue } from '@/util/dom';

export default defineComponent({
  name: COMP_NAME,

  inheritAttrs: false,

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const textareaD = ref(null);

    const classCp = computed(() => props.class);

    const styleCp = computed(() => props.style);

    let isComposition = false;

    function handleInput(event: Event) {
      if (isComposition) {
        return;
      }
      const data = (event.target as HTMLTextAreaElement).value;
      let curData = data;
      if (isNotUndefined(props.maxLength) && data.length > props.maxLength) {
        curData = data.slice(0, props.maxLength);
        resetEditValue(textareaD.value, curData);
      }
      if (curData !== props.modelValue) {
        emit(EMITS.UPDATE_MODEL_VALUE, curData);
        emit(EMITS.INPUT, curData);
      }
    }

    function handleFocus(event: Event) {
      emit(EMITS.FOCUS, event);
    }

    function handleBlur(event: Event) {
      emit(EMITS.BLUR, event);
    }

    function handleEnter(event: Event) {
      emit(EMITS.ENTER, event);
    }

    function handleCompositionStart(event: Event) {
      isComposition = true;
      emit(EMITS.COMPOSITIONSTART, event);
    }

    function handleCompositionUpdate(event: Event) {
      emit(EMITS.COMPOSITIONUPDATE, event);
    }

    function handleCompositionEnd(event: Event) {
      isComposition = false;
      emit(EMITS.COMPOSITIONEND, event);
      handleInput(event);
    }

    const textLenCp = computed(() => String(props.modelValue).length);

    const { styles } = useResize(
      textareaD,
      toRef(props, 'modelValue'),
      toRef(props, 'width'),
      toRef(props, 'isAutoResize'),
      toRef(props, 'resizeConfig'),
      classCp,
      styleCp
    );

    const { clear, select, focus, blur } = useExpose(
      textareaD,
      toRef(props, 'modelValue')
    );

    function handleChange(v: Event) {
      emit(EMITS.CHANGE, (v.target as HTMLTextAreaElement).value);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
      clear,
      select,
      focus,
      blur,
      ref: textareaD
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      classCp,
      styleCp,
      textareaD,
      textLenCp,
      styles,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleEnter,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss"></style>
