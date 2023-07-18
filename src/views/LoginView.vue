<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-card
        class="mx-auto pa-12 pb-5"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          density="compact"
          v-model="email"
          placeholder="Email address"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a
          >
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          v-model="password"
          placeholder="Enter your password"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            type="submit"
          >
            Iniciar sesión
          </v-btn>
        </v-card>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import router from "@/router";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      visible: false,
    };
  },
  methods: {
    async login() {
      const loginData = {
        email: this.email,
        password: this.password,
        sistema: 2,
      };

      try {
        const response = await axios.post("/login", loginData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = response.data;
        if (data.res) {
          const token = data.token;
          // Hacer algo con el token, como guardarlo en el almacenamiento local
          console.log("Token:", token);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data
          router.push('/');
        } else {
          const message = data.message;
          console.error("Error:", message);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    },
  },
};
</script>
