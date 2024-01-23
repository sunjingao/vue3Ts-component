import comp from './src/directive';
import { App } from 'vue';

export default {
  install(app: App) {
    app.directive(comp.name, comp);
  }
};
