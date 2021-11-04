import { createApp } from 'vue';
import App from './App.vue';
import AuraTranslator from './plugins/AuraTranslator';
import AurasServices from './services/AurasServices';

AurasServices.getStatTranslation('stat_translations/aura_skill').then((translations) => {
  const t = new AuraTranslator(translations);

  const app = createApp(App);
  app.config.globalProperties.$t = t;
  app.mount('#app');
});


// Global Module declarations
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: AuraTranslator;
  }
}
