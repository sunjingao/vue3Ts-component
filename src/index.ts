import { App } from 'vue';

import './asset/font/iconfont.css';
import './css/index.scss';

import Button from './component/button/index';
import ButtonGroup from './component/buttonGroup/index';
import Link from './component/link/index';
import Radio from './component/radio/index';
import RadioButton from './component/radioButton/index';
import RadioGroup from './component/radioGroup/index';
import Checkbox from './component/checkbox/index';
import CheckboxButton from './component/checkboxButton/index';
import CheckboxGroup from './component/checkboxGroup/index';
import Input from './component/input/index';
import Textarea from './component/textarea/index';
import Autocomplete from './component/autocomplete/index';
import InputNumber from './component/inputNumber/index';
import Select from './component/select/index';
import Cascader from './component/cascader/index';
import OptionGroup from './component/optionGroup/index';
import OptionType from './component/option/index';
import Tag from './component/tag/index';
import Switch from './component/switch/index';
import Slider from './component/slider/index';
import Timepicker from './component/timepicker/index';
import Transfer from './component/transfer/index';
import Datepicker from './component/datepicker/index';
import Rate from './component/rate/index';
import Progress from './component/progress/index';
import Pagination from './component/pagination/index';
import Tooltip from './component/tooltip/index';
import Badge from './component/badge/index';
import Alert from './component/alert/index';
import PageHeader from './component/pageHeader/index';
import Popover from './component/popover/index';
import Divider from './component/divider/index';
import Image from './component/image/index';
import InfiniteScroll from './component/infiniteScroll/index';
import Loading from './component/loading/index';
import Message from './component/message/index';
import Notification from './component/notification/index';
import MessageBox from './component/messageBox/index';
import Tabs from './component/tabs/index';
import TabPane from './component/tabPane/index';
import Breadcrumb from './component/breadcrumb/index';
import BreadcrumbItem from './component/breadcrumbItem/index';
import Dropdown from './component/dropdown/index';
import DropdownMenu from './component/dropdownMenu/index';
import DropdownItem from './component/dropdownItem/index';
import Steps from './component/steps/index';
import Step from './component/step/index';
import Dialog from './component/dialog/index';
import Carousel from './component/carousel/index';
import CarouselItem from './component/carouselItem/index';
import Collapse from './component/collapse/index';
import CollapseItem from './component/collapseItem/index';
import Timeline from './component/timeline/index';
import TimelineItem from './component/timelineItem/index';
import Tree from './component/tree/index';
import BackTop from './component/backTop/index';
import Card from './component/card/index';

import Popper from '@sunjingao/popper';
window.Popper = Popper;

const comps = [
  Button,
  ButtonGroup,
  Link,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Input,
  Textarea,
  Autocomplete,
  InputNumber,
  Tag,
  Select,
  Cascader,
  OptionGroup,
  OptionType,
  Switch,
  Slider,
  Timepicker,
  Transfer,
  Rate,
  Progress,
  Pagination,
  Tooltip,
  Datepicker,
  Badge,
  Alert,
  PageHeader,
  Popover,
  Divider,
  Image,
  InfiniteScroll,
  Loading,
  Message,
  Notification,
  MessageBox,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Steps,
  Step,
  Dialog,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Timeline,
  TimelineItem,
  Tree,
  BackTop,
  Card
];

function install(app: App) {
  comps.forEach((item) => {
    item.install(app);
  });
}

export {
  install,
  Button,
  ButtonGroup,
  Link,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Input,
  Textarea,
  Autocomplete,
  InputNumber,
  Tag,
  Select,
  Cascader,
  OptionGroup,
  OptionType,
  Switch,
  Slider,
  Rate,
  Timepicker,
  Transfer,
  Progress,
  Pagination,
  Tooltip,
  Datepicker,
  Badge,
  Alert,
  PageHeader,
  Popover,
  Divider,
  Image,
  InfiniteScroll,
  Loading,
  Message,
  Notification,
  MessageBox,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Steps,
  Step,
  Dialog,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Timeline,
  TimelineItem,
  Tree,
  BackTop,
  Card
};
