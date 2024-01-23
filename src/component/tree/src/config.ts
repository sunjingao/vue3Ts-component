import { useConfig } from '@/hook/useConfig';
import { NodeItemType, ExpandOpsType, CheckedOpsType, SelectedOpsType } from './type';
import { PropType } from 'vue';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-tree`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  SELECT: 'select',
  CHECK: 'check',
  EXPAND: 'expand'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  nodeList: {
    required: true,
    type: Array as PropType<NodeItemType[]>
  },
  expandOps: {
    required: false,
    type: Object as PropType<ExpandOpsType>,
    default() {
      return {
        expandAll: true,
        defaultExpandedKeys: []
      } as ExpandOpsType;
    }
  },
  checkedOps: {
    required: false,
    type: Object as PropType<CheckedOpsType>,
    default() {
      return {
        isShow: false,
        checkedAll: false,
        defaultCheckedKeys: []
      } as CheckedOpsType;
    }
  },
  selectedOps: {
    required: false,
    type: Object as PropType<SelectedOpsType>,
    default() {
      return {
        parentSelected: false,
        defaultSelectedKeys: ''
      } as SelectedOpsType;
    }
  }
};

const CHECK_TYPES = {
  ALL: 2,
  PART: 1,
  NONE: 0
};

export {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY,
  CHECK_TYPES
};
