<template>
  <div>
    <slot name="rightLabel" />
    <select v-model="modelValueCoopy" v-bind="$attrs">
      <option
        v-for="option in options"
        :key="`${option.label}-${option.label}`"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <slot name="leftLabel" />
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { IMySelectOptions } from '~/types/global-components';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },

  options: {
    type: Array as PropType<IMySelectOptions[]>,
    default: () => [] as IMySelectOptions[],
  },
});

const emit = defineEmits(['update:modelValue']);

const modelValueCoopy = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});
</script>

<style lang="scss" scoped>
select {
  border: 1px solid #ccc;
  background: #222;
  font-size: 14px;
  color: #fff;
  line-height: 25px;
  padding: 2px;
  width: 95px;
  margin-right: 3px;
  height: 27px;
}
</style>
