import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { AutoItemType } from '../../type';

const { CLS_PRE } = useConfig();

const COMP_NAME = 'tip';
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  SELECT: 'select',
  MOUSE_ENTER: 'mouseEnter'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  // 展示的内容
  item: {
    required: true,
    type: Array as PropType<AutoItemType[]>,
    default: function () {
      return [] as AutoItemType[];
    }
  },
  // 是否hover触发
  hoverTrigger: {
    required: false,
    type: Boolean,
    default: false
  },
  popperMaxHeight: {
    required: true,
    type: String
  },
  // 自动提示组件中每条数据的宽度
  itemWidth: {},
  // 自动提示组件中每条数据的高度
  itemHeight: {},
  // 当前 item 是集合的第n项，用于删除
  index: {}
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
