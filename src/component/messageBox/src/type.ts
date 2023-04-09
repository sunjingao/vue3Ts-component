import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {};

type InstanceType = CompInstanceType<typeof comp>;

type TypeType = 'message' | 'confirm' | 'prompt';

type OptionsType = {
  type ?: string,
  title ?: string,
  content ?: string,
  cancelButtonText ?: string,
  confirmButtonText ?: string,
  cancelCallBack ?: AnyCb<unknown[], boolean>,
  confirmCallBack ?: AnyCb<unknown[], boolean>,
  closeCallBack ?: AnyCb<unknown[], boolean>,
}

export {
  ProvideValType,
  InstanceType,
  TypeType,
  OptionsType
};
