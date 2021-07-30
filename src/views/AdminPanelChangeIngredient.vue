<template>
    <div>
        <change-ingredient :showSpiner="showSpiner" :ingredients="ingredients" :imgUrl="imgUrl" :err="errMsg" :currentIngredient="currentIngredient" @fetch-ingredients="fetchIngredients" @goToSingleIngredient="goToSingleIngredient" @handleAddFile="handleAddFile" @changeIngredient="changeIngredient" @closeSingleIngredient="closeSingleIngredient" />
    </div>
</template>

<script>
import ChangeIngredient from '../components/AdminPanel/ChangeIngredient'
import Ingredient from '../javascript/Ingredient'
import axios from 'axios'

export default {
    components:{
        ChangeIngredient
    },
    data(){
        return{
            ingredients: [],
            errMsg: "",
            imgUrl: "",
            currentIngredient: null,
            ingredientImg: null,
            showSpiner: false,
        }
    },
    methods:{
        fetchIngredients(val){
            this.ingredients = []
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient",{params:{
                filter:val
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
        goToSingleIngredient(ingId){
            axios.get("http://108m122.e2.mars-hosting.com/api/ingredient/" + ingId)
            .then((res)=>{
                if(res.data.res === "ok"){
                    let ing = res.data.data[0]
                    this.currentIngredient = new Ingredient (
                        ing.ing_id,
                        ing.ing_name,
                        ing.units,
                        ing.img_link
                    )
                    if(ing.ing_g_per_ml){
                        this.currentIngredient.density = ing.ing_g_per_ml
                    }
                    if(ing.ing_calories){
                        this.currentIngredient.calories = ing.ing_calories
                    }
                    if(ing.img_link){
                        this.currentIngredient.img = ing.img_link
                    }
                }
                if(res.data.res === "err"){
                    this.errMsg = "Something went wrong, sorry!"
                }
                
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        handleAddFile(e){
            let width = 500;
            let fileName = e.target.files[0].name
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = event => {
                let img = new Image()
                img.src = event.target.result
                img.onload = () => {
                    let elem = document.createElement('canvas')
                    elem.width = width;
                    let scaleFactor = width / img.width
                    elem.height = img.height * scaleFactor
                    let ctx = elem.getContext('2d')
                    ctx.drawImage(img, 0, 0, width, img.height * scaleFactor)
                    ctx.canvas.toBlob((blob) => {
                        let file = new File([blob], fileName, {
                            type: 'image/',
                            lastModified: Date.now()
                        });
                        if(e.target.files[0].size < file.size){
                            this.ingredientImg = e.target.files[0]
                        }else{
                            this.ingredientImg  = file
                        }
                        
                        if(this.ingredientImg.size > 500000){
                            this.ingredientImg = null
                            this.errMsg = "Your image is too large, please compress it and then upload it again!"
                        }
                        this.imgUrl = URL.createObjectURL(file)
                    }, 'image/jpeg', 1)
                },
                reader.onerror = error => console.log(error)
                }
        },
        changeIngredient(){
            console.log(this.currentIngredient, this.ingredientImg)
            this.showSpiner = true
            let formData = new FormData();
                formData.append('sid', sessionStorage.getItem("sid")) 
                formData.append('name', this.currentIngredient.name) 
                formData.append('cal', this.currentIngredient.calories) 
                if(this.currentIngredient.density != null){
                    formData.append('density', this.currentIngredient.density) 
                }
                if (this.ingredientImg!=null)
                    formData.append('img', this.ingredientImg)

            axios.patch("http://108m122.e2.mars-hosting.com/api/ingredient/" + this.currentIngredient.ingId, formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((res)=>{
                if(res.data.res === 'ok'){
                    this.currentIngredient = null
                    this.ingredientImg = null
                    this.imgUrl = null
                    this.showSpiner = false
                }
                if(res.data.res === "err"){
                    this.errMsg = "Something went wrong, sorry!"
                }
            }).catch((err)=>{
                console.error(err)
            })
        },
        closeSingleIngredient(){
            this.currentIngredient = null
            this.ingredientImg = null
        },
        goBack(){
            return this.$router.go(-1)
        }
    },
    mounted(){
        this.fetchIngredients()
    }
}
</script>

<style scoped>
</style>