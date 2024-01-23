import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { ModelValueType } from '@/component/input/src/type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-input`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
  INPUT: 'input',
  CHANGE: 'change',
  ENTER: 'enter',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLEAR: 'clear',
  COMPOSITIONSTART: 'compositionstart',
  COMPOSITIONUPDATE: 'compositionupdate',
  COMPOSITIONEND: 'compositionend'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  modelValue: {
    required: true,
    type: [String, Number] as PropType<ModelValueType>
  },
  width: {
    required: false,
    type: String,
    default: '180px'
  },
  height: {
    required: false,
    type: String,
    default: '40px'
  },
  fz: {
    required: false,
    type: String,
    default: '1rem'
  },
  disabled: {
    required: false,
    type: Boolean,
    default: false
  },
  showPassword: {
    required: false,
    type: Boolean,
    default: false
  },
  showWordLimit: {
    required: false,
    type: Boolean,
    default: false
  },
  clearable: {
    required: false,
    type: Boolean,
    default: false
  },
  type: {
    required: false,
    type: String,
    default: 'text'
  },
  max: {
    required: false,
    type: Number,
    default: function () {
      return Number.MAX_VALUE;
    }
  },
  min: {
    required: false,
    type: Number,
    default: function () {
      return -Number.MAX_VALUE;
    }
  },
  numberRequired: {
    required: false,
    type: Boolean,
    default: false
  },
  numberRequiredDefault: {
    required: false,
    type: Number,
    default: 0
  },
  numberInt: {
    required: false,
    type: Boolean,
    default: false
  },
  textAlign: {
    required: false,
    type: String,
    default: 'left'
  },
  class: {
    required: false,
    type: [Array, String] as PropType<ClassType>
  },
  style: {
    required: false,
    type: Object as PropType<StyleType>
  },
  maxLength: {
    required: false,
    type: Number
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
