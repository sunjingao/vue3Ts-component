import { createApp } from 'vue';

import router from './docs/router/index';

import App from './docs/layout/app/index.vue';
import './docs/css/index.css';
import './docs/css/docs.scss';

import demoBlock from './docs/layout/demoBlock/index.vue';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 美化demo-box展示代码
import 'highlight.js/styles/color-brewer.css';

import { install } from '@/index';

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

const app = createApp(App);
app.component('demo-block', demoBlock);
app.use(install).use(router).mount('#app');
