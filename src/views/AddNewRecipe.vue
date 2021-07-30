<template>
    <div class="add-new-recipe-wrap nav-top-margine">
        <div :style=' !showSpiner ? "display:none" : "display:block"' class="nav-top-margine">
            <img src="/loadingimg.gif" alt="spinner">
        </div>
        <transition name="fade" mode="out-in">
            <add-recipe @fetch-ingredients="fetchIngredients" @HandleRemoveFromRecipeIngredients="HandleRemoveFromRecipeIngredients" @handleRemoveImg="handleRemoveImg" @handleAddFile="handleAddFile" @addToSteps="addToSteps" @removeFromSteps="removeFromSteps"  @addToRecipe="addToRecipe" @handleSubmitRecipe="handleSubmitRecipe" @handleMealType="handleMealType" @handleCourseType="handleCourseType" @handleCountry="handleCountry" @handleDietType="handleDietType" @handleMainIngredient="handleMainIngredient" :ingredients="ingredients" :mealTypes="mealTypes" :courses="courses" :countries="countries" :diets="diets" :recipeIngredients="recipeIngredients" :mainIngredients="mainIngredients" :steps="steps"  :imageUrl="imageUrl" :recipeTime="recipeTime" @addTime="addTime" @removeTime="removeTime" @openAddImages="openAddImages" @openAddIngredients="openAddIngredients" :showNameTime="showNameTime" :showAddImages="showAddImages" :showAddIngredients="showAddIngredients" :showAddSteps="showAddSteps" @openAddSteps="openAddSteps" @closeAddImages="closeAddImages" @closeAddIngredients="closeAddIngredients" @closeAddSteps="closeAddSteps" />
        </transition>
        <p v-text="msg"></p>
        <pop-up-modal :msg="modalMsg" :openModal="openModal" @closeModal="closeModal"/>
    </div>
</template>

<script>
import AddRecipe from '../components/UserPanel/AddRecipePanel/AddRecipe'
import PopUpModal from '../components/PopUpModal'
import Ingredient from '../javascript/Ingredient'
import Step from '../javascript/Step'
import CourseType from '../javascript/CourseType'
import DietType from '../javascript/DietType'
import axios from 'axios'

export default {
    components:{
        AddRecipe,
        PopUpModal
    },
    data(){
        return{
            ingredients: [],
            recipeIngredients: [],
            steps:[],
            stepNumber: 1,
            mealTypes: [],
            singleMeal: "", 
            courses: [], 
            singleCourse: "",
            countries: [], 
            singleCountry: "",
            diets: [],
            mainIngredients: [],
            mainIng: "",
            recipeDiets: [],
            imageUrl: [],
            recipeImages: [],
            showSpiner: false,
            recipeTime: 0,
            showNameTime: true,
            showAddImages: false,
            showAddIngredients: false,
            showAddSteps: false,
            msg:'',
            modalMsg: "",
            openModal: false
        }
    },
    methods:{
        handleSubmitRecipe(rec){
            this.stepNumber = 1
            this.showSpiner = true
            let formData = new FormData();
                formData.append('sid', sessionStorage.getItem("sid")) 
                formData.append('name', rec.recName) 
                formData.append('time', this.recipeTime) 
                formData.append('ing_type', this.mainIng) 
                formData.append('meal_type', this.singleMeal)
                formData.append('ingredients', JSON.stringify(this.recipeIngredients))
                formData.append('course', this.singleCourse)
                formData.append('steps', JSON.stringify(this.steps))
                if(this.recipeDiets){
                    formData.append('diets', JSON.stringify(this.recipeDiets))
                }
                if(this.singleCountry){
                    formData.append('country', this.singleCountry)
                }
                if(this.recipeImages){
                    for (let i = 0; i < this.recipeImages.length; i++) {
                        formData.append('imgs', this.recipeImages[i]);
                    }
                }

            axios.post("http://108m122.e2.mars-hosting.com/api/recipes",  formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((res)=>{
                this.showSpiner = false
                if (res.data.res==="ok") {
                    this.msg="Recipe submited"
                    this.$router.push('/addrecipe')
                    .catch(()=>{

                    })
                }
                if (res.data.res === 'err'){
                    this.modalMsg = res.data.msg
                    this.openModal = true
                }
            }).catch((err)=>{
                console.error(err)
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
        HandleRemoveFromRecipeIngredients(ing){
            this.recipeIngredients.splice(ing[0], 1)
            let check = true
            for (let ingg of this.ingredients){
                if (JSON.stringify(ingg)===JSON.stringify(ing[1]))
                    check=false
            }
            if (check)
                this.ingredients.push(ing[1])
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
            if(step.length <= 5){
                return
            }
            this.steps.push(new Step(
                step,
                this.stepNumber
            ))
            this.stepNumber++
        },
        removeFromSteps(idx){
            this.steps.splice(idx, 1)
            this.stepNumber -= 1
        },
        fetchIngredients(filter){
            this.ingredients = []
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient",{params:{
                filter:filter
            }})
            .then((res)=>{
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
                    this.courses.push(new CourseType(
                        c[i].rct_name
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
                    this.diets.push(new DietType(
                        d[i].rct_name
                    ))
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
        handleMealType(meal){
            this.singleMeal = meal
        },
        handleCourseType(singleCourse){
            this.singleCourse = singleCourse
        },
        handleCountry(singleCountry){
                if(singleCountry === "Empty"){
                    this.singleCountry = null
                    return
                }
                this.singleCountry = singleCountry
        },
        handleDietType(diets){
            for(let i = 0; i < this.recipeDiets.length; i++){
                if(this.recipeDiets[i] === diets){
                    this.recipeDiets.splice(i, 1)
                    return
                }
            }
            this.recipeDiets.push(diets)
            console.log(this.recipeDiets)
        },
        handleMainIngredient(mainIng){
            this.mainIng = mainIng
        },
        handleAddFile(e){
            let width = 550;
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
                                    this.recipeImages.push(e.target.files[i]) 
                                }else{
                                    this.recipeImages.push(file)
                                }
                                console.log(this.recipeImages)
                                this.imageUrl.push(URL.createObjectURL(file))
                            }, 'image/jpeg', 1);
                        },
                        reader.onerror = error => console.log(error);
                    }
                }
                return
            }
        },
        handleRemoveImg(idx){
            this.imageUrl.splice(idx, 1)
            this.recipeImages.splice(idx, 1)
        },
        addTime(){
            this.recipeTime += 5
        },
        removeTime(){
            if(this.recipeTime <= 0){
                return this.recipeTime = 0
            }
            this.recipeTime -= 5
        },
        openAddImages(){
            this.showNameTime = false
            this.showAddImages = true
        },
        closeAddImages(){
            this.showAddImages = false
            this.showNameTime = true
        },
        openAddIngredients(){
            this.showAddImages = false
            this.showAddIngredients = true
        },
        closeAddIngredients(){
            this.showAddImages = true
            this.showAddIngredients = false
        },
        openAddSteps(){
            this.showAddIngredients = false
            this.showAddSteps = true
        },
        closeAddSteps(){
            this.showAddIngredients = true
            this.showAddSteps = false
        },
        closeModal(){
            this.openModal = false
        }
    },
    mounted(){
        this.fetchIngredients()
        this.fetchMealTypes()
        this.fetchCourses()
        this.fetchCountries()
        this.fetchDiets()
        this.fetchMainIngredients()
    }
}
</script>

<style>
    .add-new-recipe-wrap{
        width: 85%;
        margin: 85px auto;
    }

</style>