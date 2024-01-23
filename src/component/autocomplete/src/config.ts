import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { ItemType } from './type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-autocomplete`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
  CHANGE: 'change',
  INPUT: 'input',
  FOCUS: 'focus'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  modelValue: {},
  itemHeight: {
    required: false,
    type: String,
    default: '40px'
  },
  options: {
    required: false,
    type: Array as PropType<ItemType[]>,
    default() {
      return [] as ItemType[];
    }
  }
};

const MOVE_TYPE = {
  UP: 'up',
  DOWN: 'down'
};

export {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY,
  MOVE_TYPE
};
