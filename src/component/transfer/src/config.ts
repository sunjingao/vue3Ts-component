import { useConfig } from '@/hook/useConfig';
import { DataItemType } from './type';
import { PropType } from 'vue';
import { definePropType } from '../../../../type/util';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-transfer`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  CHANGE: 'change',
  INPUT: 'input'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  titles: {
    required: false,
    type: definePropType<[string, string]>(Array),
    default() {
      return ['source', 'target'];
    }
  },
  buttonTexts: {
    required: false,
    type: definePropType<[string, string]>(Array)
  },
  sourceData: {
    required: false,
    type: Array as PropType<DataItemType[]>,
    default() {
      return [] as DataItemType[];
    }
  },
  targetData: {
    required: false,
    type: Array as PropType<DataItemType[]>,
    default() {
      return [] as DataItemType[];
    }
  },
  filterable: {
    required: false,
    type: Boolean,
    default: false
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
