<template>
  <div class="home nav-top-margine">
    <home-page />
    <footer-bottom/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'
import FooterBottom from '@/components/FooterBottom'

export default {
  name: 'Home',
  components: {
    HomePage,
    FooterBottom
  },
  data(){
    return{
    }
  }
}
</script>
<style scoped>
.home{
  background-image: url("../assets/front-tomato.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
@media screen and (max-width: 768px) {
  .home {
    margin: 0 auto !important;
  }
}
</style>
