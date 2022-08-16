import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import { FontAwesomeIcon } from '~/utils/fontawesome-icons';
import { Vue3Mq } from 'vue3-mq';
import { globalComponents } from '~/globalComponents';
import { getStatTranslations } from './composables/useLoadAuras.hooks';

async function createAuraApp() {
  const { translations, bannerTranslations, skillTranslations } =
    await getStatTranslations();

  const app = createApp(App);
  app.provide('bannerTranslations', bannerTranslations);
  app.provide('skillTranslations', skillTranslations);
  app.provide('translation', translations);

  Object.keys(globalComponents).forEach((k) => {
    app.component(k, globalComponents[k as keyof typeof globalComponents]);
  });

  // eslint-disable-next-line vue/multi-word-component-names
  app.component('Fa', FontAwesomeIcon);
  app.use(Vue3Mq, {});
  app.mount('#app');
}

createAuraApp();
