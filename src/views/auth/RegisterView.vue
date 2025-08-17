<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="fill-height d-flex flex-column align-center justify-center"
      >
        <!-- Botón de retroceso -->
        <v-btn
          icon
          @click="goHome"
          class="back-button"
        >
          <v-icon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
</v-icon>
        </v-btn>

        <v-card class="pa-6" style="width: 100%; max-width: 400px;">
          <v-card-title class="justify-center">
            <h1>Create Account</h1>
          </v-card-title>

          <v-form ref="form" v-model="valid" class="d-flex flex-column gap-4">
            <v-text-field
              v-model="name"
              label="Full Name"
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="email"
              label="Email"
              :rules="[rules.required, rules.email]"
            />

            <v-text-field
              v-model="password"
              label="Password"
              :rules="[rules.required, rules.password]"
              type="password"
            />

            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              :rules="[rules.required, matchPassword]"
              type="password"
            />

            <v-btn
              color="primary"
              variant="tonal"
              rounded="xl"
              size="large"
              block
              @click="register"
            >
              Sign Up
            </v-btn>
          </v-form>

          <v-divider class="my-4" />

          <v-row class="text-center">
            <v-col>
              <v-btn text @click="goToLogin" color="indigo-lighten-1">Already have an account? Sign In</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const valid = ref(false);
const router = useRouter();
const error = ref('');

const rules = {
  required: (v) => !!v || 'Required.',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
  password: (v) => v.length >= 6 || 'Password must be at least 6 characters.',
};

const matchPassword = (v) => v === password.value || 'Passwords must match.';

const register = async () => {
  if (!valid.value) {
    alert('Please fill in the form correctly.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // Actualizar el nombre del usuario
    await updateProfile(userCredential.user, {
      displayName: name.value
    });

    console.log('Usuario registrado:', userCredential.user);
    alert('Account created successfully!');
    router.push('/dashboard'); // Redirige al dashboard
  } catch (err) {
    console.error(err);
    error.value = err.message;
    alert(`Error: ${error.value}`);
  }
};

const goToLogin = () => {
  router.push('/login');
};
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s ease;
}
.v-card:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}
/* Botón de retroceso */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
