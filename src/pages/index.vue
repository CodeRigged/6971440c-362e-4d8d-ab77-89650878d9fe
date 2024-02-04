<template>
  <div>{{ events }}</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useEventsStore } from "../store/index";

const eventStore = useEventsStore();

const { events } = storeToRefs(eventStore);

onBeforeMount(() => {
  eventStore.fetchEvents();
});
</script>
