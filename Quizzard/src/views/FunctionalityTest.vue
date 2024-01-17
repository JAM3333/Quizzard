<script setup>
import SideBar from "../components/Navbar.vue";
import vuetify from "../plugins/vuetify.js";
</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center">
      <v-card width="80vw" height="auto" elevation="12">
        <v-toolbar color="primary" title="Create your Quiz"></v-toolbar>
        <v-toolbar
          class="text-medium-emphasis mt-2 font-weight-light"
          color="secondary"
          title="Create Account"
        ></v-toolbar>
       
        <v-text-field
          label="Username"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          label="Email"
          hide-details="auto"
          type="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          hide-details="auto"
          type="password"
        ></v-text-field>
        <v-btn value="submit" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Create Account
        </v-btn>
        <v-btn value="submit" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Return account by name
        </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    fileData: [],
    customInstructions: "",
    difSelectedButton: "medium",
    answerSelectedButton: "content",
    panel: [0],
  }),
  methods: {
    ReadFiles() {
      const uploadedFiles = this.$refs.fileUpload.files;
      if (uploadedFiles.length > 0) {
        console.log(uploadedFiles[0]);
        this.fileData = [];
        for (let i = 0; i < uploadedFiles.length; i++) {
          var filetype = console.log(uploadedFiles[i].name);
          var reader = new FileReader();
          reader.readAsText(uploadedFiles[i]);
          reader.onload = () => {
            this.fileData.push([uploadedFiles[i].name, reader.result]);
          };
        }
        console.log(this.fileData);
      }
    },
    CreateQuiz(){

    },
    EditQuiz(){

    }
  },
};
</script>
