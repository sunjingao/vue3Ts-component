import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-card`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  headerStyle: {
    require: false,
    type: Object as PropType<Record<string, string>>,
    default: function () {
      return {};
    }
  },
  contentStyle: {
    require: false,
    type: Object as PropType<Record<string, string>>,
    default: function () {
      return {};
    }
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
