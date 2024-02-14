<script setup>
import SideBar from "../components/Navbar.vue";
import creatorQuestion from "../components/creatorQuestion.vue";
import vuetify from "../plugins/vuetify.js";
</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center">
      <v-card width="80vw" color="secondary" height="85vh" class="d-flex align-center flex-column" id="quizCreate" elevation="12">
        <v-toolbar color="primary" title="Create your Quiz"></v-toolbar>
        <v-card width="80vw" outlined color="transparent" class="mt-5 mb-4">
          <v-toolbar
            class="text-medium-emphasis font-weight-light"
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
        </v-card>
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
            color="primary"
          >
            <v-expansion-panel-text>
              <v-textarea label="Your instructions"></v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn value="submit" v-on:click="CreateQuiz" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Generate Quiz
        </v-btn>
      </v-card>
      <v-card width="80vw" color="secondary" height="85vh" class="d-none align-center flex-column" id="quizEdit" elevation="12">
        <v-toolbar color="primary" title="Quiz">  
          <v-text-field
            v-model="quizName"
            hide-details
            density="compact"
            type="text"
            class="mr-4"
          ></v-text-field>
        </v-toolbar> 
        <v-card width="80vw" height="80vh" outlined color="transparent" class="mt-5 mb-4 overflow-y-auto">
          <creatorQuestion></creatorQuestion>         
        </v-card> 
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
    quizName: "",
    returnedData: {
      "QuizName": "My quiz 1",
      "QuizDifficulty": 0, //Easy=0;Medium=1;Difficult=2
      "AnswerRating": 0, //AI=0;Wording=1
      "Questions": [
        {
          "Question": "How to eat?",
          "Type": 0, // Text = 0
          "AnswerRating": 0,
          "Answers": "You eat"
        },
        {
          "Question": "How to food?",
          "Type": 0, // Text = 0
          "AnswerRating": 0,
          "Answers": "food"
        },
        {
          "Question": "What is food?",
          "Type": 1, // Multiple Choice = 1
          "Answer": 1, // which answer in answers is correct
          "Answers": 
            {
              "Answer1": "Bread is food",
              "Answer2": "Table is food",
              "Answer3": "Egg is food",
              "Answer4": "Brick is food",
            },
        },
      ] 
    }
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
        document.getElementById('quizCreate').classList.remove("d-flex");
        document.getElementById('quizCreate').classList.add("d-none");
        document.getElementById('quizEdit').classList.remove("d-none");
        document.getElementById('quizEdit').classList.add("d-flex");
        this.quizName = this.returnedData.QuizName;
        
        //Container-Div für alle Fragen
        let questionContainer = document.createElement("div");
        questionContainer.classList.add("questionContainer");
        document.getElementById('quizEdit').append(questionContainer);

        //Iteriert über das JSON-Array
        for (let i = 0; i < this.returnedData.Questions.length; i++) {
          
          let questionData = this.returnedData.Questions[i];
          let answerType = questionData.Type;
          let answerData = questionData.Answers;
          //Erstellt ein Div für jede Frage und fügt dem div die Klasse "question" hinzu. Kann mit CSS dann gestyled werden
          let questionDiv = document.createElement("div");
          questionDiv.classList.add("question"); 

          //Der Text der Frage wird als h1-Element dargestellt
          let questionText = document.createElement("h1");
          questionText.textContent = (i+1) + ". " + questionData.Question;
          
          let questionAnswers;
          //Überprüft, ob es eine Multiple-Choice, oder eine Textfrage ist
          if (answerType == 0) {
            questionAnswers = document.createElement("input");
            questionAnswers.setAttribute("type", "text");
            questionAnswers.placeholder = "Lösung hier...";
          }
          else if (answerType == 1) {
        questionAnswers = document.createElement("div");

        //Iteriert über die Antworten, um dementsprechend Checkboxen dafür zu generieren -- Diese Schleife wurde von ChatGPT generiert
        for (let j = 1; j <= Object.keys(answerData).length; j++) {
          const answerCheckbox = document.createElement("input");
          answerCheckbox.setAttribute("type", "checkbox");
          answerCheckbox.setAttribute("id", `answer${j}`);
          const answerLabel = document.createElement("label");
          answerLabel.setAttribute("for", `answer${j}`);
          answerLabel.textContent = answerData[`Answer${j}`];

        //Fügt Checkbox und Label zum Antwort-Div hinzu
          questionAnswers.appendChild(answerCheckbox);
          questionAnswers.appendChild(answerLabel);
        }
      }
  
          //Dem Body wird das Div hinzugefügt und die Überschrift in das Div implementiert
          questionDiv.appendChild(questionText);
          questionDiv.appendChild(questionAnswers);
          questionContainer.appendChild(questionDiv); 

          
}


    },
    EditQuiz(){

    }
  },
};
</script>
<style scoped>
.questionContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute; 
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>