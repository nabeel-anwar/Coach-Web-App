<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  name: 'coach-detail',
};
</script>

<script setup>
import { ref, defineProps, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
//import { useRoute } from 'vue-router';

const props = defineProps(['id']);
//const route = useRoute();
const store = useStore();

const selectedCoach = ref(null);

const fullName = computed(
  () => selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName
);
const areas = computed(() => selectedCoach.value.areas);
const rate = computed(() => selectedCoach.value.hourlyRate);
const description = computed(() => selectedCoach.value.description);
const contactLink = computed(() => '/coaches/' + props.id + '/contact');

onBeforeMount(
  () =>
    (selectedCoach.value = store.getters['coaches/coaches'].find(
      (coach) => coach.id === props.id
    ))
);
</script>
