<template>
  <v-container class="align-left">
    <v-btn color="primary" @click="addQuestion">Add Question</v-btn>
    <v-file-input
      v-model="files"
      label="Choose file(s)"
      multiple
      show-size
    ></v-file-input>
    <v-btn>Upload</v-btn>
  </v-container>

    
  
</template>

<script>
export default {
  name: 'FuncTest',
   data() {
    return {
      files: [] // Hier werden die hochgeladenen Dateien gespeichert
    };
   },
  methods: {
    addQuestion() {
      // Hier könnte Logik für das Hinzufügen einer Frage stehen
    },
  }
};
</script>
