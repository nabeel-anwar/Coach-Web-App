<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h1 v-else>No coaches found</h1>
  </section>
</template>

<script>
export default {
  name: 'coaches-list',
};
</script>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const filteredCoaches = computed(() => store.getters['coaches/coaches']);
const hasCoaches = computed(() => store.getters['coaches/hasCoaches']); //Namespaced/getter Function
</script>
