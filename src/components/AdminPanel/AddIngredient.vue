<template>
    <div class="ingredient-wrap">
        <div>
            <label>Name of the ingredient: </label>
            <input type="text" v-model="ingredientName">
        </div>
        <div>
            <label>Calories: </label>
            <input type="text" v-model="ingredientCalories">
        </div>
        <div>
            <label>Density: </label>
            <input type="text" v-model="ingredientDensity">
        </div>
        <div id="addImgWrap">
            <label for="addImg">Add image</label>
            <input type="file" @change="handleAddIngredientImg" id="addImg" style="display:none">
            <img v-if="imgUrl" :src="imgUrl" alt="#">
        </div>
        <div id="submit">
            <button @click="handleSubmitIngredient">Submit ingredient</button>
        </div>
        <div v-if="err">
            {{err}}
        </div>
    </div>
</template>

<script>
export default {
    props:['imgUrl', 'err'],
    data(){
        return{
            ingredientName: "",
            ingredientCalories: "",
            ingredientDensity: "",
            ingredientImg: null
        }
    },
    methods:{
        handleSubmitIngredient(){
            this.$emit("handleSubmitIngredient", {ingName: this.ingredientName, ingCal: this.ingredientCalories, ingDens: this.ingredientDensity})
            this.ingredientName = ""
            this.ingredientCalories = ""
            this.ingredientDensity = ""
            this.ingredientImg = null
        },
        handleAddIngredientImg(e){
            this.ingredientImg = e.target.files[0]
            this.$emit("handleAddIngredientImg", this.ingredientImg)
        }
    }
}
</script>

<style scoped>
    .ingredient-wrap{
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .ingredient-wrap > div{
        margin: 3px;
        padding: 10px;
        border: 1px solid black;
        width: 25vw;
        min-width: 400px;
        display: flex;
        justify-content: space-between;
    }

    input {
        flex-grow: 1;
        margin-left: 10px;
    }

    #addImgWrap {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #submit {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
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
  width: 100px;
    }

#addImgWrap label:hover {
    background: #94320b;
    }
</style>