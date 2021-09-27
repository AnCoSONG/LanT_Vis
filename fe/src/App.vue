<template>
<!-- <router-view v-slot="{Component}"> -->
<transition name="slide-fade" mode="out-in">
  <router-view></router-view>
  <!-- <component :is="Component"></component> -->
</transition>
<!-- </router-view> -->
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
