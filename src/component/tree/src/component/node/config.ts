import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { InnerNodeType } from '@/component/tree/src/type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-tree-node`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  level: {},
  nodeList: {
    required: true,
    type: Array as PropType<InnerNodeType[]>
  },
  showCheckbox: {
    required: true,
    type: Boolean
  },
  parentSelected: {
    required: false,
    type: Boolean
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
