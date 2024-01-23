<template>
  <v-input
    v-model="inputValueCp"
    :class="[`${CLS_PRE}-input-number`]"
    type="number"
    :width="width"
    :height="height"
    :max="max"
    :min="min"
    :disabled="disabled"
    @inpur="handleInput"
    text-align="center"
  >
    <!--触发区域在左右-->
    <template #front>
      <div
        v-if="controlsPosition === 'bothSides'"
        :class="[
          `${CLS_PRE}-input-number-front`,
          {
            disabled: !isCanDecCp,
          },
        ]"
        :style="{
          lineHeight: `calc(${height} - 2px)`,
          height: `calc(${height} - 2px)`,
        }"
        v-repeat-click="handleDecrease"
      >
        <span :class="[`iconfont`, `icon-v-decrease`]"></span>
      </div>
    </template>
    <template #behind>
      <div
        v-if="controlsPosition === 'bothSides'"
        :class="[`${CLS_PRE}-input-number-behind`, { disabled: !isCanIncCp }]"
        :style="{
          lineHeight: `calc(${height} - 2px)`,
          height: `calc(${height} - 2px)`,
        }"
        v-repeat-click="handleIncrease"
      >
        <span :class="[`iconfont`, `icon-v-increase`]"></span>
      </div>
      <div v-else :class="[`${CLS_PRE}-input-number-right`]">
        <div
          :class="[`${CLS_PRE}-input-number-top`, { disabled: !isCanIncCp }]"
          :style="{
            lineHeight: `calc((${height} - 2px) / 2)`,
            height: `calc((${height} - 2px) / 2)`,
          }"
          v-repeat-click="handleIncrease"
        >
          <span :class="[`iconfont`, `icon-v-increase`]"></span>
        </div>
        <div
          :class="[`${CLS_PRE}-input-number-bottom`, { disabled: !isCanDecCp }]"
          :style="{
            lineHeight: `calc((${height} - 2px) / 2)px`,
            height: `calc((${height} - 2px) / 2)px`,
          }"
          v-repeat-click="handleDecrease"
        >
          <span :class="[`iconfont`, `icon-v-decrease`]"></span>
        </div>
      </div>
    </template>
  </v-input>
</template>

<script lang="ts">
import repeatClick from '@/directive/repeatclick/index';
import { defineComponent, computed } from 'vue';

import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';

export default defineComponent({
  name: COMP_NAME,

  directives: {
    repeatClick: repeatClick
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const inputValueCp = computed({
      get() {
        return props.modelValue;
      },
      set(data) {
        emit(EMITS.UPDATE_MODEL_VALUE, data);
        emit(EMITS.INPUT, data);
      }
    });

    const isCanDecCp = computed(() => {
      return !props.disabled && inputValueCp.value - props.step >= props.min;
    });
    const isCanIncCp = computed(() => {
      return !props.disabled && inputValueCp.value + props.step <= props.max;
    });

    function handleDecrease() {
      if (!isCanDecCp.value) {
        return;
      }
      inputValueCp.value -= props.step;
    }

    function handleIncrease() {
      if (!isCanIncCp.value) {
        return;
      }
      inputValueCp.value += props.step;
    }

    function handleInput(val: number) {
      inputValueCp.value = val;
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      inputValueCp,
      isCanDecCp,
      isCanIncCp,
      handleDecrease,
      handleIncrease,
      handleInput
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
