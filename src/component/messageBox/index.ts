import comp from './src/index.vue';
import serve from './src/service';
import { App } from 'vue';

export default {
  install(app: App) {
    app.component(comp.name, comp);
    app.config.globalProperties.$messageBox = serve;
  }
};
