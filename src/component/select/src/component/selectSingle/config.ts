import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { ModelValueItemType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-select-single`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
  CLEAR: 'clear'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  modelValue: {
    required: false,
    type: [Number, String] as PropType<ModelValueItemType>,
    default() {
      return '';
    }
  },
  placeholder: {
    required: false,
    default: ''
  },
  clearable: {
    required: false,
    type: Boolean,
    default: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
