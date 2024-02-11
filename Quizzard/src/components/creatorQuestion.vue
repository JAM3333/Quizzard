
<template>
  <v-card width="80vw" outlined color="transparent" class="mt-5 mb-4">
    <v-toolbar
      class="text-medium-emphasis font-weight-light"
      color="primary"
      title.="title"
    ></v-toolbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    title: "Quizname",
    answer: "This is your answer",
    customInstructions: "",
  }),
  methods: {
  } 
};
</script>
