import { useConfig } from '@/hook/useConfig';
import { PlacementType } from './type';
import { PropType } from 'vue';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-timeline-item`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  content: {
    required: false,
    type: String,
    default: ''
  },
  placement: {
    required: false,
    type: String as PropType<PlacementType>,
    validator(val: PlacementType) {
      return ['top', 'bottom'].includes(val);
    },
    default: 'bottom'
  },
  title: {
    required: false,
    type: String,
    default: ''
  },
  circularColor: {
    required: false,
    type: String,
    default: '#e4e7ed'
  },
  lineColor: {
    required: false,
    type: String,
    default: '#e4e7ed'
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
