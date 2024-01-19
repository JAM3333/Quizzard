<template>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-alpha-q"
            title= "Qizzard"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-plus-circle-outline" title="Create Quiz" value="CreateQuiz"></v-list-item>
          <v-list-item prepend-icon="mdi-folder" title="My Quizzes" value="myQuiz"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Fwiends" value="friends"></v-list-item>
          <v-divider></v-divider>
        </v-list>
        <v-list density="compact" nav class="align-end">
          <v-list-item prepend-icon="mdi-account" title="Fwiends" class="align-end"></v-list-item>
        <!-- Website for icons: https://pictogrammers.com/library/mdi/ -->
        </v-list>
      </v-navigation-drawer>

</template>

<script>
 export default {
  name: 'Navbar',
  Username: 'fish',
  };
</script>
