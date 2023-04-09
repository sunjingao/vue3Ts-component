import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { AutosizeObjType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-textarea`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
  INPUT: 'input',
  CHANGE: 'change',
  FOCUS: 'focus',
  BLUR: 'blur',
  ENTER: 'enter',
  COMPOSITIONSTART: 'compositionstart',
  COMPOSITIONUPDATE: 'compositionupdate',
  COMPOSITIONEND: 'compositionend'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  modelValue: {
    require: true,
    type: String
  },
  width: {
    require: false,
    type: String,
    default: '420px'
  },
  placeholder: {
    require: false,
    type: String,
    default: ''
  },
  isAutoResize: {
    require: false,
    type: Boolean,
    default: true
  },
  resizeConfig: {
    require: false,
    type: Object as PropType<AutosizeObjType>
  },
  showWordLimit: {
    required: false,
    type: Boolean,
    default: false
  },
  maxLength: {
    required: false,
    type: Number
  },
  resize: {
    require: false,
    type: String,
    default: 'vertical'
  },
  class: {
    required: false,
    type: [Array, String] as PropType<ClassType>
  },
  style: {
    required: false,
    type: Object as PropType<StyleType>
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
