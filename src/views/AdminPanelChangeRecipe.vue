<template>
  <div class="recipes-wrap">
        <span class="exit-btn"><button @click="$router.go(-1)">X</button></span>
        <div v-if="singleRecipe">
            <div>
                <h4>Name: </h4>
                <input type="text" v-model="singleRecipe.name">
            </div>
            <div>
                <h4>Preparation time: </h4>
                <button @click="removeTime">-</button>
                <input type="text" v-model="singleRecipe.prepTime" class="number-input"> minutes.
                <button @click="addTime">+</button>
            </div>
            <div>
                <add-recipe-images :imageUrl="singleRecipe.imgLinks" @handleRemoveImg="handleRemoveImg" @handleAddFile="handleAddFile" />
            </div>
            <div class="recipe-categories">
                    <div class="recipe-categorie">
                        <p>Choose main ingredient:</p>
                        <select v-model="singleRecipe.itpName">
                            <option v-for="(mainIng, index) in mainIngredients" :key="index"> {{mainIng.itp_name}} </option>
                        </select>
                    </div>
                    <div class="recipe-categorie">
                        <p>Choose meal type:</p>
                        <select v-model="singleRecipe.mealType[0]">
                            <option v-for="(meal, index) in mealTypes" :key="index" :value="meal.rct_name"> {{meal.rct_name}} </option>
                        </select>
                    </div>
                    <div class="recipe-categorie">
                        <p>Choose course type:</p>
                        <select v-model="singleRecipe.course[0]" >
                            <option v-for="(course, index) in courses" :key="index" :value="course.courseName"> {{course.courseName}} </option>
                        </select>
                    </div>
                    <div class="recipe-categorie">
                        <p>Choose country (optional) :</p>
                        <select v-model="singleRecipe.country[0]" >
                            <option value="Empty">Empty</option>
                            <option v-for="(country, index) in countries" :key="index" :value="country.rct_name"> {{country.rct_name}} </option>
                        </select>
                    </div>
                    <div class="recipe-categorie">
                        <p>Choose diet type:</p>
                        <span v-for="(diet, index) in diets" :key="index">
                            {{diet.dietName}} 
                            <input type="checkbox" :value="diet.dietName" @change="addDiets" :checked="diet.val">
                        </span>
                    </div>
            </div>
            <div>
                <div class="ingredients">
                    <add-recipe-ingredients :trash="true" :amount="true"  v-for="(ingredient, index) in singleRecipe.ingredients" :ingredient="ingredient" :key="ingredient.name" @remove="HandleRemoveFromRecipeIngredients(index,ingredient)"/>
                </div>
                <div class="column">
                    <p>Search by ingredients: 
                        <input type="text" placeholder="Filter..." v-model="filter" @change="fetchIngredients">
                    </p>    
                <div class="ingredients">
               
                    <add-recipe-ingredients v-for="(ingredient, index) in filteredIng" :ingredient="ingredient" :key="ingredient.ingId" @addToRecipe="addToRecipe(ingredient,index)"/>
                </div>
                </div>
            </div>
            <add-recipe-steps @addToSteps="addToSteps" @changeStep="changeStep" @removeFromSteps="removeFromSteps" :steps="singleRecipe.steps" :showChangeStep="showChangeStep" />
            <button @click="handleChangeRecipe">Change recipe</button>
            <button @click="deleteRecipe">Delete recipe</button>
        </div>
        <p v-else>Recipe not found</p>
  </div>
</template>

<script>
import axios from 'axios'
import Ingredient from '../javascript/Ingredient'
import Step from '../javascript/Step'
import CourseType from '../javascript/CourseType'
import Diet from '../javascript/DietType'
import Recipe from '../javascript/Recipe'
import AddRecipeSteps from '../components/UserPanel/AddRecipePanel/AddRecipeSteps'
import AddRecipeImages from '../components/UserPanel/AddRecipePanel/AddRecipeImages'
import addRecipeIngredients from "../components/UserPanel/AddRecipePanel/AddRecipeIngredients"

export default {
    components:{
        AddRecipeSteps,
        AddRecipeImages,
        addRecipeIngredients

    },
    data(){
        return{
            recipes: [],
            images:[],
            singleRecipe: null,
            ingredients: [],
            steps:[],
            showChangeStep: false,
            stepNumber: 1,
            mealTypes: [], 
            courses: [], 
            countries: [], 
            diets: [],
            mainIngredients: [],
            imageUrl: [],
            singleRecipeImages: [],
            singleRecipeImagesIds: [],
            filter:''
        }
    },

    computed:{
        filteredIng:function(){
            return this.ingredients.filter((ing)=>{
                for (let recIng of this.singleRecipe.ingredients){
                    if (JSON.stringify(ing.name)===JSON.stringify(recIng.name)) return false
                }
                return true
            })

        }
    },
    methods:{
        addDiets(e){
            let d = e.target
            for(let i = 0; i < this.singleRecipe.diets.length; i++){
                if(this.singleRecipe.diets[i] === d.value){
                    this.singleRecipe.diets.splice(i, 1)
                    return
                }
            }
            if(d.checked === true){
                this.singleRecipe.diets.push(d.value)
            }
            console.log(this.singleRecipe.diets)
        },
        changeSingleRecipe(recId){
            this.courses = []
            this.diets = []
            this.ingredients = []
            this.countries = []
            this.mainIngredients = []
            this.mealTypes = []
            axios.get("http://108m122.e2.mars-hosting.com/api/recipes/" + recId)
            .then((res)=>{
                let recipe = res.data.data[0]
                if(recipe.img_links === null){
                    this.singleRecipe = (new Recipe(
                    recipe.rec_id, 
                    recipe.rec_name,
                    recipe.rec_preptime,
                    recipe.usr_id,
                    recipe.itp_id,
                    recipe.itp_name,
                    recipe.meal_type,
                    recipe.ratings
                    ))
                    this.singleRecipe.imgLinks.push({
                        imgId: "none",
                        imgLink: "/genericimg.jpg"
                    })
                    for(let i = 0; i < recipe.ingredients.length; i++){
                        this.singleRecipe.ingredients.push(new Ingredient(
                            recipe.ingredients[i].ing_id,
                            recipe.ingredients[i].ing_name,
                            recipe.ingredients[i].units,
                            recipe.ingredients[i].img_link
                        ))
                        this.singleRecipe.ingredients[i].amount = recipe.ingredients[i].rci_amount
                        this.singleRecipe.ingredients[i].unit = recipe.ingredients[i].uni_name
                    }
                    for(let i = 0; i < recipe.steps.length; i++){
                        this.singleRecipe.steps.push(new Step(
                            recipe.steps[i].ste_description,
                            recipe.steps[i].ste_number
                        ))
                    }
                    this.singleRecipe.course = recipe.course
                    if(recipe.country === null){
                        this.singleRecipe.country.push("Empty")
                    }else{
                        this.singleRecipe.country = recipe.country
                    }
                    if(recipe.diets){
                        this.singleRecipe.diets = recipe.diets
                    }else{
                        this.singleRecipe.diets = []
                    }
                    this.fetchIngredients()
                    this.fetchMealTypes()
                    this.fetchCourses()
                    this.fetchCountries()
                    this.fetchDiets()
                    this.fetchMainIngredients()
                    setTimeout(()=>{
                        this.updateIngredients()
                    }, 2000)
                    return
                }
                this.singleRecipe = (new Recipe(
                    recipe.rec_id, 
                    recipe.rec_name,
                    recipe.rec_preptime,
                    recipe.usr_id,
                    recipe.itp_id,
                    recipe.itp_name,
                    recipe.meal_type,
                    recipe.ratings
                ))
                for(let i = 0; i < recipe.img_links.length; i++){
                    this.singleRecipe.imgLinks.push({
                        imgId: recipe.img_ids[i],
                        imgLink: recipe.img_links[i]
                    })
                }
                for(let i = 0; i < recipe.ingredients.length; i++){
                    this.singleRecipe.ingredients.push(new Ingredient(
                        recipe.ingredients[i].ing_id,
                        recipe.ingredients[i].ing_name,
                        recipe.ingredients[i].units,
                        recipe.ingredients[i].img_link                
                    ))
                    this.singleRecipe.ingredients[i].amount = recipe.ingredients[i].rci_amount
                    this.singleRecipe.ingredients[i].unit = recipe.ingredients[i].uni_name
                }
                for(let i = 0; i < recipe.steps.length; i++){
                    this.singleRecipe.steps.push(new Step(
                        recipe.steps[i].ste_description,
                        recipe.steps[i].ste_number
                    ))
                }
                this.singleRecipe.course = recipe.course
                if(recipe.country === null){
                    this.singleRecipe.country.push("Empty")
                }else{
                    this.singleRecipe.country = recipe.country
                }
                if(recipe.diets){
                    this.singleRecipe.diets = recipe.diets
                }else{
                    this.singleRecipe.diets = []
                }
                this.fetchIngredients()
                this.fetchMealTypes()
                this.fetchCourses()
                this.fetchCountries()
                this.fetchDiets()
                this.fetchMainIngredients()
                setTimeout(()=>{
                    this.updateIngredients()
                }, 2000)
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        handleChangeRecipe(){
            console.log(this.singleRecipe.diets)
            let formData = new FormData()
                formData.append('sid', sessionStorage.getItem("sid")) 
                formData.append('name', this.singleRecipe.name) 
                formData.append('time', this.singleRecipe.prepTime) 
                formData.append('ing_type', this.singleRecipe.itpName) 
                formData.append('meal_type', this.singleRecipe.mealType[0])
                formData.append('course', this.singleRecipe.course[0])
                formData.append('ingredients', JSON.stringify(this.singleRecipe.ingredients))
                formData.append('steps', JSON.stringify(this.singleRecipe.steps))
                
                if(this.singleRecipe.country[0] != "Empty"){
                    formData.append('country', this.singleRecipe.country[0])
                }

                if(this.singleRecipe.diets.length > 0){
                    formData.append('diets', JSON.stringify(this.singleRecipe.diets))
                }else{
                    
                    formData.append('diets', JSON.stringify(['empty']))
                }

                if(this.singleRecipeImagesIds){
                    formData.append('img_ids', JSON.stringify(this.singleRecipeImagesIds))
                }
                if(this.singleRecipeImages){
                    for (let i = 0; i < this.singleRecipeImages.length; i++) {
                        formData.append('img_files', this.singleRecipeImages[i]);
                    }
                }
            axios.patch("http://108m122.e2.mars-hosting.com/api/recipes/" + this.singleRecipe.recId, formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.res === "ok"){
                    this.singleRecipe = null
                    this.recipes = []
                    this.$router.push("/recipes")
                }
            }).catch((err)=>{
                console.error(err)
            })
        },
        addToRecipe(ing, idx){
            this.singleRecipe.ingredients.push(ing)
            this.singleRecipe.ingredients.sort(function(a, b){
                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB)
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            })
            this.ingredients.splice(idx, 1)
        },
        HandleRemoveFromRecipeIngredients(idx, ing){
            this.singleRecipe.ingredients.splice(idx, 1)
            let check= true
            for (let ingg of this.ingredients){
                if (ingg.name===ing.name) check=false
            }
            if (check) this.ingredients.push(ing)
            this.ingredients.sort(function(a, b){
                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB)
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            })
        },
        addToSteps(step){
            if(this.singleRecipe.steps.length === 0){
                this.stepNumber = 1
            }
            this.singleRecipe.steps.push(new Step(
                step,
                this.stepNumber
            ))
            this.stepNumber++
        },
        changeStep(){
            this.showChangeStep = !this.showChangeStep
        },
        removeFromSteps(idx){
            this.singleRecipe.steps.splice(idx, 1)
            this.stepNumber -= 1
        },
        fetchIngredients(){
            this.ingredients = []
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient",{params:{
                filter:this.filter
            }})
            .then((res)=>{
                this.ingredients = []
                let ing = res.data.data
                for(let i = 0; i < ing.length; i++){
                    this.ingredients.push(new Ingredient(
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
        },
        fetchMealTypes(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    sid: sessionStorage.getItem("sid"),
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
                    sid: sessionStorage.getItem("sid"),
                    cat_name: "course"
                }
            })
            .then((res)=>{
                let course = res.data.data
                for(let i =0; i < course.length; i++){
                    this.courses.push(new CourseType(
                        course[i].rct_name
                    ))
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchCountries(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    sid: sessionStorage.getItem("sid"),
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
            axios.get("http://108m122.e2.mars-hosting.com/api/categories", {
                params:{
                    sid: sessionStorage.getItem("sid"),
                    cat_name: "diet"
                }
            })
            .then((res)=>{
                let diet = res.data.data
                for(let i =0; i < diet.length; i++){
                    this.diets.push(new Diet(
                        diet[i].rct_name
                    ))
                    for(let d of this.singleRecipe.diets){
                        if(d == diet[i].rct_name){
                            this.diets[i].val = true
                        }
                    }
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchMainIngredients(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    sid: sessionStorage.getItem("sid"),
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
        addTime(){
            this.singleRecipe.prepTime += 5
        },
        removeTime(){
            if(this.singleRecipe.prepTime  <= 0){
                return this.singleRecipe.prepTime = 0
            }
            this.singleRecipe.prepTime -= 5
        },
        updateIngredients(){
            for(let i = 0; i < this.singleRecipe.ingredients.length; i++){
                for(let j = 0; j < this.ingredients.length; j++){
                    if(this.singleRecipe.ingredients[i].name === this.ingredients[j].name){
                        this.ingredients.splice(j, 1)
                    }
                }
            }
        },
        deleteRecipe(){
            axios.delete("http://108m122.e2.mars-hosting.com/api/recipes/" + this.singleRecipe.recId, {
                params:{
                    sid: sessionStorage.getItem("sid")
                }
            })
            .then((res)=>{
                console.log(res)
                this.singleRecipe = null
                this.recipes = []
                this.fetchRecipes()
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        handleRemoveImg(idx){
            if(this.singleRecipeImages.length > 0){
                for(let i = 0; i < this.singleRecipeImages.length; i++){
                    if(this.singleRecipeImages[i] === this.singleRecipe.imgLinks[idx].file){
                        this.singleRecipeImages.splice(i, 1)
                    }
                }
            }
            this.singleRecipeImagesIds.push(this.singleRecipe.imgLinks[idx].imgId)
            this.singleRecipe.imgLinks.splice(idx, 1)
        },
        handleAddFile(e){
            let width = 500;
            if(e.target.files.length > 1){
                for(let i = 0; i < e.target.files.length; i++){
                    let fileName = e.target.files[i].name;
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files[i]);
                    reader.onload = event => {
                        let img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            let elem = document.createElement('canvas');
                            elem.width = width;
                            let scaleFactor = width / img.width;
                            elem.height = img.height * scaleFactor;
                            let ctx = elem.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                            ctx.canvas.toBlob((blob) => {
                                let file = new File([blob], fileName, {
                                    type: 'image/',
                                    lastModified: Date.now()
                                });
                                if(e.target.files[i].size < file.size){
                                    this.singleRecipe.imgLinks.push({
                                        file: e.target.files[i],
                                        imgLink: URL.createObjectURL(e.target.files[i])
                                    })
                                    this.singleRecipeImages.push(e.target.files[i])
                                }else{
                                    this.singleRecipe.imgLinks.push({
                                        file: file,
                                        imgLink: URL.createObjectURL(file)
                                    })
                                    this.singleRecipeImages.push(file)
                                }
                            }, 'image/jpeg', 1);
                        },
                        reader.onerror = error => console.log(error);
                    }
                }
                return
            }
            let fileName = e.target.files[0].name;
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = event => {
                    let img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        let elem = document.createElement('canvas');
                        elem.width = width;
                        let scaleFactor = width / img.width;
                        elem.height = img.height * scaleFactor;
                        let ctx = elem.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                        ctx.canvas.toBlob((blob) => {
                            let file = new File([blob], fileName, {
                                type: 'image/',
                                lastModified: Date.now()
                            });
                            if(e.target.files[0].size < file.size){
                                this.singleRecipe.imgLinks.push({
                                    file: e.target.files[0],
                                    imgLink: URL.createObjectURL(e.target.files[0])
                                })
                                this.singleRecipeImages.push(e.target.files[0])
                            }else{
                                this.singleRecipe.imgLinks.push({
                                    file: file,
                                    imgLink: URL.createObjectURL(file)
                                })
                                this.singleRecipeImages.push(file)
                            }
                        }, 'image/jpeg', 1);
                    },
                reader.onerror = error => console.log(error);
            }
        }
    },
    mounted(){
        this.changeSingleRecipe(this.$route.params.id)
    }
}
</script>

<style>
    .recipes-wrap{
        padding: 20px;
        width: 80%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;
        background: #fff;
        background-image: linear-gradient(to right, #fff, #dcfaec);
        margin: 100px auto;
    }
    .change-recipe{
        width: 200px;
        margin: 5px;
        cursor: pointer;
    }
    .change-recipe img{
        height: 200px;
        object-fit: cover;
    }
    .change-recipe:hover{
        opacity: .8;
    }
    .recipe-categories{
        display: flex;
    }
    .recipe-categorie{
        margin: 5px;
    }
</style>

<style scoped>
.ingredients{
    max-height: 175px;
    overflow-y: auto;
    margin: 20px 5px;
}
.exit-btn{
    top: 0;
    right: 0;
}
.column input{
    margin-left:7px;
}
.recipe-img{
    width: 90%;
    display: flex;
}
.recipes-wrap > div{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
}
</style>