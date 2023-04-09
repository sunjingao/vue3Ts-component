
const throttle = function (
  callback: (...args: unknown[]) => unknown,
  timeout: number,
  options: { context: unknown } = { context: undefined }
) {
  let startTime: number | undefined;

  return function (...args: unknown[]) {
    if (!startTime) {
      startTime = new Date().getTime();

      setTimeout(() => {
        startTime = undefined;
        callback.call(options.context, ...args);
      }, timeout);
    }
  };
};

export { throttle };
