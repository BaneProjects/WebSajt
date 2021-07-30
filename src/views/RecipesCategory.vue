<template>
  <div class="nav-top-margine recipes-category">
        <nav>
        <h2>{{cat}}</h2>
        </nav>
        <the-recipe v-if="!msg" @reportRecipe="reportRecipe" @clicked="setSort" :sort="sort" :currentUser="currentUser" :recipes="recipes" @goToSingleRecipe="goToSingleRecipe"  />
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
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

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
            cat:'',
            modalMsg: "",
            openModal: false,
            showSpiner: false
        }
    },
    computed: {
        catId() {
            let prefs = []
            prefs.push(this.$route.params.id)
            if (this.currentUser.prefs==null) return JSON.stringify(prefs)
            for (let pref of this.currentUser.prefs){
                prefs.push(pref)
            }
            return JSON.stringify(prefs)
        },
        ...mapState(['currentUser'])
    },
    methods:{
        fetchRecipesByCategory(){
            axios.get("http://108m122.e2.mars-hosting.com/api/recipes",{
                params:{
                    cat_id: this.catId,
                    allergies:JSON.stringify(this.currentUser.allergies),
                    sort:this.sort,
                    cancelToken: source.token
                }
            })
            .then((res)=>{ 
                this.recipes = []
                if(res.data.res === 'ok'){
                    console.log(res.data.recipes)
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
            this.fetchRecipesByCategory()
        },
        getCatName(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    cat_ids: this.$route.params.id
                }
            })
            .then((res)=>{
                if (res.data.res==='ok'){
                    this.cat=res.data.data[0].rct_name
                }
                else{
                    this.cat=res.data.msg
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
        catId(newVal){
            if(newVal){
                this.fetchRecipesByCategory()
                this.getCatName()
            }
        },
        currentUser:{
            handler: function (newVal) { 
                if(newVal){
                    source.cancel()
                    CancelToken = axios.CancelToken
                    source = CancelToken.source()
                    this.fetchRecipesByCategory()
                }
            },
            deep: true
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

}
.recipes-category{
    background-image: url("../assets/front-knife.jpg");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 130vh;
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