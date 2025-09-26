<script setup>
import {ref, watch} from 'vue';
import Calendar  from 'primevue/calendar';
import DateUtils from "@/common/dateUtils";

const props = defineProps({
  date: {
    type: String,
    default: DateUtils.getToday()
  }
})

const emit = defineEmits(['updateDate']);

const dateValue = ref(props.date);

watch(dateValue, (newVal) => {
  emit('updateDate', DateUtils.getDateFormat(newVal));
})

</script>

<template>
  <Calendar v-model="dateValue" dateFormat="yy-mm-dd" show-icon>
  </Calendar>
</template>