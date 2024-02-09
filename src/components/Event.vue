<template>
  <v-card class="mx-auto overflow-auto d-flex flex-column" height="800">
    <v-card-title
      class="text-break pt-5"
      style="white-space: initial; height: 150px"
    >
      <v-row>
        <v-col cols="2">
          <v-avatar
            image="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
          ></v-avatar>
        </v-col>
        <v-col class="text-start">
          {{ title }}
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-img
            height="400"
            :src="flyerFront"
            lazy-src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
          ></v-img>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row align="baseline">
        <v-col cols="1">
          <v-icon>mdi-map-marker</v-icon>
        </v-col>
        <v-col>
          <v-btn :href="venue.direction" target="_blank" text flat>
            {{ venue.name }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="1"></v-col>
        <v-col>
          Start:
          {{ formatDate(startTime) }}
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="1"></v-col>
        <v-col>
          End:
          {{ formatDate(endTime) }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-spacer />
    <v-card-actions class="mx-1">
      <v-spacer></v-spacer>
      <v-btn
        size="x-large"
        icon="mdi-plus"
        color="primary"
        @click="eventStore.addToCart(event)"
      >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { Event, useEventsStore } from "../store/index";
import { formatDate } from "../utils/index";
const eventStore = useEventsStore();
const props = defineProps({
  event: { type: Object as PropType<Event>, required: true },
});

const { title, flyerFront, venue, startTime, endTime } = props.event;
</script>
