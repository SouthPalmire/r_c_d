<template>
   <div class="register-body">
      <div class="register">
         <h1>registration</h1>

         <form @submit.prevent="fetchUserData">
            <label for="firstname">Firstname<br>
               <input
                  id="firstname"
                  v-model="firstname"
                  @blur="v$.firstname.$touch()"
                  type="text"
                  name="firstname"
               />
            </label><br><br>
            <p v-show="v$.firstname.$invalid && v$.firstname.$dirty && !this.errors">
               please enter your firstname
            </p>

            <label for="lastname">Lastname<br>
               <input
                  id="lastname"
                  v-model="lastname"
                  @blur="v$.lastname.$touch()"
                  type="text"
                  name="lastname"
               />
            </label><br><br>
            <p v-show="v$.lastname.$invalid && v$.lastname.$dirty && !this.errors">
               please enter your lastname
            </p>

            <label for="password">password<br>
               <input
                  id="password"
                  v-model="passwordCreate"
                  @blur="v$.passwordCreate.$touch()"
                  type="password"
               />
            </label><br><br>
            <p v-show="v$.passwordCreate.$invalid && v$.passwordCreate.$dirty && !this.errors">
               please enter your password
            </p>

            <label for="confirm_password">confirm password<br>
               <input
                  id="confirm_password"
                  v-model="confirmPasswordCreate"
                  @blur="v$.confirmPasswordCreate.$touch()"
                  type="password"
               />
            </label><br><br>
            <p v-show="v$.confirmPasswordCreate.$invalid
               && v$.confirmPasswordCreate.$dirty && !this.errors"
            >
               please confirm your password
            </p>

            <label for="e_mail">e-mail<br>
               <input
                  id="e_mail"
                  v-model="email"
                  @blur="v$.email.$touch()"
                  name="email"
                  type="email"
               />
            </label><br><br>
            <p v-show="v$.email.$invalid && v$.email.$dirty && !this.errors">
               please enter your email
            </p>

            <label for="birth_date">date of birth<br>
               <input
                  id="birth_date"
                  v-model="date_of_birth"
                  @blur="v$.date_of_birth.$touch()"
                  type="date"
               />
            </label><br><br>
            <p v-show="v$.date_of_birth.$invalid && v$.date_of_birth.$dirty && !this.errors">
               please enter date of birth
            </p>

            <button type="submit" :disabled="btnDisable">
               register
            </button>
         </form>

         <p v-show="errors">{{ errors }}</p>
      </div>
   </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {
  required, email, alpha, sameAs,
} from '@vuelidate/validators';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      firstname: {
        required,
        alpha,
      },
      lastname: {
        required,
        alpha,
      },
      passwordCreate: {
        required,
      },
      confirmPasswordCreate: {
        sameAs: sameAs(this.passwordCreate),
      },
      email: {
        required,
        email,
      },
      date_of_birth: {
        required,
      },
    };
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      passwordCreate: '',
      confirmPasswordCreate: '',
      email: '',
      date_of_birth: '',
      errors: '',
    };
  },
  computed: {
    btnDisable() {
      return this.v$.firstname.$invalid
          || this.v$.lastname.$invalid
          || this.v$.passwordCreate.$invalid
          || this.v$.confirmPasswordCreate.$invalid
          || this.v$.email.$invalid
          || this.v$.date_of_birth.$invalid;
    },
  },
  methods: {
    async fetchUserData() {
      const {
        // eslint-disable-next-line no-shadow, camelcase
        firstname, lastname, passwordCreate, email, date_of_birth,
      } = this;
      const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname, lastname, passwordCreate, email, date_of_birth,
        }),
      };
      const fetchRegister = await fetch('http://127.0.0.1:1337/api/register', requestOptions);
      if (fetchRegister.ok) {
        const json = await fetchRegister.json();
        this.$router.push({
          name: 'profile',
          params: {
            id: json[0].id,
            firstname: json[0].firstname,
            lastname: json[0].lastname,
            email: json[0].email,
            date_of_birth: json[0].date_of_birth,
          },
        });
      } else {
        this.errors = await fetchRegister.json();
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.passwordCreate = '';
        this.confirmPasswordCreate = '';
        this.date_of_birth = '';
      }
    },
  },
};
</script>

<style>
.register-body {
  background-color: rgb(196, 194, 194);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
}
.register {
  text-align: center;
  width: 250px;
  height: 515px;
  background-color: grey;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>
