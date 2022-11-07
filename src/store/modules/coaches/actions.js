export default {
  async registerCoach(context, data) {
    const coachId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    try {
      const response = await fetch(
        `https://vue-http-demo-7b13e-default-rtdb.firebaseio.com/coaches/${coachId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );
      if (!response.ok) throw new Error('Error while registring coach');

      // const data = await response.json();
    } catch (error) {
      console.log(error.message);
    }

    context.commit('registerCoach', { ...coachData, id: coachId });
  },
  async loadCoaches(context) {
    try {
      const response = await fetch(
        `https://vue-http-demo-7b13e-default-rtdb.firebaseio.com/coaches.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Error while getting coaches');
      }

      const coaches = [];

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        coaches.push(coach);
      }

      context.commit('setCoaches', coaches);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
