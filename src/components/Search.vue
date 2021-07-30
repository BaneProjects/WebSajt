<template>
<div class="mainDiv">
    <div class="nameWrap">
        <div>
            <p>Recipe name:</p>
            <input type="text" v-model="recName"> 
        </div>
        <div>
            <p>Author:</p>
            <input type="text" v-model="author"> 
        </div>
    </div>
    <div class="recipe-categories">
        <div class="recipe-categorie">
            <p>Main ingredient:</p>
            <select v-model="mainIngredient" >
                <option value="None" selected>None</option>
                <option v-for="(mainIng, index) in mainIngredients" :key="index" :value="mainIng.itp_id"> {{mainIng.itp_name}} </option>
            </select>
        </div>
        <div class="recipe-categorie">
            <p>Meal type:</p>
            <select v-model="mealType">
                <option value="None" selected="selected">None</option>
                <option v-for="(meal, index) in mealTypes" :key="index" :value="meal.rct_id"> {{meal.rct_name}} </option>
            </select>
        </div>
        <div class="recipe-categorie">
            <p>Course:</p>
            <select v-model="singleCourse">
                <option value="None" selected="selected">None</option>
                <option v-for="(course, index) in courses" :key="index" :value="course.rct_id"> {{course.rct_name}} </option>
            </select>
        </div>
        <div class="recipe-categorie">
            <p>Country:</p>
            <select v-model="singleCountry">
                <option value="None" selected="selected">None</option>
                <option v-for="(country, index) in countries" :key="index" :value="country.rct_id"> {{country.rct_name}} </option>
            </select>
        </div>
        <div class="recipe-categorie">
            <p>Diet type:</p>
            <span v-for="(diet, index) in diets" :key="index">
                {{diet.rct_name}} 
                <input type="checkbox" @change="handleDietType(diet.rct_id)" :checked="currentDiets.includes(diet.rct_id)">
            </span>
        </div>
    </div>

        <div class="bordered">
            <p>Search by ingredients: 
                <input type="text" placeholder="Filter..." v-model="filter" @change="fetchIngredients">
            </p>
            <div class="ingredients">
                <add-recipe-ingredients :both="true" v-for="(ingredient, index) in filteredIng" :ingredient="ingredient" :key="index" @addToRecipe="addToRecipe(ingredient)" @removeFromRecipe="removeFromRecipe(ingredient)"/>
            </div>
        </div>
    <div class="transitions" v-if="!arrsEmpty">
        <div class="trans">
            <p>Include:</p>
            <div class="ingredients" v-if="recipeIngredients.length > 0">
                <add-recipe-ingredients :trash="true" v-for="(ingredient, index) in recipeIngredients" :ingredient="ingredient" :key="index" @remove="HandleRemoveFromRecipeIngredients(index, ingredient)"/>
            </div>
        </div>

        <div class="trans">
            <p>Exclude:</p>
            <transition name="fade" mode="out-in" class="trans">
                <div class="ingredients" v-if="allergieIng.length > 0">
                    <add-recipe-ingredients :trash="true" v-for="(ingredient, index) in allergieIng" :ingredient="ingredient" :key="index" @remove="HandleRemoveFromAllergies(index, ingredient)"/>
                </div>
            </transition>
        </div>
    </div>
        <button @click="$emit('search',searchParams)">Go</button>
        <button @click="reset">Reset</button>
</div>
</template>

<script>
import axios from 'axios'
import Ingredient from '../javascript/Ingredient'
import AddRecipeIngredients from './UserPanel/AddRecipePanel/AddRecipeIngredients'
import Vue from 'vue'
export default {
    props:{
        allergiesProp:Array,
        dietsProp:Array
    },
    data(){
        return{
            mainIngredient:"None",
            singleCourse:'None',
            singleCountry:'None',
            mealType:'None',
            recName:"",
            author:"",
            currentDiets:[],
            mainIngredients:[],
            courses:[],
            countries:[],
            mealTypes:[],
            ingredients:[],
            diets:[],
            recipeIngredients:[],
            allergieIng:[],
            filter:''
        }
    },
    components:{
        AddRecipeIngredients
    },
    computed:{
        searchParams: function(){
            let params ={
                "cat_id":[],
                'ingredients':[],
                'allergies':[]
            }
            if (this.mainIngredient!=='None') params.ing_type = this.mainIngredient
            if (this.singleCourse!=='None') params.cat_id.push(this.singleCourse)
            if (this.singleCountry!=='None') params.cat_id.push(this.singleCountry)
            if (this.mealType!=='None') params.cat_id.push(this.mealType)
            if (this.recName!=='') params.rec_name=this.recName
            if (this.author!=='') params.usr_name=this.author
            for (let i=0;i<this.currentDiets.length;i++){
                params.cat_id.push(this.currentDiets[i])
            }
            for (let i=0;i<this.recipeIngredients.length;i++){
                params.ingredients.push(this.recipeIngredients[i].ingId)
            }
            for (let i=0;i<this.allergieIng.length;i++){
                params.allergies.push(this.allergieIng[i].ingId)
            }
            if (params.cat_id.length===0) Vue.delete(params, 'cat_id')
            else params.cat_id=JSON.stringify(params.cat_id)

            if (params.ingredients.length===0) Vue.delete(params, 'ingredients')
            else params.ingredients=JSON.stringify(params.ingredients)

            if (params.allergies.length===0) Vue.delete(params, 'allergies')
            else params.allergies=JSON.stringify(params.allergies)

            return params
        },
        arrsEmpty:function(){
            if (this.recipeIngredients.length===0 && this.allergieIng.length===0) return true
            else return false
        },
        filteredIng: function(){
            return this.ingredients.filter((ing)=>{
                for (let recIng of this.recipeIngredients){
                    if (JSON.stringify(ing)===JSON.stringify(recIng)) return false
                }
                for (let allIng of this.allergieIng){
                    if (JSON.stringify(ing)===JSON.stringify(allIng)) return false
                }
                return true
            })
        },
    },
    methods:{
        fetchIngredients(){
            this.ingredients = []
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient",{params:{
                filter:this.filter
            }})
            .then((res)=>{
                if (res.data.res==="ok"){
                    let ing = res.data.data
                    for(let i = 0; i < ing.length; i++){
                        this.ingredients.push(new Ingredient(
                            ing[i].ing_id,
                            ing[i].ing_name,
                            ing[i].units,
                            ing[i].img_link
                        ))
                    }
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchMealTypes(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    cat_name: "meal-type"
                }
            })
            .then((res)=>{
                this.mealTypes = res.data.data
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchCourses(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    cat_name: "course"
                }
            })
            .then((res)=>{
                let c = res.data.data
                for(let i = 0; i < c.length; i++){
                    this.courses.push(c[i])
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchCountries(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    cat_name: "country"
                }
            })
            .then((res)=>{
                this.countries = res.data.data
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchDiets(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    cat_name: "diet"
                }
            })
            .then((res)=>{
                let d = res.data.data
                for(let i = 0; i < d.length; i++){
                    this.diets.push(d[i])
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchMainIngredients(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    cat_name: "ing-type"
                }
            })
            .then((res)=>{
                this.mainIngredients = res.data.data
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },

    addToRecipe(ing){
            this.recipeIngredients.push(ing)
            this.recipeIngredients.sort(function(a, b){
                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB)
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            })
            for(let i = 0; i < this.ingredients.length; i++){
                if(this.ingredients[i].name === ing.name){
                    this.ingredients.splice(i, 1)
                    return
                }
            }
        },
        removeFromRecipe(ing){
            this.allergieIng.push(ing)
            for(let i = 0; i < this.ingredients.length; i++){
                if(this.ingredients[i].name === ing.name){
                    this.ingredients.splice(i, 1)
                    return
                }
            }
        },
    HandleRemoveFromRecipeIngredients(index,ing){
            this.recipeIngredients.splice(index, 1)
            let check = true
            for (let ingg of this.ingredients){
                if (JSON.stringify(ingg)===JSON.stringify(ing))
                    check=false
            }
            if (check)
                this.ingredients.push(ing)
                this.ingredients.sort(function(a, b){
                    let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                    if (nameA < nameB)
                        return -1 
                    if (nameA > nameB)
                        return 1
                    return 0
                })
        },
    HandleRemoveFromAllergies(index,ing){
        this.allergieIng.splice(index, 1)
            let check = true
            for (let ingg of this.ingredients){
                if (JSON.stringify(ingg)===JSON.stringify(ing))
                    check=false
            }
            if (check)
                this.ingredients.push(ing)
    },
    handleDietType(diets){
            for(let i = 0; i < this.currentDiets.length; i++){
                if(this.currentDiets[i] === diets){
                    this.currentDiets.splice(i, 1)
                    return
                }
            }
            this.currentDiets.push(diets)
        },
    fetchCurrentDiets(){
            this.currentDiets = []
            if (this.dietsProp!=null && this.dietsProp.length>0){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{params:{
                cat_ids:JSON.stringify(this.dietsProp)
            }})
            .then((res)=>{
                if (res.data.res==='ok'){
                    let diets = res.data.data
                    for(let i = 0; i < diets.length; i++){
                        this.currentDiets.push(diets[i].rct_id)
                    }
                }
                else console.log(res.data.msg)
            })
            .catch((ex)=>{
                console.error(ex)
            })
            }
        },
        fetchAllergies(){
            this.allergieIng = []
            if (this.allergiesProp!=null && this.allergiesProp.length>0){
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient",{params:{
                ids:JSON.stringify(this.allergiesProp)
            }})
            .then((res)=>{
                let ing = res.data.data
                for(let i = 0; i < ing.length; i++){
                    this.allergieIng.push(new Ingredient(
                        ing[i].ing_id,
                        ing[i].ing_name,
                        ing[i].units,
                        ing[i].img_link
                    ))
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
            }
        },
    reset(){
        this.mainIngredient="None"
        this.singleCourse='None',
        this.singleCountry='None',
        this.mealType='None',
        this.recName="",
        this.author="",
        this.fetchCurrentDiets()
        this.recipeIngredients=[],
        this.fetchAllergies()
        this.filter=''
        this.fetchIngredients()
        this.$emit('search',{
            'allergies':JSON.stringify(this.allergiesProp),
            'cat_id':JSON.stringify(this.dietsProp)
        })
    }
    },
    mounted(){
        this.fetchIngredients()
        this.fetchCourses()
        this.fetchCountries()
        this.fetchMainIngredients()
        this.fetchDiets()
        this.fetchMealTypes()
        this.fetchCurrentDiets()
        this.fetchAllergies()

    }

}
</script>

<style scoped>

    .mainDiv{
        width: 75%;
        background-color: white;
        margin: auto;
        padding: 5px;
    }

    .mainDiv > div{
        padding: 5px;
        margin: 15px 5px;
        background: rgba(255, 255, 255, 0.884);
        margin-top: -5px;
    }

    .recipe-categories{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .recipe-categorie{
        margin: 5px;
        border: 1px solid #000;
        padding: 10px;
        flex-grow: 1;
    }

    .recipe-categorie span{
        display: flex;
        text-align: center;
        justify-content: center;
    }

    .transitions {
        display: flex;
        justify-content: space-between;
        border: none;
    }
    .trans {
        border: 1px solid #000;
        width: 49%;
    }
    .bordered {
        border: 1px solid #000;
    }
    p{
        font-size: 110%;
        font-weight:bold;
        padding: 0px;
    }

    p input {
        margin-left: 10px;
    }

    .nameWrap {
        display: flex;
        justify-content: space-between;
    }
    .nameWrap div {
        flex-grow: 1;
    }
    .ingredients{
        max-height: 145px;
        overflow-y: auto;
    }

    button {
        margin-top: 0px;
        margin-bottom: 5px;
    }
</style>