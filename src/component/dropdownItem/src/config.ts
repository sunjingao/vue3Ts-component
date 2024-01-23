import { useConfig } from '@/hook/useConfig';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-dropdown-item`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  // 禁止选中
  disabled: {
    required: false,
    type: Boolean,
    default: false
  },
  // 展示分割线
  divided: {
    required: false,
    type: Boolean,
    default: false
  },
  // 点击时上传的内容
  command: {
    required: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
