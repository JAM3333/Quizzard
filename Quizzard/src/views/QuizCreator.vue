<script setup>
import SideBar from "../components/Navbar.vue";
import vuetify from "../plugins/vuetify.js";
</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center" height="100vh">
      <v-card width="80vw" elevation="12">
    <v-toolbar color="primary" title="Create your Quiz"></v-toolbar>
    <v-expansion-panels>
      <v-expansion-panel title="Upload your Files">
        <v-expansion-panel-text>
          <v-file-input clearable label="File input" variant="outlined" multiple show-size @change="ReadFiles" ref="fileUpload"></v-file-input>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel title="Quiz Options"></v-expansion-panel>
      <v-expansion-panel title="Custom Instructions"></v-expansion-panel>
    </v-expansion-panels>
  </v-card>
    </v-main>
  </v-app>
 
</template>


<script>
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



