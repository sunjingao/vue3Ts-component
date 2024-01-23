const cbArr: { handleClick: (event: MouseEvent, el: HTMLElement) => void, el: HTMLElement }[] = [];

document.addEventListener('click', function (event: MouseEvent) {
  cbArr.forEach((item) => {
    item.handleClick(event, item.el);
  });
});

export default {
  beforeMount(el: HTMLElement, binding: { value: (a: boolean, b: Event) => void }) {
    if (typeof binding.value !== 'function') {
      console.error('clickoutside parameter is not a function in component');
      return;
    }

    const handleClick = (event: MouseEvent, el: HTMLElement) => {
      binding.value(!el.contains(event.target as Node), event);
    };

    cbArr.push({
      handleClick,
      el
    });
  },
  beforeUnmount(el: HTMLElement) {
    const index = cbArr.findIndex((item) => item.el === el);
    cbArr.splice(index, 1);
  }
};
