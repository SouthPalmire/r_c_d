<template>
  <div id="app">
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/NKEFz68HJuE?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparent&amp;origin=https://restaurantweek.ru&amp;playlist=NKEFz68HJuE&amp;mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
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
/*.user_login {*/
/*  display: flex;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*}*/
/*@media (min-aspect-ratio: 16/9) {*/
/*  .video-container iframe {*/
/*    height: 56.25vw;*/
/*  }*/
/*}*/

/*@media (max-aspect-ratio: 16/9) {*/
/*  .video-container iframe {*/
/*    width: 177.78vh;*/
/*  }*/
/*}*/
</style>
