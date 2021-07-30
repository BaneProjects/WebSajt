<template>
  <div id="app">
    <the-navigation></the-navigation>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation'
import User from './javascript/User'
import axios from 'axios'
export default {
  components:{
    TheNavigation
  },
  methods:{
    checkSession(){
      axios.get('http://108m122.e2.mars-hosting.com/api/check-session',{
        params:{
          sid: sessionStorage.getItem("sid")
        }
      })
      .then((res)=>{
        if(res.data.res === "ok"){
          let user = res.data.user
          let currentUser = new User(user.usr_id, user.usr_username, user.usr_fullname, user.usr_email, user.img_link, user.usr_level, user.usr_banned, user.allergies, user.preferences)
          this.$store.dispatch('login', currentUser)
        }
      })
      .catch((ex)=>{
        console.error(ex)
      })
    }
  },
  mounted(){
    this.checkSession()
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  background: #a7f5ce;
  background-image: linear-gradient(to right, #a7f5ce, #519171);
}
html{
  scroll-behavior: smooth;
}
#app {
  font-family:  'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
a:link, a:visited{
  text-decoration: none;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #339267;
}

button, input, textarea{
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1em;
}

img{
  max-width: 100%;
  max-height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all .7s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}


.nav-top-margine{
  margin: 70px auto 0;
}
.show-pointer{
  cursor: pointer;
}
.exit-btn button{
  font-weight: 700;
  box-shadow: 1px 1px 25px #fff;
}
.exit-btn{
  position: absolute;
  top: 10%;
  right: 10%;
}
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #89e2b6;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #68c998;
  cursor: pointer;
}

.number-input{
  width: 50px;
  margin: 0 5px;
}
button{
  padding: 5px 25px;
  margin: 10px;
  outline: none;
  border: none;
  border-radius: 3px;
  background: #ca430e;
  cursor: pointer;
  color: #fff;
  font-size: 1.05em;
}
button:hover{
  background: #94320b;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.381);
}
button:active{
  background: #682207;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.66);
}
button > a{
  color: #fff;
}
.ingredients{
    display: flex;
    flex-wrap: wrap;
    margin: 10px;
}
.ingredient{
    margin: 3px;
    border: 1px solid #000;
    padding: 5px;
    font-size: 0.9em;
    line-height: 30px;
}
.ingredient:hover{
  background: rgb(240, 239, 239);
  cursor: pointer;
}
.recipe{
  width: 250px;
  background: #fff;
  padding: 5px;
  height: 350px;
  max-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid rgba(92, 90, 90, 0.253);
  margin: 10px;
  position: relative;
  cursor: pointer;
  transition: .5s;
}
.recipe .tooltip-report{
    position: absolute;
    top: 0;
    right: 10px;
    border-radius: 3px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.53);
    transition: .3s;
    z-index: 5000;
    opacity: 0;
}
.recipe:hover > .tooltip-report{
    opacity: 1;
    transform: scale(1.1);
}
.overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.192);
    z-index: 11;
    top: 0;
    left: 0;
    display: none;
}
.recipe:hover > .overlay{

    display: block;
}
.recipe h3 {
  margin: 5px 5px;
  padding:0
}

.recipe .fa-star{
  color: orange;
}
.recipe:hover{
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.653);
  transform: scale(1.05);
  transition: .4s;
}
.recipe:hover > .show-pointer .tooltip{
  opacity: 1;
}
.recipe .show-pointer{
  position: relative;
}
.show-pointer img{
  height: 250px;
  object-fit: cover;
}
select {
  background: #a7f5ce;
  border: 1px solid #AAA;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 5px;
  font-size: 1.05em;
}
select:hover{
  cursor: pointer;
  background: #96dfba;
}
.red-font{
  color: #ff0000;
  font-weight: 700;
  font-size: .9em;
}
</style>
