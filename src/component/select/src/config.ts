import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-select`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
  CHANGE: 'change'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  multiple: {
    required: false,
    type: Boolean,
    default: false
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
