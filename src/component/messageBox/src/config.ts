import { useConfig } from '@/hook/useConfig';
import { TypeType } from './type';
import { PropType } from 'vue';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-messagebox`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {
  type: {
    required: false,
    type: String as PropType<TypeType>,
    validator: function (value: TypeType) {
      return ['message', 'confirm', 'prompt'].includes(value);
    },
    default: 'message'
  },
  title: {
    required: false,
    type: String,
    default: ''
  },
  content: {
    required: false,
    type: String,
    default: ''
  },
  cancelButtonText: {
    required: false,
    type: String,
    default: '取消'
  },
  confirmButtonText: {
    required: false,
    type: String,
    default: '确认'
  },
  cancelCallBack: {
    required: false,
    type: Function as PropType<AnyCb<unknown[], boolean>>,
    default: function () {
      return function () {
        return true;
      };
    }
  },
  confirmCallBack: {
    required: false,
    type: Function as PropType<AnyCb<unknown[], boolean>>,
    default: function () {
      return function () {
        return true;
      };
    }
  },
  closeCallBack: {
    required: false,
    type: Function as PropType<AnyCb<unknown[], boolean>>,
    default: function () {
      return function () {
        return true;
      };
    }
  }
};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
