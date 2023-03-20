<template>
  <header>
    <h2 class="logo">R_C_D</h2>
    <nav class="navigation">
      <router-link to="">Home</router-link>
      <router-link to="">About</router-link>
      <router-link to="">Service</router-link>
      <router-link to="">Contacts</router-link>
      <button
        class="btn-login"
        @click="popupActivation"
      >
        Login
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MyNavbar',

  data() {
    return {
      popupActivity: false,
    };
  },

  methods: {
    popupActivation() {
      this.$emit('popupActivation');
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.logo {
  font-size: 2em;
  color: white;
}

.navigation a{
  position: relative;
  font-size: 1.1em;
  color: white;
  text-decoration: none;
  font-weight: 500;
  margin-left: 40px;
}

.navigation a::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  left: 0;
  bottom: -6px;
  background: white;
  border-radius: 5px;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform .5s;
}

.navigation a:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.navigation .btn-login {
  width: 130px;
  height: 50px;
  background: transparent;
  border: 2px solid #fff;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  color: #fff;
  font-weight: 500;
  margin-left: 40px;
  transition: .5s;
}

.navigation .btn-login:hover {
  background: #fff;
  color: #162938;
}
</style>
