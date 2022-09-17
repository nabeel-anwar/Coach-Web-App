<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
export default {
  name: 'coach-registration',
};
</script>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CoachForm from '../../components/coaches/CoachForm.vue';

const router = useRouter();
const store = useStore();

const saveData = function (data) {
  store.dispatch('coaches/registerCoach', data);
  router.replace('/coaches');
};
</script>
