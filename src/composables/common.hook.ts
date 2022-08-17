import { ref, inject, readonly, computed } from 'vue';
import type { Vue3Mq } from '~/types/global-types';

export function imageUrl(imagePath: string, metaUrl = import.meta.url) {
  const url = new URL(`/src/assets/${imagePath}`, metaUrl);
  return url.href;
}

export function useMq() {
  const mqInjected = inject<Vue3Mq>('mq')!;
  const mq = computed(() => mqInjected.current);
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
