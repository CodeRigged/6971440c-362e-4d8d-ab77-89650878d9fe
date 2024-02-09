<script setup>
import { useEventsStore } from "../store/index";
import { storeToRefs } from "pinia";

const eventStore = useEventsStore();

const { cart, search } = storeToRefs(eventStore);
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>Teclead Events App</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-menu width="400" open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn class="mr-2" v-bind="props"> Sort </v-btn>
      </template>
      <v-sheet class="pa-2">
        <v-list>
          <v-list-item
            @click="
              eventStore.setDescending(false);
              eventStore.sortEvents();
            "
            title="Ascending"
            append-icon="mdi-sort-ascending"
          >
          </v-list-item>
          <v-list-item
            @click="
              eventStore.setDescending(true);
              eventStore.sortEvents();
            "
            title="Descending"
            append-icon="mdi-sort-descending"
          >
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-menu>
    <v-text-field
      density="compact"
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      single-line
      hide-details
    ></v-text-field>

    <v-btn class="ml-6 text-none" stacked>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>

    <v-menu width="400" open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="text-none" stacked>
          <v-badge :content="cart.length">
            <v-icon>mdi-basket-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card class="pa-2">
        <v-card-text v-if="cart.length === 0">No events selected.</v-card-text>

        <v-list v-else>
          <v-list-item v-for="(event, index) in cart" :key="index">
            <v-list-item-title>{{ event.title }}</v-list-item-title>
            <template v-slot:append>
              <v-btn
                size="small"
                flat
                icon="mdi-minus"
                @click="eventStore.removeFromCart(event)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
