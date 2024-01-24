<script setup>
import SideBar from "../components/Navbar.vue";
import vuetify from "../plugins/vuetify.js";
</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center">
 l     <v-card width="80vw" color="secondary" height="auto" class="d-flex align-center flex-column pl-3 pr-3" elevation="12">
        <v-toolbar color="primary" title="Create your Quiz"></v-toolbar>
        <v-toolbar
          class="text-medium-emphasis mt-2 font-weight-light"
          color="primary"
          title="Upload your files"
        ></v-toolbar>
        <v-file-input
          class="mt-4"
          clearable
          label="File input"
          variant="outlined"
          multiple
          show-size
          @change="ReadFiles"
          ref="fileUpload"
        ></v-file-input>
        <v-expansion-panels v-model="panel">
          <v-expansion-panel expand title="Quiz Options" color="primary">
            <v-expansion-panel-text :style="{background: $vuetify.theme.themes.background}">
              <v-card class="pa-4 d-flex align-center">
                <span class="text-medium-emphasis ms-1 font-weight-light">
                  Quiz Difficulty
                </span>

                <v-spacer></v-spacer>

                <v-btn-toggle
                  rounded="4"
                  color="button"
                  v-model="difSelectedButton"
                  group
                  mandatory
                >
                  <v-btn value="easy"> EASY </v-btn>

                  <v-btn value="medium"> MEDIUM </v-btn>

                  <v-btn value="difficult"> DIFFICULT </v-btn>
                </v-btn-toggle>
              </v-card>
              <v-card class="pa-4 d-flex align-center fit-content">
                <span class="text-medium-emphasis ms-1 font-weight-light">
                  Question Count
                </span>

                <v-spacer></v-spacer>

                <v-card class="d-flex mr-4  .justify-space-between flex-column" width="20vw">
                  <v-toolbar
                    class="text-medium-emphasis font-weight-light"
                    color="secondary"
                    title="Multiple Choice"
                  ></v-toolbar>
                  <v-slider
                    v-model="sliderMultipleChoice"
                    :max="sliderMax"
                    :min="sliderMin"
                    :step="1"
                    class="pl-2"
                    hide-details
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="sliderMultipleChoice"
                        hide-details
                        single-line
                        :max="sliderMax"
                        :min="sliderMin"
                        :step="1"
                        density="compact"
                        type="number"
                        style="width: 5vw"
                      ></v-text-field>
                    </template>
                  </v-slider>                  
                </v-card>     
                <v-card class="d-flex mr-4  .justify-space-between flex-column" width="20vw">
                  <v-toolbar
                    class="text-medium-emphasis font-weight-light"
                    color="secondary"
                    title="Text"
                  ></v-toolbar>
                  <v-slider
                    v-model="sliderText"
                    :max="sliderMax"
                    :min="sliderMin"
                    :step="1"
                    class="pl-2"
                    hide-details
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="sliderText"
                        hide-details
                        single-line
                        :max="sliderMax"
                        :min="sliderMin"
                        :step="1"
                        density="compact"
                        type="number"
                        style="width: 5vw"
                      ></v-text-field>
                    </template>
                  </v-slider>                  
                </v-card>           
              </v-card>
              <v-card class="pa-4 d-flex align-center">
                <span class="text-medium-emphasis ms-1 font-weight-light">
                  Answer Rating
                </span>

                <v-spacer></v-spacer>

                <v-btn-toggle
                  rounded="4"
                  color="button"
                  v-model="answerSelectedButton"
                  group
                  mandatory
                >
                  <v-btn value="content"> Content (AI) </v-btn>

                  <v-btn value="exact"> Exact (Wording) </v-btn>
                </v-btn-toggle>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            expand
            title="Custom Instructions"
            color="secondary"
          >
            <v-expansion-panel-text>
              <v-textarea label="Your instructions"></v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn value="submit" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Generate Quiz
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
    sliderMultipleChoice: 2,
    sliderText: 8,
    sliderMin: 0,
    sliderMax: 16,
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
