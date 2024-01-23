import comp from './src/service';
import { App } from 'vue';

export default {
  install(app: App) {
    app.config.globalProperties.$message = comp;
  }
};
