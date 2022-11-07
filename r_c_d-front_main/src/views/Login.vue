<template>
  <div class="login-body">
    <div class="login">
      <h1>login</h1>

      <form @submit.prevent="fetchUserData">
        <label for="e-mail">e-mail<br>
          <input
            id="e-mail"
            class="email-input"
            v-model="email"
            @blur="v$.email.$touch()"
            type="email"
            name="email"
            placeholder="enter your email"
          />
        <p v-show="v$.email.$invalid && v$.email.$dirty && !this.errors">
          please enter your email
        </p>
        </label><br><br>

        <label for="password">password<br>
          <input
            id="password"
            class="password-input"
            v-model="password"
            @blur="v$.password.$touch()"
            type="password"
            placeholder="enter your password"
          />
        <p v-show="v$.password.$invalid && v$.password.$dirty && !this.errors">
          please enter your password
        </p>
        </label><br><br>

        <button
          class="login-btn"
          type="submit"
          :disabled="v$.email.$invalid || v$.password.$invalid"
        >
          login
        </button>

        <button
          class="register-btn"
          @click.prevent="this.$router.push('register')"
        >
          registration
        </button>
      </form>

      <p v-show="errors">{{ errors }}</p>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },
  data() {
    return {
      email: '',
      password: '',
      errors: '',
    };
  },
  methods: {
    async fetchUserData() {
      this.errors = '';
      // eslint-disable-next-line no-shadow
      const { email, password } = this;
      const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      };
      const fetchLogin = await fetch('http://127.0.0.1:1337/api/login', requestOptions);
      if (fetchLogin.status === 202) {
        this.$store.commit('setAuth');
        const json = await fetchLogin.json();
        if (this.$store.state.lastRoute) {
          this.$router.push(this.$store.state.lastRoute);
        } else {
          this.$router.push({
            name: 'profile',
            params: { lastname: json[0].lastname },
          });
        }
      } else {
        this.errors = await fetchLogin.json();
        this.email = '';
        this.password = '';
      }
    },
  },
};
</script>

<style>
.login-body {
  background-color: rgb(196, 194, 194);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
}
.login {
  text-align: center;
  width: 250px;
  height: 270px;
  background-color: grey;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>
