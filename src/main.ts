import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { FontAwesomeIcon } from '~/utils/fontawesome-icons';
import { Vue3Mq } from 'vue3-mq';

const app = createApp(App);

// eslint-disable-next-line vue/multi-word-component-names
app.component('Fa', FontAwesomeIcon);
app.use(Vue3Mq, {});
app.mount('#app');
