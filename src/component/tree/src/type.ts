import comp from './index.vue';

// eslint-disable-next-line @typescript-eslint/ban-types
type ProvideValType = {
  changeCheck: AnyCb,
  changeSelect: AnyCb,
  changeExpand: AnyCb
};

type InstanceType = CompInstanceType<typeof comp>;

type NodeItemType = {
  key: string,
  label: string,
  nodeList: NodeItemType[]
}

type ExpandOpsType = {
  expandAll: boolean,
  defaultExpandedKeys: string[]
}

type CheckedOpsType = {
  isShow: boolean,
  checkedAll: boolean,
  defaultCheckedKeys: string[]
}

type SelectedOpsType = {
  parentSelected: boolean,
  defaultSelectedKeys: string
}

type InnerNodeType = {
  key: string,
  label: string,
  nodeList: InnerNodeType[] | null,
  disabled: boolean,
  selected: boolean,
  checkType: number,
  expandNode: boolean,
  parentNode: NodeItemType,
  isParent: boolean,
}

export {
  ProvideValType,
  InstanceType,
  NodeItemType,
  ExpandOpsType,
  CheckedOpsType,
  SelectedOpsType,
  InnerNodeType
};
