<template>
  <div class="recipes-wrap">
        <nav>
          <h2>World's tastiest recipes</h2>
          <button @click="toggle">Search</button>
        </nav>
        <div>
          <search v-on:search="search" :class="{noDisp:searchToggle}" :allergiesProp="currentUser.allergies" :dietsProp="currentUser.prefs"/>
          <the-recipe @reportRecipe="reportRecipe" @clicked="setSort" :currentUser="currentUser" :recipes="recipes" :sort="sort" @goToSingleRecipe="goToSingleRecipe" class="the-recipe"/>
          <p v-text="msg"></p>
          <div :style=' !showSpiner ? "display:none" : "display:block"' class="nav-top-margine">
              <img src="/loadingimg.gif" alt="spinner">
          </div>
      </div>
      <pop-up-modal :msg="modalMsg" :openModal="openModal" @closeModal="closeModal"/>
  </div>
</template>

<script>
import axios from 'axios'
import TheRecipe from '../components/TheRecipe'
import Recipe from '../javascript/Recipe'
import search from '../components/Search'
import PopUpModal from '../components/PopUpModal'
import { mapState } from 'vuex' 
let CancelToken = axios.CancelToken
let source = CancelToken.source()

export default {
  components:{
    TheRecipe,
    search,
    PopUpModal
  },
  data(){
    return{
      recipes: [],
      sort:'trending',
      searchToggle:true,
      params:{},
      msg:'',
      modalMsg: "",
      openModal: false,
      showSpiner: false
    }
  },
  computed:{
    parameters:function(){
      let parameters = this.params
      parameters.sort=this.sort
      return parameters
    },
    ...mapState(['currentUser'])
  },
  methods:{
    fetchRecipes(){
      this.showSpiner = true
      axios.get("http://108m122.e2.mars-hosting.com/api/recipes",{
        params: this.parameters,
        cancelToken: source.token
      })
      .then((res)=>{
        this.recipes=[]
        if (res.data.res==="ok"){
          this.msg=''
          this.showSpiner = false
        let recipe = res.data.recipes
        for(let i = 0; i < recipe.length; i++){
          if(recipe[i].img_links === null){
            this.recipes.push(new Recipe(
              recipe[i].rec_id, 
              recipe[i].rec_name,
              recipe[i].rec_preptime,
              recipe[i].usr_id,
              recipe[i].itp_id,
              null,
              null,
              recipe[i].rating
            ))
            this.recipes[i].imgLinks.push("/genericimg.jpg")
          }else{
            this.recipes.push(new Recipe(
              recipe[i].rec_id, 
              recipe[i].rec_name,
              recipe[i].rec_preptime,
              recipe[i].usr_id,
              recipe[i].itp_id,
              null,
              null,
              recipe[i].rating
            ))
            this.recipes[i].imgLinks = recipe[i].img_links
          }
        }
        }
        else this.msg=res.data.msg
      })
      .catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown)
        } else {
          // handle error
        }
      });
    },
    goToSingleRecipe(recId){
      this.$router.push("/recipes/" + recId)
    },
    setSort(val){
      this.sort=val
      this.fetchRecipes()
    },
    toggle(){
      this.searchToggle=!this.searchToggle
    },
    search(val){
      this.params=val
      this.fetchRecipes()
    },
    reportRecipe (rec) {
      this.recipes[rec.idx].recRepVal = true
      axios.post("http://108m122.e2.mars-hosting.com/api/reports", {
        sid: sessionStorage.getItem("sid"),
        rec_id: rec.recId
      })
      .then((res)=>{
        if(res.data.res === "err"){
          this.modalMsg = res.data.msg
          this.openModal = true
        }else{
          console.log(res.data)
        }
      })
      .catch((ex)=>{
        console.error(ex)
      })
    },
    closeModal(){
      this.openModal = false
    }
  },
  mounted(){
    this.params.allergies=JSON.stringify(this.currentUser.allergies)
    this.params.cat_id=JSON.stringify(this.currentUser.prefs)
    this.fetchRecipes()
  },
  watch:{
    currentUser:{
      handler: function (newVal) { 
        if(newVal){
          source.cancel()
          CancelToken = axios.CancelToken
          source = CancelToken.source()
          this.fetchRecipes()
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .recipes-wrap{
    margin: 75px auto 0;
    padding: 0;
    width: 100%;
    background-image: url("../assets/front-knife.jpg");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 130vh;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: wheat;
    margin-bottom: 15px;
    width: 100%;
  }

  .noDisp{
    display: none;
  }
  @media screen and (max-width: 768px){
    .recipes-wrap{
      margin: 0 auto;
    }
  }
  
  
</style>