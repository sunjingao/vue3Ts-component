import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { CompType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-alert`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  CLOSE: 'close'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  // 标题文字
  title: {
    require: false,
    type: String,
    default: ''
  },
  type: {
    require: false,
    type: String as PropType<CompType>,
    validator: function (value: CompType) {
      return ['success', 'warning', 'tip', 'error'].includes(value);
    },
    default: 'tip'
  },
  // 是否直接关闭
  closable: {
    require: false,
    type: Boolean,
    default: true
  },
  // 关闭处展示的文字
  closeText: {
    require: false,
    type: String,
    default: ''
  },
  // 是否展示icon
  showIcon: {
    require: false,
    type: Boolean,
    default: false
  },
  // 标题 和 描述处的内容的水平的对齐方式
  textCenter: {
    require: false,
    type: Boolean,
    default: false
  },
  zIndex: {
    require: false,
    type: String,
    default: '0'
  },
  closeMethod: {
    require: false,
    type: Function as PropType<AnyCb<[], boolean>>
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
