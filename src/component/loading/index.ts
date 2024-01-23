import dir from './src/directive';
import serve from './src/service';
import { App } from 'vue';

export default {
  install(app: App) {
    app.directive(dir.name, dir);
    app.config.globalProperties.$loading = serve;
  }
};
