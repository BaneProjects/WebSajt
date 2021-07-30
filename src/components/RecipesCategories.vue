


<template>
  <div class="recipe-categories-nav">
    <div class="pc-nav">
        <table>
            <tr>
                <th>Main ingredients</th>
            </tr>
            <tr v-for="mainIng in mainIngredients" :key="mainIng.itp_id">
                <td @click="handleGoToCategoryIngType(mainIng.itp_id)"> {{mainIng.itp_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Courses </th>
            </tr>
            <tr v-for="course in courses" :key="course.rct_id">
                <td @click="handleGoToCategory(course.rct_id)"> {{course.rct_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Meal types </th>
            </tr>
            <tr v-for="mealType in mealTypes" :key="mealType.rct_id">
                <td @click="handleGoToCategory(mealType.rct_id)"> {{mealType.rct_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Diets </th>
            </tr>
            <tr v-for="diet in diets" :key="diet.rct_id">
                <td @click="handleGoToCategory(diet.rct_id)"> {{diet.rct_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Countries </th>
            </tr>
            <tr v-for="country in countries" :key="country.rct_id">
                <td @click="handleGoToCategory(country.rct_id)"> {{country.rct_name}} </td>
            </tr>
        </table>
    </div>
    <div class="nav-mobile">
        <table>
            <tr>
                <th @click="ShowMainIngredients = !ShowMainIngredients">Main ingredients</th>
            </tr>
            <tr :style="ShowMainIngredients ? 'display:block' : 'display:none'" v-for="mainIng in mainIngredients" :key="mainIng.itp_id">
                <td @click="handleGoToCategoryIngType(mainIng.itp_id)"> {{mainIng.itp_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th @click="ShowCourses = !ShowCourses">Courses </th>
            </tr>
            <tr :style="ShowCourses ? 'display:block' : 'display:none'" v-for="course in courses" :key="course.rct_id">
                <td @click="handleGoToCategory(course.rct_id)"> {{course.rct_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th @click="ShowMealTypes = !ShowMealTypes">Meal types </th>
            </tr>
            <tr :style="ShowMealTypes ? 'display:block' : 'display:none'" v-for="mealType in mealTypes" :key="mealType.rct_id">
                <td @click="handleGoToCategory(mealType.rct_id)"> {{mealType.rct_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th @click="ShowDiets = !ShowDiets">Diets </th>
            </tr>
            <tr :style="ShowDiets ? 'display:block' : 'display:none'" v-for="diet in diets" :key="diet.rct_id">
                <td @click="handleGoToCategory(diet.rct_id)"> {{diet.rct_name}} </td>
            </tr>
        </table>
        <table>
            <tr>
                <th @click="ShowCountries = !ShowCountries">Countries </th>
            </tr>
            <tr :style="ShowCountries ? 'display:block' : 'display:none'" v-for="country in countries" :key="country.rct_id">
                <td @click="handleGoToCategory(country.rct_id)"> {{country.rct_name}} </td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            mealTypes: [],
            courses: [],
            countries: [],
            diets: [],
            mainIngredients: [],
            ShowMainIngredients: false,
            ShowCourses: false,
            ShowMealTypes: false,
            ShowDiets: false,
            ShowCountries: false
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
        handleGoToCategory(catId){
            this.$emit("handleGoToCategory", catId)
        },
        handleGoToCategoryIngType(ingId){
            this.$emit("handleGoToCategoryIngType", ingId)
        },
        showTd(){
            console.log("test")
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

<style>
    .recipe-categories-nav .pc-nav{
        display: flex;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        width: 100%;
    }
    .recipe-categories-nav .pc-nav table{
        margin: 15px 40px;
    }
    .recipe-categories-nav .pc-nav table th{
        padding: 4px;
    }
    .recipe-categories-nav .pc-nav table td{
        cursor: pointer;
        padding: 4px;
    }
    .recipe-categories-nav .pc-nav table td:hover{
      
    }
    .nav-mobile{
        display: none;
    }
    .nav-mobile{
        position: relative;
        font-size: .95em;
        z-index: 5555;
    }
    .nav-mobile table{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin: 5px;
        cursor: pointer;
    }
    .nav-mobile table th{
        margin: 3px;
        border-bottom: 1px solid #000;
        padding: 5px;
    }
    .nav-mobile table td{
        padding: 5px;
        font-weight: 500;
        font-size: .95em;
    }
    @media screen and (max-width: 768px){
        .pc-nav{
            display: none!important;
        }
        .nav-mobile{
            display: block;
        }
    }
</style>