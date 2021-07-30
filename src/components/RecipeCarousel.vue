<template>
    <div class="mainDiv" >
        <button @click="changeTrans(1)" class="arrow-left" :class="{inactive:this.translate>=0}"></button>
        <div class="frame">
            <div class="recCarousel" >
                <div v-for="recipe in recipes" :key="recipe.recId" class="wrap show-pointer" :style="transString">
                    <div class="recipe" @click="goToSingleRecipe(recipe.recId)">
                        <div>
                            <img :src="recipe.imgLinks[0]" :alt="recipe.name">
                        </div>
                        <h3>{{recipe.name}}</h3>
                        <h3>Rating: <i class="fa fa-star"></i> {{Math.round(recipe.rating*100)/100}}</h3>
                        <div class="overlay"></div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="changeTrans(-1)" class="arrow-right" :class="{inactive:this.translate<=rightLim}"></button>
    </div>
</template>

<script>

export default {
    props:{
        recipes:Array
    },
    data(){
        return{
            len:this.recipes.length,
            translate:0

        }
    },
    computed:{
        transString: function() {return `transform: translate(${this.translate}%,0)`},
        rightLim: function() {return -100*this.recipes.length+400}
    },
    methods:{
            goToSingleRecipe(recId){
                this.$emit("goToSingleRecipe", recId)
               // console.log("id",recId)
            },
            changeTrans(val){
                this.translate+=val*100
                if (this.translate>0)this.translate=0
                if (this.translate<this.rightLim) this.translate=this.rightLim
            }
        }
    }
</script>

<style scoped>

.recCarousel {
    display: flex;
    flex-wrap: nowrap;
    overflow:hidden;
}

.recipe {
    display: block;
    width: 17.3vw;
    margin: 1vw;
    height: 370px;
    box-sizing: border-box;
    background: #fff;
}
.recCarousel .recipe .show-pointer:hover{
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.20
    
    );
}
.wrap {
    transition: transform 0.4s ease-out;
}

.frame {
    width: 78vw;
}

.mainDiv {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 auto;
    width: 96vw;
    justify-content:space-evenly;
    background-color: rgba(255, 255, 255, 0.877);
    align-items: center;
    border-radius: 100px;
}
button {
    width:13vw;
    box-sizing: border-box;
    flex-grow: 0;
}

.arrow-left {
  width: 0; 
  height: 0;
  padding: 0;
  background-color: transparent;
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent; 
  
  border-right:40px solid #ca430e; 
}


.arrow-right {
  width: 0; 
  height: 0;
  padding: 0;
  background-color: transparent;
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent; 
  
  border-left:40px solid #ca430e; 
}
.arrow-right:hover {
  border-left:40px solid #94320b; 
}

.inactive {
    opacity: 0.7;
}
.fa-star{
    color: orange;
}
@media screen and (min-width:1024px) and (max-width:1279px) {
    .mainDiv {
        width: 1000px;
        height: 370px;
    }
    .frame{
        width: 715px;
        height: 370px;
    }
    .recipe {
        width: 218px;
        height: 355px;
    }
    .recipe img {
        width: 218px;
    }

}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    .mainDiv {
        width: 700px;
        height: 370px;
    }
    .frame{
        width: 475px;
        height: 370px;
    }
    .recipe {
        width: 218px;
        height: 355px;
    }
    .recipe img {
        width: 218px;
    }
}
@media screen and (max-width: 768px) {
    .mainDiv {
        width: 443px;
        height: 370px;
    }
    .frame{
        width: 230px;
        height: 370px;
    }
    .recipe {
        width: 218px;
        height: 355px;
    }
    .recipe img {
        width: 218px;
    }
}
@media screen and (max-width: 500px) {
    .mainDiv {
        width: 310px;
        height: 210px;
        font-size: .65em;
    }
    .frame{
        width: 110px;
        height: 210px;
    }
    .recipe {
        width: 107px;
        height: 190px;
    }
    .recipe img {
        width: 98px;
        height: 98px;
    }
}

</style>