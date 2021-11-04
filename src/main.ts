import { createApp } from 'vue';
import App from './App.vue';
import AuraTranslator from '@/plugins/AuraTranslator';
import AurasServices from '@/services/AurasServices';

AurasServices.getStatTranslation('stat_translations/aura_skill').then(async (translations) => {
  const bannerTranslations = await AurasServices.getStatTranslation('stat_translations/banner_aura_skill');
  const t = new AuraTranslator(translations, bannerTranslations);

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
