import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { RangeType, TimeType } from '@/component/timepicker/src/type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-auto`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  COMPLETE: 'complete',
  CLOSE: 'close'
};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  showEndTime: {
    required: false,
    type: Boolean,
    default: false
  },
  itemWidth: {
    require: false,
    type: Number,
    default: 50
  },
  itemHeight: {
    required: false,
    type: Number,
    default: 30
  },
  startTime: {
    required: false,
    type: Object as PropType<TimeType>
  },
  endTime: {
    required: false,
    type: Object as PropType<TimeType>
  },
  isShowPopper: {
    required: false,
    type: Boolean,
    default: false
  },
  // 时间范围
  startRange: {
    required: false,
    type: Object as PropType<RangeType>
  },
  // 时间范围
  endRange: {
    required: false,
    type: Object as PropType<RangeType>
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
