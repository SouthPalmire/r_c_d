<template>
  <div
    class="popup_wrapper"
    :class="{ active: isActiveLogin, activePopup: popupCondition }"
  >
    <span class="popup_close icon_close" @click="changePopupCondition">
    </span>

    <div class="popup_form login">
      <h2>Login</h2>
      <form @submit.prevent="loginSubmitting">
        <div class="input_box">
          <span class="icon_mail icon_img"></span>
          <input
            type="text"
            v-model.trim="loginForm.email"
            @blur="v$.loginForm.email.$touch()"
            required
          >
          <label
            :style="{ color: '#800000' }"
            v-if="v$.loginForm.email.$dirty && v$.loginForm.email.$invalid"
          >
            enter your email
          </label>
          <label v-else>Email</label>
        </div>

        <div class="input_box">
          <span class="icon_password icon_img"></span>
          <input
            type="password"
            v-model.trim="loginForm.password"
            @blur="v$.loginForm.password.$touch()"
            required
          >
          <label
            :style="{ color: '#800000' }"
            v-if="v$.loginForm.password.$dirty && v$.loginForm.password.$invalid"
          >
            enter your password
          </label>
          <label v-else>Password</label>
        </div>

        <div class="remember_forgot">
          <label><input type="checkbox">Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button
          type="submit"
          class="btn"
          :disabled="v$.loginForm.$invalid"
        >
          Login
        </button>

        <div class="login_register">
          <p>Don't have an account?
            <a
              href="#"
              class="registration_link"
              @click="isActiveLogin = true"
            >
              Registration
            </a>
          </p>
        </div>
      </form>
    </div>

    <div class="popup_form registration">
      <h2>Registration</h2>
      <form @submit.prevent="registrationSubmitting">
        <div class="input_box">
          <span class="icon_user icon_img"></span>
          <input
            type="text"
            v-model.trim="registrationForm.userName"
            @blur="v$.registrationForm.userName.$touch()"
            required
          >
          <label
            :style="{ color: '#800000' }"
            v-if="v$.registrationForm.userName.$dirty && v$.registrationForm.userName.$invalid"
          >
            Username
          </label>
          <label v-else>Username</label>
        </div>

        <div class="input_box">
          <span class="icon_mail icon_img">
          </span>
          <input
            type="email"
            v-model.trim="registrationForm.email"
            @blur="v$.registrationForm.email.$touch()"
            required
          >
          <label
            :style="{ color: '#800000' }"
            v-if="v$.registrationForm.email.$dirty && v$.registrationForm.email.$invalid"
          >
            Email
          </label>
          <label v-else>Email</label>
        </div>

        <div class="input_box">
          <span class="icon_password icon_img">
          </span>
          <input
            type="password"
            v-model.trim="registrationForm.password"
            @blur="v$.registrationForm.password.$touch()"
            required
          >
          <label
            :style="{ color: '#800000' }"
            v-if="v$.registrationForm.password.$dirty && v$.registrationForm.password.$invalid"
          >
            Password
          </label>
          <label for='password' v-else>Password</label>
        </div>

        <div class="remember_forgot">
          <label>
            <input
              type="checkbox"
              v-model="registrationForm.agree"
            >I agree to the terms & conditions
          </label>
        </div>

        <button
          type="submit"
          class="btn"
          :disabled="v$.registrationForm.$invalid"
        >
          Registration
        </button>

        <div class="login_register">
          <p>Already have an account?
            <a
              href="#"
              class="registration_link"
              @click="isActiveLogin = false"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/authStore';
import { useVuelidate } from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';

export default {
  name: 'UserLoginRegistration',
  props: {
    popupCondition: Boolean,
  },
  setup: () => ({
    authStore: useAuthStore(),
    v$: useVuelidate(),
  }),
  validations() {
    return {
      loginForm: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      },
      registrationForm: {
        userName: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        agree: { checked: (value) => value },
      },
    };
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      registrationForm: {
        user: '',
        email: '',
        password: '',
        agree: false,
      },
      isActiveLogin: false,
    };
  },
  methods: {
    changePopupCondition() {
      this.$emit('changePopupCondition');
    },
    async loginSubmitting() {
      const requestOptions = {
        method: 'POST',
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.loginForm),
      };
      await fetch('http://127.0.0.1:6070/auth/login', requestOptions)
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    async registrationSubmitting() {
      const requestOptions = {
        method: 'POST',
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.registrationForm),
      };
      await fetch('http://127.0.0.1:6070/auth/registration', requestOptions)
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
  },
};
</script>

<style scoped>
.popup_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 400px;
  height: 440px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  overflow: hidden;
  transform: scale(0);
  transition: transform .5s ease, height .18s ease;
}
.popup_wrapper.activePopup {
  transform: scale(1);
}
.active {
  height: 520px;
}
.active .login {
  transition: none;
  transform: translateX(-400px);
}
.login {
  transition: transform .18s ease;
  transform: translateX(0);
}
.active .registration {
  transition: transform .18s ease;
  transform: translateX(0);
}
.registration {
  position: absolute;
  transition: none;
  transform: translateX(400px);
}
.popup_wrapper .popup_form {
  width: 100%;
  padding: 40px;
}
.popup_form h2 {
  font-size: 2em;
  color: white;
  text-align: center;
}
.popup_close {
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 45px;
  background: white;
  font-size: 1.5em;
  color: #2b090e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20px;
  cursor: pointer;
  z-index: 1;
}
.input_box {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid white;
  margin: 30px 0;
}
.input_box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  color: white;
  font-weight: 500;
  pointer-events: none;
  transition: .5s;
}
.input_box input:focus~label,
.input_box input:valid~label {
  top: -5px;
}
.input_box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  color: white;
  font-weight: 600;
  padding: 0 35px 0 5px;
}
.icon_img {
  position: absolute;
  right: 8px;
  font-size: 1.2em;
  color: white;
  line-height: 57px;
  top: 10px;
  height: 20px;
  width: 20px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  /*margin: 0 0.15em 0 0.3em;*/
  /*vertical-align: -0.3em;*/
  background-size: 1em 1em;
  filter: invert(100%);
  /*-webkit-filter: invert(100%);*/
}
.icon_mail {
  background-image: url("./files/mail.svg");
}
.icon_password {
  background-image: url("./files/lock-closed.svg");
}
.icon_user {
  background-image: url("./files/person.svg");
}
.icon_close {
  background-image: url("./files/close.svg");
}
.remember_forgot {
  font-size: .9em;
  color: white;
  font-weight: 500;
  margin: -15px 0 15px;
  display: flex;
  justify-content: space-between;
}
.remember_forgot label input {
  accent-color: white;
  margin-right: 3px;
  cursor: pointer;
}
.remember_forgot a {
  color: white;
  text-decoration: none;
}
.remember_forgot a:hover {
  text-decoration: underline;
}
.btn {
  width: 100%;
  height: 45px;
  background: white;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  color: #2b090e;
  font-weight: 700;
}
.login_register {
  font-size: .9em;
  color: white;
  text-align: center;
  font-weight: 500;
  margin: 25px 0 10px;
}
.login_register p a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}
.login_register p a:hover {
  text-decoration: underline;
}
</style>
