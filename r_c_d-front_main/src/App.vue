<template>
  <div id="app">
    <div class="video-container">
      <video autoplay muted loop id="myVideo">
        <source src="../src/views/files/fon-restaurant.mp4" type="video/mp4">
      </video>
    </div>

    <MyNavbar @popupActivation="changePopupCondition"/>

    <UserLoginRegistration
      @changePopupCondition="changePopupCondition"
      :popupCondition="popupCondition"
    />

    <router-view/>
  </div>
</template>

<script>
import MyNavbar from '@/components/app/MyNavbar.vue';
import UserLoginRegistration from '@/views/UserLoginRegistration.vue';

export default {
  components: { MyNavbar, UserLoginRegistration },

  data() {
    return {
      popupCondition: false,
    };
  },
  methods: {
    changePopupCondition() {
      this.popupCondition = !this.popupCondition;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.video-container {
  height: 100vh;
  width: 100vw;
}
iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  z-index: -1;
}
</style>
