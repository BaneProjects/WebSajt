<template>
  <div class="user-panel nav-top-margine">
        <div class="card">
            <div v-if="editing" class="editing">
                <h4>Click to mark as allergy:
                    <input type="text" placeholder="Filter..." v-model="filter" @change="fetchIngredients">
                </h4>
                <div class="ingredients">
                    <transition-group name="fade" mode="out-in" class="ingredientsTrans">
                    <add-recipe-ingredients :allergies="true" v-for="(ingredient,index) in filteredIng" :ingredient="ingredient" :key="ingredient.ingId" @addAllergy="addAllergy(index,ingredient)" />
                    </transition-group>
                </div>
                <div class="ingWrap">
                    <h4>Currently marked:</h4>
                    <div class="ingredients" v-if="currentAllergies && currentAllergies.length > 0">
                        <add-recipe-ingredients :trash="true" v-for="(ingredient, index) in currentAllergies" :ingredient="ingredient" :key="index" @remove="removeAllergy(index, ingredient)"/>
                    </div>
                </div>
                <div><button @click="editAllergies">Finish</button></div>
            </div>
            <div class="notEdit" v-else>
                <h3>Your current allergies:</h3>
                <p>No recipes containing these ingredients will show up on your recipe feed unless you explicitly search for them</p>
                <div class="column" >
                    <add-recipe-ingredients :none="true" v-for="ing in currentIng" :key=ing.ing_id :ingredient="ing" />
                    <p v-if="currentIng.length===0">No allergies marked</p>
                </div>
            </div>
            <button v-if="!editing" @click="toggleEdit" class="edtButton">Edit</button>
        </div>
  </div>
</template>

<script>
import addRecipeIngredients from './AddRecipePanel/AddRecipeIngredients'
import Ingredient from '@/javascript/Ingredient'
import axios from 'axios'

export default {
    props:{
        allergies:Array,
        slide:Number
    },
    components:{
        addRecipeIngredients
    },
    computed:{
        currentAllergies:function(){
            return this.currentIng
        },
        allergyIds:function(){
            let ids = []
            for (let ing of this.currentIng){
                ids.push(ing.ingId)
            }
            return ids
        },
        filteredIng: function(){
            return this.ingredients.filter((ing)=>{
                for (let allIng of this.currentIng){
                    if (JSON.stringify(ing)===JSON.stringify(allIng)) return false
                }
                return true
            })
        }
    },
    data(){
        return{
            ingredients:[],
            editing:false,
            currentIng:[],
            filter:''
        }
    },
    methods:{
        fetchIngredients(){
            this.ingredients = []
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient",{params:{
                filter:this.filter
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
        fetchAllergies(){
            this.currentIng = []
            if (this.allergies!=null && this.allergies.length>0){
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient",{params:{
                ids:JSON.stringify(this.allergies)
            }})
            .then((res)=>{
                let ing = res.data.data
                for(let i = 0; i < ing.length; i++){
                    this.currentIng.push(new Ingredient(
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
        addAllergy(idx,ing){
            this.currentIng.push(ing)
            this.ingredients.splice(idx,1)
        },
        removeAllergy(idx,ing){
            this.currentIng.splice(idx,1)
            let check = true
            for (let ingg of this.ingredients){
                if (JSON.stringify(ingg)===JSON.stringify(ing))
                    check=false
            }
            if (check)
                this.ingredients.push(ing)
        },
        editAllergies(){
            this.$emit('editAllergies',JSON.stringify(this.allergyIds))
            this.toggleEdit()
            this.filter=''
        },
        toggleEdit(){
            this.editing=!this.editing
        }
    },
    mounted(){
        this.fetchIngredients()
        this.fetchAllergies()
    }
}
</script>

<style scoped>
.card {
        box-shadow: 2px 2px 5px #ffffff59;
        padding: 5px;
        margin: auto;
        background: #fff;
    }
.ingredients, .ingredientsTrans{
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    max-height: 175px;
    margin: 20px;
}

.ingredientsTrans {
        overflow-y: auto;
}

input{
    margin-left: 10px;
}

.notEdit {
    height: 100%;
    display: flex;
    flex-direction: column;
   padding-bottom: 100px;
   box-sizing: border-box;

}

.column {
    width: 90%;
    height: 60%;
    flex-grow: 2;

}

p {
    margin-bottom: 6vh;
}

h3 {
    margin-bottom:0px;
}

h4 {
    margin-bottom:-10px;
}

.ingWrap p {
    margin-bottom:-20px;
    margin-top: 0px;
}

.editing {
    box-sizing: border-box;
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

.editing button {
    margin-top: 20px;
}

</style>

<style>
.card{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-grow: 1;
    font-size: 1.1em;
    box-sizing: border-box;
}

.edtButton {
    position: absolute;
    bottom: 40px;
}

.column {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: auto;
}

input {
    text-align: center;
}




</style>