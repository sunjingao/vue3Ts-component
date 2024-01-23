import { useConfig } from '@/hook/useConfig/index';
import { PropType } from 'vue';
import { CompType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-button`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  CLICK: 'click'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  width: {
    required: false,
    type: String
  },

  height: {
    required: false,
    type: String
  },

  type: {
    required: false,
    type: String as PropType<CompType>,
    validator: function (value: CompType) {
      return ['default', 'primary', 'success', 'warning', 'info', 'danger'].includes(value);
    }
  },

  plain: {
    required: false,
    type: Boolean,
    default: false
  },

  round: {
    required: false,
    type: Boolean,
    default: false
  },

  disabled: {
    required: false,
    type: Boolean,
    default: false
  },

  loading: {
    required: false,
    type: Boolean,
    default: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
