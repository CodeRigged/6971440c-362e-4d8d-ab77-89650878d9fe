<template>
  <v-app>
    <app-bar />
    <v-main scrollable class="bg-grey-lighten-5">
      <loading-overlay v-if="isLoading" />
      <div class="pt-0 pl-4 pr-4 pb-4">
        <router-view
          v-show="!isLoading || !isLoading"
          :key="$route.path"
          v-slot="{ Component }"
        >
          <transition name="slide-fade" mode="out-in">
            <div v-if="Component">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useEventsStore } from "./store/index";

const eventStore = useEventsStore();

const { isLoading } = storeToRefs(eventStore);
</script>
