import { useConfig } from '@/hook/useConfig';

import { PropType } from 'vue';

import { LayoutType, SelectItemType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-pagination`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  PAGE_CHANGE: 'page-change',
  SELECT_CHANGE: 'select-change'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  layout: {
    required: false,
    type: Array as PropType<LayoutType>
  },
  selectArr: {
    required: false,
    type: Array as PropType<SelectItemType[]>
  },
  pageSize: {
    required: false,
    type: Number,
    default: 10
  },
  total: {
    required: true,
    type: Number,
    default: 50
  },
  isButton: {
    required: false,
    type: Boolean,
    default: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
