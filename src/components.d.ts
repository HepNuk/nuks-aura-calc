import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { globalComponents } from '~/globalComponents';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Fa: typeof FontAwesomeIcon;
    MySpinner: typeof globalComponents.MySpinner;
    MyInput: typeof globalComponents.MyInput;
    MySelect: typeof globalComponents.MySelect;
    MyCol: typeof globalComponents.MyRow;
    MyRow: typeof globalComponents.MyCol;
  }
}

export {};
