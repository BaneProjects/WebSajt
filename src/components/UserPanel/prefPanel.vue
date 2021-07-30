<template>
<div class="user-panel nav-top-margine">
        <div class="card">
            <div v-if="editing" class="editing">
                <h4>Select desired diets:</h4>
                <div class="recipe-categorie">
                    <span v-for="diet in diets" :key="diet.rct_id">
                        {{diet.rct_name}} 
                        <input type="checkbox" @change="handleDietType(diet)" :checked="dietIds.includes(diet.rct_id)">
                    </span>
                </div>
                <button @click="editPrefs">Finish</button>
            </div>

            <div v-else class="recipe-categorie">
                <h3>Your current diets:</h3>
                <p>Only recipes aligning with these dietary preferences will show up on your feed unless you explicitly search for others</p>
                <span v-for="diet in curDiets" :key=diet.rct_name class="dietName">{{diet.rct_name}}</span>
                <p v-if="curDiets.length===0">No diets selected</p>
            </div>
            <button v-if="!editing" @click="toggleEdit" class="edtButton">Edit</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        dietsProp:Array,
        slide:Number
    },
    computed:{
        curDiets:function(){
            return this.currentDiets
        },
        dietIds: function(){
            let ids = []
            for (let diet of this.currentDiets){
                ids.push(diet.rct_id)
            }
            return ids
        }
    },
    data(){
        return{
            editing:false,
            diets:[],
            currentDiets:[]
        }
    },
    methods:{
        toggleEdit(){
            this.editing=!this.editing
        },
        editPrefs(){
            this.$emit('editPrefs',JSON.stringify(this.dietIds))
            this.editing=!this.editing            
        },
        handleDietType(diet){
             for(let i = 0; i < this.currentDiets.length; i++){
                if(this.currentDiets[i].rct_id === diet.rct_id){
                    this.currentDiets.splice(i, 1)
                    return
                }
            }
            this.currentDiets.push(diet)
        },
        fetchDiets(){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{
                params:{
                    cat_name: "diet"
                }
            })
            .then((res)=>{
                if (res.data.res==='ok'){
                    this.diets=[]
                    let d = res.data.data
                    for(let i = 0; i < d.length; i++){
                        this.diets.push(d[i])
                    }
                }
                else console.log(res.data.msg)
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        fetchCurrentDiets(){
            this.currentDiets = []
            if (this.dietsProp!=null && this.dietsProp.length>0){
            axios.get("http://108m122.e2.mars-hosting.com/api/categories",{params:{
                cat_ids:JSON.stringify(this.dietsProp)
            }})
            .then((res)=>{
                if (res.data.res==='ok'){
                    let diets = res.data.data
                    for(let i = 0; i < diets.length; i++){
                        this.currentDiets.push(diets[i])
                    }
                }
                else console.log(res.data.msg)
            })
            .catch((ex)=>{
                console.error(ex)
            })
            }
        }
    },
    mounted(){
        this.fetchDiets()
        this.fetchCurrentDiets()
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
.recipe-categorie {
    align-items: stretch;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
   padding-bottom: 100px;
   box-sizing: border-box;
}
span {
    margin: 5px;
}

p {
    margin-bottom: 6vh;
}

    h3 {
        margin-bottom:0px;
    }


.recipe-categorie span {
    margin: 3px;
        border: 1px solid #000;
        padding: 5px 10px;
        font-size: 0.9em;
        height: 40px;
        line-height: 30px;
        white-space: nowrap;
        cursor: pointer;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
}

.recipe-categorie span:hover {
    background: rgb(240, 239, 239);
}

.editing {
    height: 100%;
    display: flex;
    flex-direction: column;
   padding-bottom: 35px;
   box-sizing: border-box;
}
</style>