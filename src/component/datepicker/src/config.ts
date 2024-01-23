import { useConfig } from '@/hook/useConfig';
import { PropType } from 'vue';
import { YearRangeItemType } from '@/component/datepicker/src/component/yearpicker/type';
import { MonthRangeItemType } from '@/component/datepicker/src/component/monthpicker/type';
import { DateRangeItemType } from '@/component/datepicker/src/component/datePicker/type';
import {
  SelectedDateType,
  SelectedMonthType,
  SelectedYearType,
  DatepikerType,
  NoSelectedType
} from '@/component/datepicker/src/type';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-date-picker`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {
  CHANGE: 'change',
  CLEAR: 'clear',
  ENTER: 'enter',
  BLUR: 'blur'
};

const EMITS_DEC = Object.values(EMITS);

const DATE_TYPES = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date'
};

const PROPS_DES = {
  // date类型
  type: {
    required: false,
    type: String as PropType<DatepikerType>,
    validate(val: DatepikerType) {
      return Object.values(DATE_TYPES).includes(val);
    },
    default: 'year'
  },
  // 参数配置
  range: {
    required: false,
    type: Array as PropType<(YearRangeItemType | MonthRangeItemType | DateRangeItemType)[]>
  },
  // 说明：宽度
  width: {
    required: false,
    type: String,
    default: '170px'
  },
  // 说明：高度
  height: {
    required: false,
    type: String,
    default: '40px'
  },
  // 说明：默认展示文字
  placeholder: {
    required: false,
    type: String,
    default: ''
  },
  // 说明：是否清空输入框
  clearable: {
    required: false,
    type: Boolean,
    default: false
  },
  editable: {
    required: false,
    type: Boolean,
    default: false
  },
  defaultTime: {
    required: false,
    type: Object as PropType<SelectedYearType | SelectedMonthType | SelectedDateType | NoSelectedType>
  },
  separator: {
    required: false,
    type: String,
    default: '-'
  }
};

export {
  COMP_NAME,
  CLS_PRE,
  EMITS,
  EMITS_DEC,
  PROPS_DES,
  PROVIDE_KEY,
  DATE_TYPES
};
