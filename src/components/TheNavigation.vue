<template>
    <header id="header">
        <div class="logo" @click="goToHome">
            <img src="../assets/logotest1.png" alt="logo">   
        </div>
        <div  @click="showNav = !showNav" :class="showNav ? 'change' : 'burger'">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
        <nav id="nav">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li class="dropdown">
                    <router-link class="dropbtn" to="/recipes">Recipes <i class="fa fa-caret-up"></i></router-link>
                    <recipes-categories  class="dropdown-content" @handleGoToCategory="handleGoToCategory" @handleGoToCategoryIngType="handleGoToCategoryIngType" />
                </li>
                <li v-if="currentUser.userId != null"><router-link to="/addrecipe">Add new Recipe</router-link></li>
                <li v-if="currentUser.userId === null"><router-link to="/login">Log in</router-link></li>
            </ul>
            <ul>
                <li v-if="currentUser.level === 2"><router-link to="/user"><i class="fa fa-user"></i></router-link>
                    <ul>
                        <li><router-link to="/user">Change info</router-link></li>
                        <li @click="handleLogout" v-if="currentUser.userId != null"><a>Log out</a></li>
                    </ul>
                </li>
                <li v-if="currentUser.level === 1"><router-link to="/user"><i class="fa fa-user-circle"></i></router-link>
                    <ul>
                        <li><router-link to="/user">Change info</router-link></li>
                        <li><router-link to="/admin">Admin panel</router-link></li>
                        <li @click="handleLogout" v-if="currentUser.userId != null"><a>Log out</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        
        <transition name="fade">
            <nav id="nav-mobile" v-if="showNav">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li>
                        <router-link to="/recipes">Recipes </router-link>
                        <a @click="showCategories = !showCategories"><i class="fa fa-caret-down"></i></a>
                        <transition name="fade">    
                            <recipes-categories v-if="showCategories" @handleGoToCategory="handleGoToCategory" @handleGoToCategoryIngType="handleGoToCategoryIngType" />
                        </transition>
                    </li>
                    <li v-if="currentUser.userId != null"><router-link to="/addrecipe">Add new Recipe</router-link></li>
                    <li v-if="currentUser.userId === null"><router-link to="/login">Log in</router-link></li>
                </ul>
                <ul>
                    <li v-if="currentUser.level === 2" @click="showUserMobNav = !showUserMobNav"><a><i class="fa fa-usera"></i></a>
                        <ul v-if="showUserMobNav">
                            <li><router-link to="/user">Change info</router-link></li>
                            <li @click="handleLogout" v-if="currentUser.userId != null"><a>Log out</a></li>
                        </ul>
                    </li>
                    <li v-if="currentUser.level === 1" @click="showAdminMobNav = !showAdminMobNav"><a><i class="fa fa-user-circle"></i></a>
                        <ul v-if="showAdminMobNav">
                            <li><router-link to="/user">Change info</router-link></li>
                            <li><router-link to="/admin">Admin panel</router-link></li>
                            <li @click="handleLogout" v-if="currentUser.userId != null"><a>Log out</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </transition>
    </header>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import RecipesCategories from '../components/RecipesCategories'

export default {
  computed:{
    ...mapState(['currentUser'])
  },
  components:{
      RecipesCategories
  },
  data(){
      return{
        showNav: false,
        showCategories: false,
        showAdminMobNav: false,
        showUserMobNav: false
      }
  },
  methods:{
    handleLogout () {
        this.showNav = false
        this.$store.dispatch('logout')
        axios.get("http://108m122.e2.mars-hosting.com/api/login",{
            params:{
                sid: sessionStorage.getItem("sid")
            }
        })
        .then((res) => {
            console.log(res.data.res)
            this.$router.push('/')
            .catch(()=>{
            })
        })
        .catch((ex)=>{
            console.error(ex);
        })
        sessionStorage.removeItem("sid")
    },
    handleGoToCategory(id){
        this.showNav = false
        this.$router.push('/recipes/categories/' + id)
        .catch(()=>{
        })
    },
    handleGoToCategoryIngType(id){
        this.showNav = false
        this.$router.push('/recipes/categories/mainingredient/' + id)
        .catch(()=>{
        })
    },
    goToHome(){
        this.$router.push('/')
        .catch(()=>{
            
        })
    }
  },
    watch:{
        $route (){
            this.showNav = false;
        }
    } 
}
</script>

<style scoped>
    a{
        cursor: pointer;
    }

    #nav a.router-link-exact-active {
        color: #ac5005;
    }
    #header {
        display: flex;
        position: fixed;
        top: 0;
        width: 100%;
        justify-content: space-between;
        z-index: 5555;
        background: #fff;
    }
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65px;
        margin: 0 0 0 350px;
    }
    .logo:hover{
        cursor: pointer;
        background: #02b67a33;
    }
    .logo h1{
        display: flex;
    }
    #nav {
        padding: 0;
        margin: 0 350px 0 0;
        position: relative;
        display: flex;
    }
    #nav ul {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
    }
    #nav ul li {
        padding: 0;
        margin: 0;
        text-align: center;
        position: relative;
    }
    
    #nav ul li a i{
        font-size: 1.5em;
    }
    #nav ul li ul li a.router-link-active{
        color: #ac5005;
    }
    #nav ul li a {
        display: block;
        padding: 20px 15px;
        height: 35px;
        line-height: 35px;
        border-radius: 3px;
        color: #2c3e50;
        transition: all .4s;
        position: relative;
    }
    .fa-caret-up{
        position: absolute;
        left: 50%;
        bottom: -50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 3em !important;
        display: none;
    }
    #nav ul li a:hover {
        background: #85dcb3;
        color: #212d3a;
    }
    #nav ul li ul {
        position: absolute;
        background: #fff;
        transition: all 0.5s ease;
        width: 200px;
        left: 0;
        display: none;
        border-radius: 1px;
        border: 1px solid rgba(0, 0, 0, 0.301);
    }
    #nav ul li:hover > ul,
    #nav ul li ul:hover {
        display: block;
    }
    #nav ul li ul li a{
        padding: 10px;
        font-weight: 700;
        border-radius: 1px;
        width: auto;
    }
    .navbar a:hover, .dropdown:hover .dropbtn {
        background: #85dcb3;
    }
    .dropdown-content {
        display: none;
        position: fixed;
        background-color: #f9f9f9;
        width: 100%;
        left: 0;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 5777;
    }
    
    .dropdown:hover .dropdown-content, .dropdown:hover .fa-caret-up {
        display: flex;
    }
    .burger{
        display: none;
        cursor: pointer;
        margin: 5px 50px;
    }
    .burger div{
        width: 25px;
        height: 3px;
        background: #2c3e50;
        margin: 5px;
        border-radius: 3px;
    }
    .line1, .line2, .line3 {
        width: 35px;
        height: 5px;
        background-color: #333;
        margin: 6px 0;
        transition: .5s;
    }
    .change{
        margin: 5px 50px;
        cursor: pointer;
    }
    .change .line1 {
        -webkit-transform: rotate(-45deg) translate(-9px, 6px);
        transform: rotate(-45deg) translate(-9px, 6px);
    }

    .change .line2 {
        opacity: 0;
    }

    .change .line3 {
        -webkit-transform: rotate(45deg) translate(-8px, -8px);
        transform: rotate(45deg) translate(-8px, -8px);
    }
    #nav-mobile {
        padding: 0;
        position: absolute;
        top: 75px;
        width: 100%;
        background: #fffffff1;
        transform: translateX(50%, 50%);
        display: flex;
        margin: 0;
        flex-direction: column;
        font-weight: 700;
    }
    #nav-mobile ul {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
        flex-direction: column;
        align-items: center;
    }
    #nav-mobile ul li {
        padding: 0;
        margin: 0;
        text-align: center;
        position: relative;
    }
    
    #nav-mobile ul li a i{
        font-size: 1.5em;
    }
    #nav-mobile ul li ul li a.router-link-active{
        color: #ac5005;
    }
    #nav-mobile ul li a {
        display: block;
        padding: 10px;
        height: 25px;
        line-height: 25px;
        border-radius: 3px;
        color: #2c3e50;
        transition: all .4s;
        position: relative;
    }
    #nav-mobile ul li a:hover {
        background: #85dcb3;
        color: #212d3a;
    }
    #nav-mobile ul li ul {
        background: #fff;
        width: 200px;
        border-radius: 1px;
        font-size: .95em;
    }
    #nav-mobile ul li ul li a{
        padding: 5px;
        margin: 3px;
        border-bottom: 1px solid #000;
        border-radius: 1px;
        width: auto;
    }
    
    @media screen and (min-width:1024px) and (max-width:1279px) {
        #header{
            justify-content: center;
        }
        .logo{
            margin: 0;
        }
        #nav{
            margin: 0;
        }

    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
        #header{
            justify-content: center;
        }
        .logo{
            margin: 0;
        }
        #nav{
            margin: 0;
        }
    }
    @media screen and (max-width: 768px){
        #header{
            align-items: center;
            position: sticky;
        }
        .logo{
            margin: 0 0 0 35px;
        }
        #nav{
            display: none;
        }
        #nav ul{
            flex-direction: column;
            align-items: center;
        }
        .burger{
            display: block;
        }
    }
</style>