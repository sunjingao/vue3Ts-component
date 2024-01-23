<template>
  <div :class="[`${CLS_PRE}-select`]" v-click-outside="handleClickOutside">
    <div
      :class="[
        `${CLS_PRE}-multiple-reference`,
        `${CLS_PRE}-hover-show-scrollbar`,
      ]"
      ref="referenceD"
      @click="handleClickInput"
      :style="{
        width: width,
        minHeight: minHeight,
        maxHeight: maxHeight,
      }"
      tabIndex="1"
    >
      <template v-if="selectedArrCp.length > 0">
        <v-tag
          v-for="item in selectedArrCp"
          @close="handleCloseItem(item)"
          :height="`calc(${minHeight} - 10px - 2px)`"
          :key="item.value"
          closeable
        >
          {{ item.label }}
        </v-tag>
      </template>
      <template v-else>
        <span
          :class="[`${CLS_PRE}-self-placeholder`]"
          :style="{ lineHeight: `calc(${minHeight} - 10px - 2px)` }"
        >
          {{ placeholder }}
        </span>
      </template>
      <span class="select-direction">
        <i class="iconfont icon-v-down" :class="isShowPopperRf && 'up'"></i>
      </span>
    </div>

    <div ref="popperD" :class="[`${CLS_PRE}-popper`]">
      <ul
        :class="[
          `${CLS_PRE}-popper-content`,
          `${CLS_PRE}-hover-show-scrollbar`,
        ]"
      >
        <slot></slot>
      </ul>
      <div :class="[`${CLS_PRE}-popper-arrow`]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  provide,
  reactive,
  toRef,
  computed,
  Ref
} from 'vue';
import clickOutside from '@/directive/clickoutside/index';
import { usePopper } from '@/hook/usePopper';
import vTag from '@/component/tag/src/index.vue';

import {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY
} from './config';

import { useProvide } from './hook/useProvide/index';
import { OptionItem } from '@/component/option/src/type';

export default defineComponent({
  name: COMP_NAME,

  inheritAttrs: false,

  emits: EMITS_DEC,

  directives: {
    clickOutside
  },

  components: {
    vTag
  },

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const {
      referenceD,
      popperD,
      updatePopper,
      showPopper,
      hidePopper,
      isShowPopperRf
    } = usePopper();

    const { regisInfoArrRf, register, deleteItem } = useProvide();

    const selectedArrCp = computed(() => {
      if (regisInfoArrRf.value.length === 0) {
        return [];
      } else {
        return props.modelValue.map((modelItem) => {
          return regisInfoArrRf.value.find(
            (childItem) => childItem && childItem.value === modelItem
          );
        });
      }
    });

    // 存在选中条目时，要让选中条目处于展示的最下方
    function adaptPosition() {
      const scrollContainer = (popperD as Ref<HTMLElement>).value.querySelector(
        `.${CLS_PRE}-popper-content`
      ) as HTMLElement;
      const activeItem = (popperD as Ref<HTMLElement>).value.querySelector('.active') as HTMLElement;
      if (!activeItem) {
        return;
      }
      scrollContainer.scrollTop = activeItem.offsetTop;
    }

    function handleClickOutside(sign: boolean) {
      if (sign) {
        hidePopper();
        isShowPopperRf.value = false;
      }
    }

    function handleClickInput() {
      showPopper();
      isShowPopperRf.value = true;
      adaptPosition();
    }

    function handleCloseItem(val: OptionItem) {
      const res = [...props.modelValue];
      res.splice([...props.modelValue].indexOf(val.value), 1);
      emit(EMITS.UPDATE_MODEL_VALUE, res);
      emit(EMITS.CHANGE, res);
      emit(EMITS.CLOSE, res);

      nextTick(() => {
        updatePopper();
      });
    }

    function triggerClick(obj: OptionItem) {
      if (props.modelValue.includes(obj.value)) {
        const res = [...props.modelValue];
        const index = props.modelValue.indexOf(obj.value);
        res.splice(index, 1);
        emit(EMITS.UPDATE_MODEL_VALUE, res);
        emit(EMITS.CHANGE, res);
      } else {
        emit(EMITS.UPDATE_MODEL_VALUE, [...props.modelValue, obj.value]);
        emit(EMITS.CHANGE, [...props.modelValue, obj.value]);
      }
      nextTick(() => {
        updatePopper();
      });
    }

    provide(
      PROVIDE_KEY,
      reactive({
        modelValue: toRef(props, 'modelValue'),
        register: register,
        triggerClick: triggerClick,
        deleteItem: deleteItem
      })
    );

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      referenceD,
      popperD,
      isShowPopperRf,
      handleClickOutside,
      handleClickInput,
      selectedArrCp,
      handleCloseItem
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
