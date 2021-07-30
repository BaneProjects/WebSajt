<template>
    <div class="ingredient-wrap nav-top-margine">
        <div v-if="!currentIngredient" class="column">
        <p>Search:
            <input type="text" placeholder="Filter..." v-model="filter" @change="$emit('fetch-ingredients',filter)">
        </p>
        <div class="ingredient-wrap" >
            <add-recipe-ingredients :none="true" v-for="ingredient in ingredients" :ingredient="ingredient" :key="ingredient.ingId" @click.native="goToSingleIngredient(ingredient.ingId)"/>
        </div>
        </div>
        <div>
            <h2>{{err}}</h2>
        </div>
        <div :style=' !showSpiner ? "display:none" : "display:block"'>
            <img src="/loadingimg.gif" alt="spinner">
        </div>
        <div class="change-ingredient-panel" v-if="currentIngredient && !showSpiner">
            
            <h3>{{currentIngredient.name}}<span><button id="xBtn" @click="closeSingleIngredient">X</button></span></h3>
            <div>
                <label>Name of the ingredient: </label>
                <input type="text" v-model="currentIngredient.name">
            </div>
            <div>
                <label>Calories: </label>
                <input type="text" v-model="currentIngredient.calories">
            </div>
            <div>
                <label>Density: </label>
                <input type="text" v-model="currentIngredient.density">
            </div>
            <div id="addImgWrap">
                <label for="addImg">Change image</label>
                <input type="file" @change="handleAddFile" id="addImg" style="display:none">
                <img v-if="currentIngredient.img" :src="currentIngredient.img" alt="#">
            </div>
            <div id="submit">
                <button @click="handleSubmitIngredient">Change ingredient</button>
            </div>
        </div>
    </div>
</template>

<script>
import addRecipeIngredients from '../UserPanel/AddRecipePanel/AddRecipeIngredients'
export default {
    props:['imgUrl', 'err', 'ingredients', 'currentIngredient', 'showSpiner'],
    data(){
        return{
            ingName: "",
            filter:''
        }
    },
    components:{
        addRecipeIngredients
    },
    methods:{
        goToSingleIngredient(ingId){
            this.$emit('goToSingleIngredient', ingId)
        },
        handleAddFile(e){
            this.$emit('handleAddFile', e)
        },
        changeIngredient(){
            this.$emit('changeIngredient')
        },
        closeSingleIngredient(){
            this.$emit('closeSingleIngredient')
        },
        handleSubmitIngredient(){
            this.$emit('changeIngredient')
        }
    }
}
</script>

<style scoped>
    .ingredient-wrap{
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 90%;
        margin: auto auto;

    }
    .change-ingredient-panel{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
   .change-ingredient-panel > div{
        margin: 3px;
        padding: 10px;
        border: 1px solid black;
        width: 25vw;
        min-width: 400px;
        display: flex;
        justify-content: space-between;
    }
    .ingredient-img img{
        width: 300px;
        height: 300px;
        object-fit: cover;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    #addImgWrap {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #addImgWrap label {
  padding: 5px 25px;
  margin: 10px;
  outline: none;
  border: none;
  border-radius: 3px;
  background: #ca430e;
  cursor: pointer;
  color: #fff;
  font-size: 1.05em;
  width: 130px;
    }

#addImgWrap label:hover {
    background: #94320b;
    }

#submit {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
    }

#xBtn {
    margin: 0px;
    margin-left: 10px;
        height: 27px;
        padding: 1px 5px;
    }

</style>