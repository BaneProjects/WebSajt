<template>
  <div class="home-page nav-top-margine">
      <carousel :recipes="recipes" @goToSingleRecipe="goToSingleRecipe"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import carousel from '../components/RecipeCarousel'
import axios from 'axios'
import Recipe from '../javascript/Recipe'

export default {
  computed:{
    ...mapState(['currentUser'])
  },
  components:{
    carousel
  },
  data(){
    return{
      recipes:[],
      sort:'trending'
    }
  },
  methods:{
    fetchRecipes(){
      axios.get("http://108m122.e2.mars-hosting.com/api/recipes",{params:{sort:this.sort, limit:10}})
      .then((res)=>{
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
         console.log("aaaaa", this.recipes)
      })
      .catch((ex)=>{
        console.error(ex)
      })
    },
    goToSingleRecipe(recId){
      console.log(recId)
      this.$router.push("/recipes/" + recId);
    }
  },
 mounted(){
    this.fetchRecipes()
  }
}
</script>

<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.front-img{
  position: relative;
}
.front-img h1{
  color: #fff;
  font-size: 3em;
  position: absolute;
  top: 5%;
  left: 25%;
}
.front-img h2{
  color: #fff;
  font-size: 3em;
  position: absolute;
  top: 10%;
  left: 25%;
}

@media screen and (max-width: 768px) {
    .home-page {
        margin: 0 auto;
    }
}
</style>
