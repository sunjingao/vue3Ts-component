import { useConfig } from '@/hook/useConfig';

const { COMP_PRE, CLS_PRE } = useConfig();

const COMP_NAME = `${COMP_PRE}-carousel-item`;
const PROVIDE_KEY = COMP_NAME;

const EMITS = {};

const EMITS_DEC = Object.values(EMITS);

const PROPS_DES = {};

export { COMP_NAME, CLS_PRE, EMITS, EMITS_DEC, PROPS_DES, PROVIDE_KEY };
