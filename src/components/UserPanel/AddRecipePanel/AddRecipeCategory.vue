<template>
    <div class="recipe-categories">
        <h3>Choose categories for your recipe: </h3>
        <div class="recipe-categorie">
            <p>Choose main ingredient:</p>
            <select v-model="mainIngredient"  @change="handleMainIngredient">
                <option v-for="(mainIng, index) in mainIngredients" :key="index"> {{mainIng.itp_name}} </option>
            </select>
        </div>
        <div class="recipe-categorie">
            <p>Choose meal type:</p>
            <select v-model="singleMeal" @change="handleMealType">
                <option v-for="(meal, index) in mealTypes" :key="index" :value="meal.rct_name"> {{meal.rct_name}} </option>
            </select>
            <!-- <p>Choose meal type:</p>
            <span v-for="(meal, index) in mealTypes" :key="index">
                {{meal.rct_name}} 
                <input type="checkbox" @change="handleMealType(meal.rct_name)">
            </span> -->
        </div>
        <div class="recipe-categorie">
            <p>Choose course type:</p>
            <select v-model="singleCourse"  @change="handleCourseType">
                <option value="Empty">Empty</option>
                <option v-for="(course, index) in courses" :key="index" :value="course.courseName"> {{course.courseName}} </option>
            </select>
        </div>
        <div class="recipe-categorie">
            <p>Choose country <span class="red-font">(optional)</span></p>
            <select v-model="singleCountry"  @change="handleCountry">
                <option value="Empty">Empty</option>
                <option v-for="(country, index) in countries" :key="index" :value="country.rct_name"> {{country.rct_name}} </option>
            </select>
        </div>
        <div class="recipe-categorie">
            <p>Choose diet type: <span class="red-font">(optional)</span></p>
            <span v-for="(diet, index) in diets" :key="index">
                {{diet.dietName}} 
                <input type="checkbox" @change="handleDietType(diet.dietName)">
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'mealTypes', 
        'courses', 
        'countries', 
        'diets',
        'mainIngredients'
    ],
    data(){
        return{
            singleMeal: "",
            singleCountry: "",
            singleDiet: "",
            singleCourse: "",
            mainIngredient: ""
        }
    },
    methods:{
        handleMealType(){
            this.$emit("handleMealType", this.singleMeal)
        },
        handleCourseType(){
            this.$emit("handleCourseType", this.singleCourse)
        },
        handleCountry(){
            this.$emit("handleCountry", this.singleCountry)
        },
        handleDietType(diet){
            this.$emit("handleDietType", diet)
        },
        handleMainIngredient(){
            this.$emit("handleMainIngredient", this.mainIngredient)
        }
    }
}
</script>

<style>
    .recipe-categories{
        display: flex;
    }
    .recipe-categorie{
        margin: 5px;
        border: 1px solid #000;
        padding: 10px;
    }
    .recipe-categorie span{
        display: flex;
        justify-content: center;
    }
    
    @media screen and (max-width: 1279px) {
        .recipe-categories{
            flex-direction: column;
        }
    }
</style>