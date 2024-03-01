<template>
      <v-navigation-drawer expand-on-hover rail style="position: fixed;">
        <v-list density="compact" nav>
          <v-list-item :to="{path: '/home'}" prepend-icon="mdi-alpha-q" title= "Qizzard"></v-list-item>
        </v-list>

        <v-divider></v-divider>
<!-- Website for icons: https://pictogrammers.com/library/mdi/ -->
        <v-list density="compact" class="d-flex justify space-between flex-column" nav>
            <v-list-item prepend-icon="mdi-plus-circle-outline" title="Create Quiz" value="CreateQuiz" :to="{path: '/quizcreator'}"></v-list-item>
          <v-list-item prepend-icon="mdi-magnify" title="Discover" value="discover" :to="{path: '/home'}"></v-list-item>
          <v-list-item prepend-icon="mdi-folder" title="My Quizzes" value="myQuiz" :to="{path: '/home'}"></v-list-item>
        </v-list>
        <template v-slot:append>
          <v-divider></v-divider>
          <v-list density="compact" nav>

            <v-list-item prepend-avatar="../assets/logo.png" title="Username" value="Account">
              <v-icon @click="logout()" style="position: absolute; left: 210px; right: 0; bottom: 8px; " color="error">mdi-logout</v-icon>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
</template>

<script>
 export default {
  name: 'Navbar',
  Username: 'fish',
  methods: {
    logout() {
      alert("rip bozo");
    },
  }
  };

</script>
