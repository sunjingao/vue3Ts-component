import { useConfig } from '@/hook/useConfig/index';
import { PropType } from 'vue';
import { CompType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-button-group`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  type: {
    required: false,
    type: String as PropType<CompType>,
    validator: function (value: CompType) {
      return ['default', 'primary', 'success', 'warning', 'info', 'danger'].includes(value);
    },
    default: 'default'
  },

  width: {
    require: false,
    type: String
  },

  height: {
    require: false,
    type: String
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
