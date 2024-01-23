const spaceTime = 200;

export default {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    let interVal: number;
    let startTime: number;
    const handle = binding.value;

    el.addEventListener('mousedown', function () {
      startTime = new Date().getTime();

      interVal = setInterval(() => {
        startTime = new Date().getTime();
        handle();
      }, spaceTime);

      document.addEventListener(
        'mouseup',
        function () {
          if (new Date().getTime() - startTime > 0) {
            handle();
          }
          clearInterval(interVal);
        },
        {
          once: true
        }
      );
    });
  }
};
