<template>
<div class="mDiv">
    <div class="btnWrap">
        <button @click="setTrend" :class="{active:sort==='trending'}">Trending</button>
        <button @click="setNew" :class="{active:sort==='new'}">New</button>
        <button @click="setPop" :class="{active:sort==='popular'}">Popular</button>
      </div>
  <div class="recipes">
        <div class="recipe" v-for="(recipe, idx) in recipes" :key="recipe.recId" >
            <div class="show-pointer">
                <div class="show-pointer" >
                    <img :src="recipe.imgLinks[0]" :alt="recipe.name">
                    <div class="tooltip"><h3>Click here to read more..</h3></div>
                </div>
                <h3>{{recipe.name}}</h3>
                <h3>Rating: <i class="fa fa-star"></i> {{Math.round(recipe.rating*100)/100}}</h3>
            </div>
            <button :style="recipe.recRepVal ? 'background: #00000070; cursor: auto' : ''" class="tooltip-report" v-if="currentUser && currentUser.userId != null && currentUser.level === 2" :disabled="recipe.recRepVal" @click="reportRecipe(recipe.recId, idx)"> <i class="fa fa-flag"></i>  Report</button>
            <div class="overlay"  @click="goToSingleRecipe(recipe.recId)"></div>
        </div>
  </div>
</div>
</template>

<script>

export default {
    props:{
        recipes: Array,
        sort:String,
        currentUser: Object
    },
    methods:{
        goToSingleRecipe(recId){
            this.$emit("goToSingleRecipe", recId)
        },
        setNew(){
            this.$emit('clicked', 'new')
        },
        setPop(){
            this.$emit('clicked', 'popular')
        },
        setTrend(){
            this.$emit('clicked', 'trending')
        },
        reportRecipe(recId, idx){
            this.$emit('reportRecipe', {recId: recId, idx: idx})
        }
    }
}
</script>

<style>
    .recipes{
        display: flex;
        margin: 0 auto;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;

    }
    .recipe{
        position: relative;
        cursor: pointer;
    }
    .recipe .show-pointer .tooltip{
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffffea;
        opacity: 0;
        border-radius: 3px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.53);
        transition: .3s;
        z-index: 10;
    }

    .btnWrap {
        display: flex;
        width: 98%;
        justify-content: center;
    }

    .active {
        background-color: #94320b;
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.66);
    }
</style>

<style scoped>

.mDiv {
    padding: 0px 30px;
}
</style>