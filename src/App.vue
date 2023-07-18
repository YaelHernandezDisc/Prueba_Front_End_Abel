<script setup lang="ts"></script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <v-app>
    <v-app-bar flat>
      <v-container class="fill-height d-flex align-center">
        <v-avatar class="me-10 ms-4" color="grey-darken-1" size="32"></v-avatar>

        <!-- <v-btn variant="text"> Home </v-btn>
        <v-btn variant="text"> Hoteles </v-btn>
        <v-btn variant="text"> Login </v-btn> -->

        <!-- <RouterLink to="/">Home</RouterLink> -->
        <v-btn variant="text"
          ><RouterLink to="/uhoteles">Actualizar Hoteles</RouterLink></v-btn
        >
        <v-btn variant="text"
          ><RouterLink to="/hoteles">Hoteles</RouterLink></v-btn
        >
        <v-btn variant="text"><RouterLink to="/login">Login</RouterLink></v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            density="compact"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
