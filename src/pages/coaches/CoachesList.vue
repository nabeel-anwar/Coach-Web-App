<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="register">Register as Coach</router-link>
    </div>
    List of Coaches
  </section>
</template>

<script>
export default {
  name: 'coaches-list',
};
</script>

<script setup>
import { ref } from 'vue';
const title = ref(null);
title.value = 'Coaches Page';
</script>
