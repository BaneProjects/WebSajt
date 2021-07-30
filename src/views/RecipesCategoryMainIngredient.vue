<template>
  <div class="nav-top-margine recipes-category">
        <nav>
            <h2>{{ing}}</h2>
        </nav>
        <the-recipe v-if="!msg" @reportRecipe="reportRecipe" :currentUser="currentUser" @clicked="setSort" :sort="sort" :recipes="recipes" @goToSingleRecipe="goToSingleRecipe"/>
        <h3> {{msg}} </h3>
        <pop-up-modal :msg="modalMsg" :openModal="openModal" @closeModal="closeModal"/>
  </div>
</template>

<script>
import axios from 'axios'
import Recipe from '../javascript/Recipe'
import TheRecipe from '../components/TheRecipe'
import PopUpModal from '../components/PopUpModal' 
import { mapState } from 'vuex'

export default {
    components:{
        TheRecipe,
        PopUpModal
    },
    data(){
        return{
            recipes: [],
            msg: null,
            sort:'trending',
            ing:'',
            modalMsg: "",
            openModal: false,
            showSpiner: false
        }
    },
    computed: {
        mainIngId() {
            return this.$route.params.id
        },
                ...mapState(['currentUser'])
    },
    methods:{
        fetchRecipesByCategory(){
            this.recipes = []
            axios.get("http://108m122.e2.mars-hosting.com/api/recipes",{
                params:{
                    ing_type: this.mainIngId,
                    allergies:JSON.stringify(this.currentUser.allergies),
                    cat_id:JSON.stringify(this.currentUser.prefs),
                    sort:this.sort
                }
            })
            .then((res)=>{ 
                if(res.data.res === 'ok'){
                    this.msg=null
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
                if(res.data.res === 'err'){
                    this.msg = res.data.msg
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        goToSingleRecipe(recId){
            this.$router.push("/recipes/" + recId)
        },
        setSort(val){
            this.sort=val
            this.recipes=[]
            this.fetchRecipesByCategory()
        },
        getCatName(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    ing_id: this.mainIngId
                }
            })
            .then((res)=>{
                if (res.data.res==='ok'){
                    this.ing=res.data.data[0].itp_name
                }
                else{
                    this.ing=res.data.msg
                }

            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        reportRecipe (rec) {
            this.recipes[rec.idx].recRepVal = true
            axios.post("http://108m122.e2.mars-hosting.com/api/reports", {
                sid: sessionStorage.getItem("sid"),
                rec_id: rec.recId
            })
            .then((res)=>{
                console.log(res.data)
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
    watch:{
        mainIngId(newVal){
            if(newVal){
                this.fetchRecipesByCategory()
                this.getCatName()
            }
        }
    },
    mounted(){
        this.fetchRecipesByCategory()
        this.getCatName()
    }
}
</script>

<style scoped>
nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: wheat;
    margin: 30px 0px;
    width: 100%;
}

.recipes-category{
    background-image: url("../assets/front-knife.jpg");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 130vh;
}

.recipes-category h3{
    transform: scale(3);
    margin: 150px auto;
    text-shadow: 2px 2px 50px #fff;
}
@media screen and (max-width: 768px){
    .recipes-category{
        margin: 0 auto;
    }
    nav{
        margin: 0;
    }
}
    
</style>