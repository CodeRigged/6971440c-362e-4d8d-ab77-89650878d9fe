<template>
  <div class="text-h3 text-bold pa-3">Public Events</div>
  <v-chip class="ma-2" color="primary">
    <v-icon start icon="mdi-map-marker"></v-icon>
    London
  </v-chip>
  <v-chip class="ma-2">
    <v-icon start icon="mdi-calendar-range"></v-icon>
    {{ earliestAndLatestEventDates }}
  </v-chip>
  <v-divider />
  <div v-for="group in eventsGroupedByDate" :key="group.date">
    <v-sheet
      class="text-h4 pa-3 ma-3 position-sticky"
      style="top: 5px; z-index: 999; opacity: 90%"
    >
      {{ formatDate(group.date, true) }}
    </v-sheet>
    <v-row class="pa-3">
      <v-col cols="4" v-for="event in group.events" :key="event._id">
        <event :event="event" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useEventsStore } from "../store/index";
import { formatDate } from "../utils/index";

const eventStore = useEventsStore();

const { eventsGroupedByDate, earliestAndLatestEventDates } =
  storeToRefs(eventStore);

onBeforeMount(async () => {
  await eventStore.fetchEvents();
});
</script>
