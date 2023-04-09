import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { TypeType, PositionType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-tabs`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
  TAB_CLICK: 'tab-click',
  CLOSE: 'close'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  // 没有传递值的时候要选中第一个子节点
  modelValue: {
    require: false,
    type: String,
    default: ''
  },
  // 类型 default,card
  type: {
    require: false,
    type: String as PropType<TypeType>,
    validate(val: TypeType) {
      return ['card', 'default'].includes(val);
    },
    default: 'default'
  },
  // 位置 'top', 'right', 'bottom', 'left'
  position: {
    require: false,
    type: String as PropType<PositionType>,
    validator(val: PositionType) {
      return ['top', 'right', 'bottom', 'left'].includes(val);
    },
    default: 'top'
  },
  // 是否启用关闭按钮
  closable: {
    require: false,
    type: Boolean,
    default: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
