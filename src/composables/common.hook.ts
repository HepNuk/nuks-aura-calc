import { ref, inject, readonly } from 'vue';
import type { Vue3Mq } from '~/types/global-types';

export function useMq() {
  const mq = inject<Vue3Mq>('mq')!;
  return { mq };
}

export function useQuery<T = any>(fetchFunction: () => Promise<any>) {
  const isLoadingRef = ref(true);
  const isLoading = readonly(isLoadingRef);
  const data = ref<T>();

  function fetchData() {
    isLoadingRef.value = true;

    fetchFunction().then((res) => {
      data.value = res;
      isLoadingRef.value = false;
    });
  }
  fetchData();

  return { data, isLoading, refech: fetchData };
}
