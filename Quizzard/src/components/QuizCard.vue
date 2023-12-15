<template>
  <v-card>
  <v-card-title>{{ quiz.title }}</v-card-title>
  <v-card-text>
  <div v-for="(question, index) in quiz.questions" :key="index">
          {{ question }}
  </div>
  </v-card-text>
  <v-card-actions>
  <v-btn color="primary" @click="addQuestion">Add Question</v-btn>
  <v-btn color="error" @click="deleteQuiz">Delete Quiz</v-btn>
  </v-card-actions>
  </v-card>
  </template>
   
  <script>
  export default {
  name: 'QuizCard',
  props: {
      quiz: Object,
  },
  methods: {
      addQuestion() {
        this.quiz.questions.push('New Question');
      },
      deleteQuiz() {
        this.$emit('delete');
      },
  },
  };
  </script>