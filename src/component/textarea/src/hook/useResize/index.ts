import { addClass, getStyle, setStyle } from '@/util/dom';
import { ComputedRef, onMounted, reactive, Ref, watch } from 'vue';
import { CLS_PRE } from '@/component/textarea/src/config';
import { AutosizeObjType } from '@/component/textarea/src/type';

export function useResize(
  textareaD: Ref<HTMLTextAreaElement>,
  modelValueRf: Ref<string>,
  width: Ref<string>,
  isAutoResizeRf: Ref<boolean>,
  resizeConfigRf: Ref<AutosizeObjType>,
  classCp: ComputedRef<ClassType>,
  styleCp: ComputedRef<StyleType>
) {
  const styles = reactive({
    width: width.value,
    height: 'auto',
    minHeight: 'auto'
  });

  function setElementStyles(attrsObj: Partial<CSSStyleDeclaration>) {
    for (const [key, value] of Object.entries(attrsObj)) {
      // eslint-disable-next-line
      (styles as any)[key] = value;
    }
  }

  function operateVisualDoms() {
    const hiddenStyle = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      zIndex: '-9900',
      visibility: 'hidden'
    };

    const outerDom = document.createElement('div');
    const virtualDom = document.createElement('textarea');
    outerDom.appendChild(virtualDom);

    if (Array.isArray(classCp.value)) {
      addClass(outerDom, [`${CLS_PRE}-textarea`, ...classCp.value]);
    } else {
      addClass(outerDom, [`${CLS_PRE}-textarea`, classCp.value]);
    }
    addClass(virtualDom, [
      `${CLS_PRE}-hidden-scrollbar`,
      `${CLS_PRE}-textarea-content`
    ]);

    setStyle(outerDom, styleCp.value);
    setStyle(outerDom, hiddenStyle);
    // 影响展示的特殊样式处理
    setStyle(virtualDom, {
      width: getStyle(textareaD.value, 'width')
    });

    virtualDom.value = modelValueRf.value;

    document.documentElement.appendChild(outerDom);

    return {
      setAttr(name: string, val: string) {
        virtualDom.setAttribute(name, val);
      },

      removeDom() {
        document.documentElement.removeChild(outerDom);
      },

      getStyles() {
        const styles = getComputedStyle(virtualDom);
        const clientHeight = virtualDom.clientHeight;
        const scrollHeight = virtualDom.scrollHeight;
        const lineHeight = parseFloat(styles.getPropertyValue('line-height'));
        const padding =
          parseFloat(styles.getPropertyValue('padding-top')) +
          parseFloat(styles.getPropertyValue('padding-bottom'));
        const border =
          parseFloat(styles.getPropertyValue('border-top')) +
          parseFloat(styles.getPropertyValue('border-bottom'));

        return {
          border,
          padding,
          lineHeight,
          clientHeight,
          scrollHeight
        };
      }
    };
  }

  function handleAdaption() {
    const visualDom = operateVisualDoms();
    const styles = visualDom.getStyles();

    setElementStyles({
      height: `${styles.scrollHeight + styles.border}px`
    });

    visualDom.removeDom();
  }

  function handleRange() {
    const visualDom = operateVisualDoms();
    let styles = visualDom.getStyles();

    if (
      styles.scrollHeight <=
      styles.padding + resizeConfigRf.value.maxRows * styles.lineHeight
    ) {
      setElementStyles({
        height: `${styles.scrollHeight + styles.border}px`,
        minHeight: `${
          styles.lineHeight * resizeConfigRf.value.minRows +
          styles.padding +
          styles.border
        }px`
      });
    } else {
      visualDom.setAttr('rows', String(resizeConfigRf.value.maxRows));
      styles = visualDom.getStyles();
      setElementStyles({
        height: `${styles.clientHeight + styles.border}px`,
        minHeight: `${
          styles.lineHeight * resizeConfigRf.value.minRows +
          styles.padding +
          styles.border
        }px`
      });
    }
    visualDom.removeDom();
  }

  function processAutoSize() {
    if (!isAutoResizeRf.value) {
      return;
    }

    if (resizeConfigRf.value) {
      handleRange();
    } else {
      handleAdaption();
    }
  }

  onMounted(() => {
    processAutoSize();
  });

  watch(modelValueRf, () => {
    processAutoSize();
  });

  return {
    styles
  };
}
