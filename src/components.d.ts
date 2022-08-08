import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { globalComponents } from '~/globalComponents/index';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Fa: typeof FontAwesomeIcon;
    MySpinner: typeof globalComponents.MySpinner;
    MyInput: typeof globalComponents.MyInput;
    MySelect: typeof globalComponents.MySelect;
  }
}

export {};
