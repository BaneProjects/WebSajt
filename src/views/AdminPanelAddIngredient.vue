<template>
  <add-ingredient @handleSubmitIngredient="handleSubmitIngredient" @handleAddIngredientImg="handleAddIngredientImg" :imgUrl="imgUrl" :err="emptyField" />
</template>

<script>
import AddIngredient from '../components/AdminPanel/AddIngredient'
import axios from 'axios'
export default {
    components:{
        AddIngredient
    },

    data(){
        return{
            emptyField: "",
            ingredientImg: null,
            imgUrl: ""
        }
    },
    methods:{
        handleSubmitIngredient(ing){
            if(ing.ingName.length <= 4 || this.ingredientImg === null){
                this.emptyField = "Fill in all the fields correctly.."
                setTimeout(() => {
                    this.emptyField = ""
                }, 2000);
                return
            }
            if(isNaN(ing.ingCal)){
                console.log(!isNaN(ing.ingCal))
                this.emptyField = "Callories must be a number.."
                setTimeout(() => {
                    this.emptyField = ""
                }, 2000);
                return
            }
            let formData = new FormData();
                formData.append('sid', sessionStorage.getItem("sid"))
                formData.append('img', this.ingredientImg)
                formData.append('name', ing.ingName)
                formData.append('cal', ing.ingCal)
                if(ing.ingDens.length > 1 || !isNaN(ing.ingDens)){
                    formData.append('density', ing.ingDens)
                }else{
                    formData.append('density', null)
                }
            axios.post("http://108m122.e2.mars-hosting.com/api/ingredient", formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((res)=>{
                console.log(res.data)
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        handleAddIngredientImg(img){
            this.ingredientImg = img
            this.imgUrl = URL.createObjectURL(img)
        }
    }

}
</script>


<style>

</style>