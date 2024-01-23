import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-option`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  value: {
    type: [Number, String] as PropType<number | string>,
    required: true
  },
  label: {
    type: [Number, String] as PropType<number | string>,
    required: true
  },
  disabled: {
    required: false,
    type: Boolean,
    default: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
