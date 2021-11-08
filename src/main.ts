import { createApp } from 'vue';
import App from './App.vue';
import AuraTranslator from '@/plugins/AuraTranslator';
import AurasServices from '@/services/AurasServices';

AurasServices.getStatTranslation('stat_translations/aura_skill').then(async (translations) => {
  const app = createApp(App);

  const bannerTranslations = await AurasServices.getStatTranslation('stat_translations/banner_aura_skill');
  const t = new AuraTranslator(translations, bannerTranslations);

  app.config.globalProperties.$getAuraStat = (aura: any) => t.getAuraStat(aura);
  app.config.globalProperties.$getQualityStat = (aura: any) => t.getQualityStat(aura);
  app.mount('#app');
});


// Global Module declarations
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $errorLoading: boolean;
    $getAuraStat: (aura: any) => string[];
    $getQualityStat: (aura: any) => string[][];
  }
}