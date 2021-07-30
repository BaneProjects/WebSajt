<template>
<div id="categoriesWrap">
    <div id="categoriesWrap" v-if="!showSingleCat && !showSingleIng">
        <div class="addNew">
            <p>Add new category:</p>
                <div class="inputWrap">
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="name">
                </div>
                <div class="inputWrap">
                    <label for="type">Type:</label>
                    <select id="type" v-model="type">
                        <option value="diet" selected="selected">Diet</option>
                        <option value="course">Course</option>
                        <option value="meal-type">Meal types</option>
                        <option value="country">Country</option>
                        <option value="ingredient-type">Ingredient type</option>
                    </select>
                </div>
                <button @click="addCat">Add</button>
                <p v-text="msg"></p>
        </div>

        <the-categories :categories="mainIngredients" cat_name="Ingredient types" @changeIng="changeIng"/>
        <the-categories :categories="courses" cat_name="Courses" @changeCat="changeCat"/>
        <the-categories :categories="mealTypes" cat_name="Meal types" @changeCat="changeCat"/>
        <the-categories :categories="diets" cat_name="Diets" @changeCat="changeCat"/>
        <the-categories :categories="countries" cat_name="Countries" @changeCat="changeCat"/>
  
    </div>

    <div v-if="showSingleCat">
            <div class="inputWrap">

                <label for="name" >Name:</label>
                <input type="text" id="name" v-model="currentCat.rct_name">
            </div>
            <div class="inputWrap">
                <label for="type">Type:</label>
                <select id="type" v-model="currentCat.rct_type">
                    <option value="diet">Diet</option>
                    <option value="course">Course</option>
                    <option value="meal-type">Meal types</option>
                    <option value="country">Country</option>
                </select>
            </div>
                <button @click="confirmCat">Confirm</button>
                <button id="xBtn" @click="close">Back</button>
                <p v-text="msg"></p>      
    </div>

    <div v-if="showSingleIng">
            <div class="inputWrap">
                <label for="name" >Name:</label>
                <input type="text" id="name" v-model="currentIng.itp_name">
            </div>
            <button @click="confirmIng">Confirm</button>
            <button id="xBtn" @click="close">Back</button>
            <p v-text="msg"></p>      
    </div>
</div>
</template>

<script>
import theCategories from '../components/TheCategories'
import axios from 'axios'
export default {
components:{
    theCategories
},
data(){
    return{
        mealTypes: [],
        courses: [],
        countries: [],
        diets: [],
        mainIngredients: [],
        name:"",
        type:"",
        msg:'',
        showSingleCat:false,
        showSingleIng:false,
        currentCat:null,
        currentIng:null 
    }
},

methods:{
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
                this.courses = res.data.data
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
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    sid: sessionStorage.getItem("sid"),
                    cat_name: "diet"
                }
            })
            .then((res)=>{
                this.diets = res.data.data
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

        addCat(){
            this.msg=""
            axios.post("http://108m122.e2.mars-hosting.com/api/categories",{
                    sid: sessionStorage.getItem("sid"),
                    name: this.name,
                    type:this.type
            })
            .then((res)=>{
                if (res.data.res!=="ok")
                    this.msg=res.data.msg
                else {
                    this.fetchMealTypes()
                    this.fetchCourses()
                    this.fetchCountries()
                    this.fetchDiets()
                    this.fetchMainIngredients()
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        changeCat(cat){
            this.msg=''
            this.currentCat=cat
            this.showSingleCat=true


        },
        confirmCat(){
            this.msg=''
            axios.patch(`http://108m122.e2.mars-hosting.com/api/categories/${this.currentCat.rct_id}`,{
                    sid: sessionStorage.getItem("sid"),
                    name: this.currentCat.rct_name,
                    type:this.currentCat.rct_type
            })
            .then((res)=>{
                if (res.data.res!=="ok")
                    this.msg=res.data.msg
                else {
                    this.fetchMealTypes()
                    this.fetchCourses()
                    this.fetchCountries()
                    this.fetchDiets()
                    this.fetchMainIngredients()
                    this.showSingleCat=false
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })

        },
        changeIng(ing){
            this.msg=''
            this.currentIng=ing
            this.showSingleIng=true
        },
        confirmIng(){
            this.msg=''
            axios.patch(`http://108m122.e2.mars-hosting.com/api/categories/${this.currentIng.itp_id}`,{
                    sid: sessionStorage.getItem("sid"),
                    name: this.currentIng.itp_name,
                    type:'ingredient-type'
            })
            .then((res)=>{
                if (res.data.res!=="ok")
                    this.msg=res.data.msg
                else {
                    this.fetchMealTypes()
                    this.fetchCourses()
                    this.fetchCountries()
                    this.fetchDiets()
                    this.fetchMainIngredients()
                    this.showSingleIng=false
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },

        close(){
            this.msg=''
            this.fetchMealTypes()
            this.fetchCourses()
            this.fetchCountries()
            this.fetchDiets()
            this.fetchMainIngredients()
            this.showSingleIng=false
            this.showSingleCat=false
        }
},
 mounted(){
        this.fetchMealTypes()
        this.fetchCourses()
        this.fetchCountries()
        this.fetchDiets()
        this.fetchMainIngredients()
    }

}
</script>

<style scoped>

#categoriesWrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: white;
    margin: 40px 10px;
}

.addNew {
    width: 100%;
    min-height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border: solid black 1px;
    margin: 10px;
}

.addNew p {
    width: 100%;
}

input, select {
    background: white;
}

label {
    margin-right: 5px;
}

.inputWrap {
    margin: 10px;
    white-space: nowrap;
}

.btnDiv{
    width: 100%;
}

</style>