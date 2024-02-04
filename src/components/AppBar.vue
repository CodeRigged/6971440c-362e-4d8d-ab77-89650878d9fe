<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>Teclead Events App</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-text-field
      density="compact"
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      single-line
      hide-details
    ></v-text-field>

    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>
