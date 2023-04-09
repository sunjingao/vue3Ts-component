import { computed, reactive, Ref, ref, toRefs } from 'vue';
import { RegisterItemType } from '@/component/tabPane/src/type';

export function useProvide(modelValueRf: Ref<string>, closableRf: Ref<boolean>) {
  const regisInfoArrRf = ref([]);

  function register(item: RegisterItemType) {
    const isHoverRf = ref(false);
    const isShowCloseCp = computed(
      () =>
        closableRf.value &&
        ((!item.disabled && isHoverRf.value) || item.isActiveCp)
    );
    item = reactive({
      isShow: true,
      isHoverRf,
      isShowCloseCp,
      ...toRefs(item)
    });
    regisInfoArrRf.value.push(item);
  }

  function destroyItem(sign: RegisterItemType) {
    const index = regisInfoArrRf.value.indexOf(sign);
    regisInfoArrRf.value.splice(index, 1);
  }

  return {
    regisInfoArrRf,
    register,
    destroyItem
  };
}
