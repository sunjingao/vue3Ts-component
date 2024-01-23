import { computed, reactive, Ref, ref, watch } from 'vue';
import { DataItemType } from '../../type';

export function useData(sourceDataPropRf: Ref<DataItemType[]>, targetDataPropRf: Ref<DataItemType[]>) {
  const sourceDataRf = ref([]);
  const targetDataRf = ref([]);

  const sourceFilterDataCp = computed(() => {
    return sourceDataRf.value.filter((item) =>
      item.label.includes(filterSettingRt.source)
    );
  });

  const targetFilterDataCp = computed(() => {
    return targetDataRf.value.filter((item) =>
      item.label.includes(filterSettingRt.target)
    );
  });

  const sourceSettingCp = computed(() => {
    const setting = {
      canCheckedNum: 0,
      checkedNum: 0,
      checkedNotDisabledNum: 0,
      amount: 0
    };

    for (const item of Object.values(sourceDataRf.value)) {
      if (!item.disabled) {
        setting.canCheckedNum++;
      }
      if (item.checked) {
        setting.checkedNum++;
      }
      if (!item.disabled && item.checked) {
        setting.checkedNotDisabledNum++;
      }
      setting.amount =
        (sourceDataPropRf.value && sourceDataPropRf.value.length) || 0;
    }

    return setting;
  });

  const targetSettingCp = computed(() => {
    const setting = {
      canCheckedNum: 0,
      checkedNum: 0,
      checkedNotDisabledNum: 0,
      amount: 0
    };

    for (const item of Object.values(targetDataRf.value)) {
      if (!item.disabled) {
        setting.canCheckedNum++;
      }
      if (item.checked) {
        setting.checkedNum++;
      }
      if (!item.disabled && item.checked) {
        setting.checkedNotDisabledNum++;
      }
      setting.amount =
        (targetDataPropRf.value && targetDataPropRf.value.length) || 0;
    }

    return setting;
  });

  const filterSettingRt = reactive({
    source: '',
    target: ''
  });

  function initSourceData() {
    for (const val of Object.values(sourceDataPropRf.value)) {
      const item: DataItemType = {
        checked: null,
        disabled: null,
        label: null,
        value: null,
        key: null
      };
      item.checked = !!val.checked;
      item.disabled = !!val.disabled;
      item.label = val.label;
      item.value = val.value;
      item.key = val.key || 0;
      sourceDataRf.value.push(item);
    }
  }

  function initTargetData() {
    for (const val of Object.values(targetDataPropRf.value)) {
      const item: DataItemType = {
        checked: null,
        disabled: null,
        label: null,
        value: null,
        key: null
      };
      item.checked = !!val.checked;
      item.disabled = !!val.disabled;
      item.label = val.label;
      item.value = val.value;
      item.key = val.key;
      targetDataRf.value.push(item);
    }
  }

  watch(
    sourceDataPropRf,
    () => {
      initSourceData();
    },
    {
      immediate: true,
      deep: true
    }
  );

  watch(
    targetDataPropRf,
    () => {
      initTargetData();
    },
    {
      immediate: true,
      deep: true
    }
  );

  return {
    sourceDataRf,
    targetDataRf,
    sourceSettingCp,
    targetSettingCp,
    filterSettingRt,
    sourceFilterDataCp,
    targetFilterDataCp
  };
}
