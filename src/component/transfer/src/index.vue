<template>
  <div :class="[`${CLS_PRE}-transfer`]">
    <div :class="[`transfer-content`]">
      <div
        :class="[`title`]"
        @click="handleChangeAllSel(sourceDataRf, sourceSettingCp)"
      >
        <v-checkbox
          :isIndeterminate="
            getSelectedType(sourceSettingCp) === CHECKBOX_TYPE.PART
          "
          :modelValue="getSelectedType(sourceSettingCp) === CHECKBOX_TYPE.ALL"
        >
        </v-checkbox>
        <div :class="[`title-value`]">{{ titles[0] }}</div>
        <div :class="[`select-num`]">
          <span>{{ sourceSettingCp.checkedNum }}</span>
          <span>/</span>
          <span>{{ sourceSettingCp.amount }}</span>
        </div>
      </div>
      <template v-if="sourceDataRf.length === 0">
        <div :class="[`no-data`]">暂无数据</div>
      </template>
      <template v-else>
        <ul :class="[`${CLS_PRE}-hover-show-scrollbar`, `content`]">
          <div v-if="filterable" class="input-content">
            <v-input
              height="30px"
              v-model="filterSettingRt.source"
              @input="(val) => handleFilter(val, 'source')"
            ></v-input>
          </div>
          <li
            v-for="(item, index) in sourceFilterDataCp"
            :class="[{ disabled: item.disabled }]"
            @click="handleItemSelect(item)"
            :key="index"
          >
            <v-checkbox :modelValue="item.checked"></v-checkbox>
            <div
              :class="[
                `content-value`,
                { checked: item.checked, disabled: item.disabled },
              ]"
            >
              {{ item.label }}
            </div>
          </li>
        </ul>
        <slot name="source-footer"></slot>
      </template>
    </div>

    <div :class="[`transfer-icon`]">
      <v-button
        type="primary"
        :class="[`mb10`]"
        @click="handleTransfer(targetDataRf, targetSettingCp)"
        :disabled="getSelectedType(targetSettingCp) === CHECKBOX_TYPE.NONE"
      >
        <span v-if="buttonTexts">{{ buttonTexts[0] }}</span>
        <span v-else>&#60;</span>
      </v-button>
      <br />
      <v-button
        type="primary"
        @click="handleTransfer(sourceDataRf, sourceSettingCp)"
        :disabled="getSelectedType(sourceSettingCp) === CHECKBOX_TYPE.NONE"
      >
        <span v-if="buttonTexts">{{ buttonTexts[1] }}</span>
        <span v-else>&#62;</span>
      </v-button>
    </div>

    <div :class="[`transfer-content`]">
      <div
        :class="[`title`]"
        @click="handleChangeAllSel(targetDataRf, targetSettingCp)"
      >
        <v-checkbox
          :isIndeterminate="
            getSelectedType(targetSettingCp) === CHECKBOX_TYPE.PART
          "
          :modelValue="getSelectedType(targetSettingCp) === CHECKBOX_TYPE.ALL"
        >
        </v-checkbox>
        <div :class="[`title-value`]">
          {{ titles[1] }}
        </div>
        <div :class="[`select-num`]">
          <span>{{ targetSettingCp.checkedNum }}</span>
          <span>/</span>
          <span>{{ targetSettingCp.amount }}</span>
        </div>
      </div>
      <template v-if="targetDataRf.length === 0">
        <div :class="[`no-data`]">暂无数据</div>
      </template>
      <template v-else>
        <ul :class="[`${CLS_PRE}-hover-show-scrollbar`, `content`]">
          <div v-if="filterable" class="input-content">
            <v-input
              height="30px"
              v-model="filterSettingRt.target"
              @input="(val) => handleFilter(val, 'target')"
            ></v-input>
          </div>
          <li
            v-for="(item, index) in targetFilterDataCp"
            :class="[{ disabled: item.disabled }]"
            @click="handleItemSelect(item)"
            :key="index"
          >
            <v-checkbox :modelValue="item.checked"></v-checkbox>
            <div
              :class="[
                `content-value`,
                { checked: item.checked, disabled: item.disabled },
              ]"
            >
              {{ item.label }}
            </div>
          </li>
        </ul>
      </template>
      <slot name="target-footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES } from './config';
import vCheckbox from '@/component/checkbox/src/index.vue';
import vButton from '@/component/button/src/index.vue';
import vInput from '@/component/input/src/index.vue';

import { defineComponent, toRef } from 'vue';
import { useCheckbox } from './hook/useCheckbox';
import { useData } from './hook/useData';
import { DataItemType, SettingType, TransferBoxType } from '@/component/transfer/src/type';

export default defineComponent({
  name: COMP_NAME,

  components: {
    vCheckbox,
    vButton,
    vInput
  },

  emits: EMITS_DEC,

  props: PROPS_DES,

  setup(props, { emit, expose }) {
    const {
      sourceDataRf,
      targetDataRf,
      sourceSettingCp,
      targetSettingCp,
      filterSettingRt,
      sourceFilterDataCp,
      targetFilterDataCp
    } = useData(toRef(props, 'sourceData'), toRef(props, 'targetData'));

    const {
      CHECKBOX_TYPE,
      getSelectedType,
      handleItemSelect,
      handleChangeAllSel
    } = useCheckbox();

    function handleFilter(val: string, type: TransferBoxType) {
      emit(EMITS.INPUT, val, type);
    }

    function handleTransfer(dataRfArr: DataItemType[], settingCpObj: SettingType) {
      if (getSelectedType(settingCpObj) === CHECKBOX_TYPE.NONE) {
        return;
      }

      const anOtherDataRf =
        dataRfArr === sourceDataRf.value ? targetDataRf : sourceDataRf;

      const remainArr: DataItemType[] = [];
      const needMoveArr: DataItemType[] = [];

      dataRfArr.forEach((item) => {
        if (item.checked && !item.disabled) {
          item.checked = false;
          needMoveArr.push(item);
        } else {
          remainArr.push(item);
        }
      });

      dataRfArr.length = 0;
      dataRfArr.push(...remainArr);
      anOtherDataRf.value.push(...needMoveArr);
      anOtherDataRf.value.sort((a, b) => a.key - b.key);

      emit(EMITS.CHANGE, sourceDataRf, targetDataRf);
    }

    // 在使用其它组件过程中，发现TS只能识别return中返回的数据，暂时做此处理。
    const exposeTemp = {
    };
    expose(exposeTemp);

    return {
      CLS_PRE,
      ...exposeTemp,
      CHECKBOX_TYPE,
      sourceDataRf,
      targetDataRf,
      sourceSettingCp,
      targetSettingCp,
      sourceFilterDataCp,
      targetFilterDataCp,
      filterSettingRt,
      handleChangeAllSel,
      getSelectedType,
      handleItemSelect,
      handleTransfer,
      handleFilter
    };
  }
});
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
