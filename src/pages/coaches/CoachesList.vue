<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <filter-coach @change-filter="setFilters"></filter-coach>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register"
          >Register as Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
export default {
  name: 'coaches-list',
};
CoachItem;
</script>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import FilterCoach from '../../components/coaches/FilterCoach.vue';

const store = useStore();
const isLoading = ref(false);
const error = ref(null);
const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

const filteredCoaches = computed(() => {
  const coaches = store.getters['coaches/coaches'];

  return coaches.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilters.value.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilters.value.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});
const hasCoaches = computed(
  () => !isLoading.value && store.getters['coaches/hasCoaches']
); //Namespaced/getter Function
const isCoach = computed(() => store.getters['coaches/isCoach']);

const setFilters = function (updatedFilters) {
  activeFilters.value = updatedFilters;
};

onBeforeMount(() => {
  loadCoaches();
});

const loadCoaches = async function () {
  isLoading.value = true;
  try {
    await store.dispatch('coaches/loadCoaches');
  } catch (errors) {
    error.value = errors.message || 'Something went wrong!';
  }
  isLoading.value = false;
};

const handleError = function () {
  error.value = null;
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
