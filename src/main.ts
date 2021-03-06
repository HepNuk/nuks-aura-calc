import { createApp } from 'vue';
import App from './App.vue';

import AuraTranslator from '@/plugins/AuraTranslator';
import AurasServices from '@/services/AurasServices';

import FontAwesomeIcon from '@/utils/fontawesome-icons';

import { Vue3Mq } from 'vue3-mq';

import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';

AurasServices.getStatTranslation('stat_translations/aura_skill').then(async (translations) => {
  const app = createApp(App);

  const bannerTranslations = await AurasServices.getStatTranslation('stat_translations/banner_aura_skill');
  const skillTranslations = await AurasServices.getStatTranslation('stat_translations/skill');
  const t = new AuraTranslator(translations, bannerTranslations, skillTranslations);
  app.component('fa', FontAwesomeIcon);
  app.config.globalProperties.$getAuraStat = (aura: any) => t.getAuraStat(aura);
  app.config.globalProperties.$getQualityStat = (aura: any) => t.getQualityStat(aura);
  app.use(VueUniversalModal, {
    teleportTarget: '#my-modal',
    modalComponent: 'Modal'
  });
  app.use(Vue3Mq, {
    breakpoints: {
      xs: 0,
      sm: 1000,
      md: 1375,
      lg: 1765,
      xl: 2100,
  }});
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
