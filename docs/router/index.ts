import { createRouter, createWebHashHistory } from 'vue-router';

const instructions = () =>
  import(
    /* webpackChunkName: "instructions" */ '../layout/instructions/index.vue'
  );
const changeLog = () =>
  import(/* webpackChunkName: "changeLog" */ '../layout/changeLog/index.vue');

const button = () =>
  import(/* webpackChunkName: "button" */ '../component/button/index.md');
const link = () =>
  import(/* webpackChunkName: "link" */ '../component/link/index.md');
const radio = () =>
  import(/* webpackChunkName: "radio" */ '../component/radio/index.md');
const checkbox = () =>
  import(/* webpackChunkName: "checkbox" */ '../component/checkbox/index.md');
const input = () =>
  import(/* webpackChunkName: "input" */ '../component/input/index.md');
const textarea = () =>
  import(/* webpackChunkName: "textarea" */ '../component/textarea/index.md');
const autocomplete = () =>
  import(
    /* webpackChunkName: "autocomplete" */ '../component/autocomplete/index.md'
  );
const inputNumber = () =>
  import(/* webpackChunkName: "inputNumber" */ '../component/inputNumber/index.md');
const select = () =>
  import(/* webpackChunkName: "select" */ '../component/select/index.md');
const cascader = () =>
  import(/* webpackChunkName: "cascader" */ '../component/cascader/index.md');
const switchC = () =>
  import(/* webpackChunkName: "switchC" */ '../component/switch/index.md');
const slider = () =>
  import(/* webpackChunkName: "slider" */ '../component/slider/index.md');
const timePicker = () =>
  import(/* webpackChunkName: "timePicker" */ '../component/timePicker/index.md');
const datePicker = () =>
  import(/* webpackChunkName: "datePicker" */ '../component/datePicker/index.md');
const rate = () =>
  import(/* webpackChunkName: "rate" */ '../component/rate/index.md');
const transfer = () =>
  import(/* webpackChunkName: "transfer" */ '../component/transfer/index.md');
const tag = () => import(/* webpackChunkName: "tag" */ '../component/tag/index.md');
const progress = () =>
  import(/* webpackChunkName: "progress" */ '../component/progress/index.md');
const tree = () =>
  import(/* webpackChunkName: "tree" */ '../component/tree/index.md');
const pagination = () =>
  import(/* webpackChunkName: "pagination" */ '../component/pagination/index.md');
const badge = () =>
  import(/* webpackChunkName: "badge" */ '../component/badge/index.md');
const alert = () =>
  import(/* webpackChunkName: "alert" */ '../component/alert/index.md');
const loading = () =>
  import(/* webpackChunkName: "loading" */ '../component/loading/index.md');
const message = () =>
  import(/* webpackChunkName: "message" */ '../component/message/index.md');
const messageBox = () =>
  import(/* webpackChunkName: "messageBox" */ '../component/messageBox/index.md');
const notification = () =>
  import(
    /* webpackChunkName: "notification" */ '../component/notification/index.md'
  );
const navMenu = () =>
  import(/* webpackChunkName: "navMenu" */ '../component/navMenu/index.md');
const tabs = () =>
  import(/* webpackChunkName: "tabs" */ '../component/tabs/index.md');
const breadcrumb = () =>
  import(/* webpackChunkName: "breadcrumb" */ '../component/breadcrumb/index.md');
const pageHeader = () =>
  import(/* webpackChunkName: "pageHeader" */ '../component/pageHeader/index.md');
const dropdown = () =>
  import(/* webpackChunkName: "dropdown" */ '../component/dropdown/index.md');
const steps = () =>
  import(/* webpackChunkName: "steps" */ '../component/steps/index.md');
const dialog = () =>
  import(/* webpackChunkName: "dialog" */ '../component/dialog/index.md');
const tooltip = () =>
  import(/* webpackChunkName: "tooltip" */ '../component/tooltip/index.md');
const popover = () =>
  import(/* webpackChunkName: "popover" */ '../component/popover/index.md');
const card = () =>
  import(/* webpackChunkName: "card" */ '../component/card/index.md');
const carousel = () =>
  import(/* webpackChunkName: "carousel" */ '../component/carousel/index.md');
const collapse = () =>
  import(/* webpackChunkName: "collapse" */ '../component/collapse/index.md');
const timeline = () =>
  import(/* webpackChunkName: "timeline" */ '../component/timeline/index.md');
const divider = () =>
  import(/* webpackChunkName: "divider" */ '../component/divider/index.md');
const image = () =>
  import(/* webpackChunkName: "image" */ '../component/image/index.md');
const backTop = () =>
  import(/* webpackChunkName: "backTop" */ '../component/backTop/index.md');
const infiniteScroll = () =>
  import(
    /* webpackChunkName: "infiniteScroll" */ '../component/infiniteScroll/index.md'
  );

export default createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/instructions' },
    { path: '/instructions', component: instructions },
    { path: '/change-log', component: changeLog },
    { path: '/button', component: button },
    { path: '/link', component: link },
    { path: '/radio', component: radio },
    { path: '/checkbox', component: checkbox },
    { path: '/input', component: input },
    { path: '/textarea', component: textarea },
    { path: '/autocomplete', component: autocomplete },
    { path: '/inputNumber', component: inputNumber },
    { path: '/select', component: select },
    { path: '/cascader', component: cascader },
    { path: '/switch', component: switchC },
    { path: '/slider', component: slider },
    { path: '/timePicker', component: timePicker },
    { path: '/datePicker', component: datePicker },
    { path: '/rate', component: rate },
    { path: '/transfer', component: transfer },
    { path: '/tag', component: tag },
    { path: '/progress', component: progress },
    { path: '/tree', component: tree },
    { path: '/pagination', component: pagination },
    { path: '/badge', component: badge },
    { path: '/alert', component: alert },
    { path: '/loading', component: loading },
    { path: '/message', component: message },
    { path: '/messageBox', component: messageBox },
    { path: '/notification', component: notification },
    { path: '/navMenu', component: navMenu },
    { path: '/tabs', component: tabs },
    { path: '/breadcrumb', component: breadcrumb },
    { path: '/pageHeader', component: pageHeader },
    { path: '/dropdown', component: dropdown },
    { path: '/steps', component: steps },
    { path: '/dialog', component: dialog },
    { path: '/tooltip', component: tooltip },
    { path: '/popover', component: popover },
    { path: '/card', component: card },
    { path: '/carousel', component: carousel },
    { path: '/collapse', component: collapse },
    { path: '/timeline', component: timeline },
    { path: '/divider', component: divider },
    { path: '/image', component: image },
    { path: '/backTop', component: backTop },
    { path: '/infiniteScroll', component: infiniteScroll },

    {
      path: '/:catchAll(.*)',
      redirect: { path: '/instructions' }
    }
  ]
});
