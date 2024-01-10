<script setup>
  import FileManager from "../classes/file.js";
</script>


<template>
  <v-container class="align-left">
    <v-btn color="primary" @click="AddFile">Add File</v-btn>
    <v-file-input clearable label="File input" variant="outlined" multiple show-size @change="ReadFiles" ref="fileUpload"></v-file-input>
  </v-container>
</template>

<script>
var fileManager = new FileManager();
export default {
  data: () => ({
    fileData: [],
    customInstructions: "",
  }),
  methods: {
    ReadFiles(){
      const uploadedFiles = this.$refs.fileUpload.files;
      if (uploadedFiles.length > 0){
        console.log(uploadedFiles[0])
        this.fileData = [];
        for (let i = 0; i < uploadedFiles.length;i++){
          var filetype = 
          console.log(uploadedFiles[i].name);
          var reader = new FileReader();
          reader.readAsText(uploadedFiles[i]);
          reader.onload = () => {
            this.fileData.push([uploadedFiles[i].name,reader.result]);
          }
        }
        console.log(this.fileData)
      }
    },
  } 
};
</script>
