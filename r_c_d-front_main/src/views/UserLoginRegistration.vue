<template>
  <div
    class="popup_wrapper"
    :class="{ active: isActiveLogin, activePopup: popupCondition }"
  >
    <span
      class="popup_close"
    >
      <ion-icon @click="changePopupCondition" name="close"></ion-icon>
    </span>

    <div class="popup_form login">
      <h2>Login</h2>
      <form action="#">
        <div class="input_box">
          <span class="icon">
            <ion-icon name="mail"></ion-icon>
          </span>
          <input type="email" required>
<!--eslint-disable-next-line-->
          <label>Email</label>
        </div>

        <div class="input_box">
          <span class="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input type="password" required>
          <!--eslint-disable-next-line-->
          <label>Password</label>
        </div>

        <div class="remember_forgot">
<!--eslint-disable-next-line-->
          <label><input type="checkbox">Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" class="btn">
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
      <form action="#">
        <div class="input_box">
          <span class="icon">
            <ion-icon name="person"></ion-icon>
          </span>
          <input type="text" required>
<!--eslint-disable-next-line-->
          <label>Username</label>
        </div>

        <div class="input_box">
          <span class="icon">
            <ion-icon name="mail"></ion-icon>
          </span>
          <input type="email" required>
<!--eslint-disable-next-line-->
          <label>Email</label>
        </div>

        <div class="input_box">
          <span class="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input type="password" required>
<!--eslint-disable-next-line-->
          <label>Password</label>
        </div>

        <div class="remember_forgot">
<!--eslint-disable-next-line-->
          <label><input type="checkbox">I agree to the terms & conditions</label>
        </div>

        <button type="submit" class="btn">
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
export default {
  name: 'UserLoginRegistration',

  props: {
    popupCondition: Boolean,
  },
  data() {
    return {
      isActiveLogin: false,
    };
  },
  methods: {
    changePopupCondition() {
      this.$emit('changePopupCondition');
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
  font-size: 2em;
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
.input_box .icon {
  position: absolute;
  right: 8px;
  font-size: 1.2em;
  color: white;
  line-height: 57px;
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