<template>
    <div class="add-recipe">
        <div v-if="showNameTime" class="add-recipe-name">
            <div>
                <h4>Name of the Recipe: </h4>
                <input type="text" v-model="recipeName">
            </div>
            <div>
                <h4>Preparation time: </h4>
                <span>
                    <button @click="removeTime">-</button>
                    {{recipeTime}} <span v-if="recipeTime > 0">minutes </span>
                    <button @click="addTime">+</button>
                </span>
            </div>
            <button @click="openAddImages">Next</button>
        </div>
        <add-recipe-images v-if="showAddImages" @handleRemoveImg="handleRemoveImg" @handleAddFile="handleAddFile" :imageUrl="imageUrl"/>
        <add-recipe-category v-if="showAddImages" :mealTypes="mealTypes" :courses="courses" :countries="countries" :diets="diets" :mainIngredients="mainIngredients" @handleMealType="handleMealType" @handleCourseType="handleCourseType" @handleCountry="handleCountry" @handleDietType="handleDietType" @handleMainIngredient="handleMainIngredient" />
        
        <div v-if="showAddImages"> 
            <button @click="closeAddImages">Back</button>
            <button @click="openAddIngredients">Next</button>
        </div>
    
        <div v-if="showAddIngredients">
            <h3>Click to add ingredients:
                <input type="text" placeholder="Filter..." v-model="filter" @change="$emit('fetch-ingredients',filter)">
            </h3>
            <div class="ingredients">
                <add-recipe-ingredients v-for="ingredient in filteredIng" :ingredient="ingredient" :key="ingredient.ing_id" @addToRecipe="addToRecipe(ingredient)" />
            </div>
        </div>
        
            <div class="ingredients" v-if="recipeIngredients.length > 0 && showAddIngredients">
                <add-recipe-ingredients :trash="true" :amount='true' v-for="(ingredient, index) in recipeIngredients" :ingredient="ingredient" :key="index" @remove="HandleRemoveFromRecipeIngredients(index, ingredient)"/>
            </div>
        <div v-if="showAddIngredients" > 
            <button @click="closeAddIngredients">Back</button>
            <button @click="openAddSteps">Next</button>
        </div>
        <div v-if="showAddSteps">
            <add-recipe-steps @changeStep="changeStep" @addToSteps="addToSteps" @removeFromSteps="removeFromSteps" :steps="steps" :showChangeStep="showChangeStep"/>
            <button @click="closeAddSteps">Back</button>
            <button @click="handleSubmitRecipe">Submit Recipe</button>
        </div>
    </div>
</template>

<script>
import AddRecipeIngredients from './AddRecipeIngredients'
import AddRecipeSteps from './AddRecipeSteps'
import AddRecipeCategory from './AddRecipeCategory'
import AddRecipeImages from './AddRecipeImages'

export default {
    props:[
        'ingredients',
        'mainIngredients',
        'mealTypes', 
        'courses', 
        'countries', 
        'diets',
        'recipeIngredients',
        'steps',
        'imageUrl',
        'recipeTime',
        'showChangeStep',
        'showNameTime',
        'showAddImages',
        'showAddIngredients',
        'showAddSteps'
    ],
    components:{
        AddRecipeIngredients,
        AddRecipeSteps,
        AddRecipeCategory,
        AddRecipeImages
    },
    computed:{
        filteredIng: function(){
            return this.ingredients.filter((ing)=>{
                for (let recIng of this.recipeIngredients){
                    if (JSON.stringify(ing)===JSON.stringify(recIng)) return false
                }
                return true
            })
        }
    },
    data(){
        return{
            recipeName: "",
            filter:''
        }
    },
    methods:{
        handleSubmitRecipe(){
            this.$emit("handleSubmitRecipe", {recName: this.recipeName})
            this.recipeName = ""
        },
        addToRecipe(ingredient){
            this.$emit("addToRecipe", ingredient)
        },
        HandleRemoveFromRecipeIngredients(index, ing){
            this.$emit("HandleRemoveFromRecipeIngredients", [index, ing])
        },
        addToSteps(step){
            this.$emit("addToSteps", step)
        },
        changeStep(){
            this.$emit("changeStep")
        },
        removeFromSteps(idx){
            this.$emit("removeFromSteps", idx)
        },
        handleMealType(meal){
            this.$emit("handleMealType", meal)
        },
        handleCourseType(courseType){
            this.$emit("handleCourseType", courseType)
        },
        handleCountry(country){
            this.$emit("handleCountry", country)
        },
        handleDietType(dietType){
            this.$emit("handleDietType", dietType)
        },
        handleMainIngredient(mainIng){
            this.$emit("handleMainIngredient", mainIng)
        },
        handleAddFile(img){
            this.$emit("handleAddFile", img)
        },
        handleRemoveImg(idx){
            this.$emit("handleRemoveImg", idx)
        },
        addTime(){
            this.$emit("addTime")
        },
        removeTime(){
            this.$emit("removeTime")
        },
        openAddImages(){
            this.$emit("openAddImages")
        },
        closeAddImages(){
            this.$emit("closeAddImages")
        },
        openAddIngredients(){
            this.$emit("openAddIngredients")
        },
        closeAddIngredients(){
            this.$emit("closeAddIngredients")
        },
        openAddSteps(){
            this.$emit("openAddSteps")
        },
        closeAddSteps(){
            this.$emit("closeAddSteps")
        },
        fetchIngredients(){
            this.$emit("fetchIngredients",this.filter)
        }
    }
}
</script>

<style>
    .add-recipe{
        padding: 0;
    }
    .add-recipe > div{
        box-shadow: 1px 1px 5px #000000b1;
        padding: 10px;
        margin: 5px;
        background: rgba(255, 255, 255, 0.884);
    }
    .add-recipe > div:hover{
        box-shadow: inset 0 0 5px #000000b1;
    }
    .add-recipe div{
        margin: 5px;
    }
    .ingredients{
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        max-height: 200px;
        overflow-y: auto;
    }
    .ingredients > span{
        display: flex;
        flex-wrap: wrap;
    }
    .add-recipe-name input{
        width: 300px;
        padding: 10px;
    }

    h3 input {
        margin-left: 10px;
    }
    @media screen and (max-width: 768px){
        .add-recipe-name input{
            width: 85%;
        }
    }
</style>
