import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Fa: typeof FontAwesomeIcon,
  }
}

export {}
