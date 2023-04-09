import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { ModelValueItemType } from '@/component/checkboxGroup/src/type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-checkbox-group`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
  CHANGE: 'change'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  modelValue: {
    required: false,
    type: Array as PropType<ModelValueItemType[]>,
    default: function () {
      return [] as ModelValueItemType[];
    }
  },
  border: {
    required: false,
    type: Boolean,
    default: false
  },
  disabled: {
    required: false,
    type: Boolean,
    default: false
  },
  isIndeterminate: {
    required: false,
    type: Boolean,
    default: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
