<template>
 <div>
    <transition name="fade" mode="out-in" v-if="!none">
        <span class="ingredient" >
            <img v-if="ingredient.img!=null" :src="ingredient.img" :alt="ingredient.name">
            <span>{{ingredient.name}}</span>
            <button v-if="!allergies && !none &&!trash" @click="addToRecipe" title="Click to add to your recipe">+</button>
            <button v-if="both" @click="removeFromRecipe" title="Click to exclude from your recipe">-</button>
            <button v-if="allergies" @click="addAllergy" title="Click to mark as allergy">+</button>

            <div v-if="amount">
                <span>
                    , amount: 
                    <input type="text" v-model="ingredient.amount" class="number-input">
                </span>
                <span>
                    <select v-model="ingredient.unit">
                        <option v-for="(unit,index) in ingredient.units" :key="index"> {{typeof unit=='string'?unit:unit[0]}} </option>
                        </select>
                </span>
            </div>

            <button v-if="trash" @click="remove" title="Click to remove"><i class="fa fa-trash"></i></button>
        </span>
    </transition>
    <span class="ingredient" v-else >
            <img v-if="ingredient.img!=null" :src="ingredient.img" :alt="ingredient.name">
            <span>{{ingredient.name}}</span>
            <button v-if="!allergies && !none &&!trash" @click="addToRecipe" title="Click to add to your recipe">+</button>
            <button v-if="both" @click="removeFromRecipe" title="Click to exclude from your recipe">-</button>
            <button v-if="allergies" @click="addAllergy" title="Click to mark as allergy">+</button>

            <div v-if="amount">
                <span>
                    , amount: 
                    <input type="text" v-model="ingredient.amount" class="number-input">
                </span>
                <span>
                    <select v-model="ingredient.unit">
                        <option v-for="(unit,index) in ingredient.units" :key="index"> {{unit}} </option>
                        </select>
                </span>
            </div>

            <button v-if="trash" @click="remove" title="Click to remove"><i class="fa fa-trash"></i></button>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        ingredient:Object,
        allergies:{
            type:Boolean,
            default:false
        },
        both:{
            type:Boolean,
            default:false
        },
        none:{
            type:Boolean,
            default:false
        },
        trash:{
            type:Boolean,
            default:false
        },
        amount:{
            type:Boolean,
            default:false
        }
        },
    data(){
        return{
            ingredientUnit: ""
        }
    },
    methods:{
        addToRecipe(){
            this.$emit("addToRecipe")
        },
        removeFromRecipe(){
            this.$emit("removeFromRecipe")
        },
        addAllergy(){
            this.$emit("addAllergy")
        },
        remove(){
            this.$emit('remove')
        }
        
        
    }
}
</script>

<style>
    .ingredient{
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
        justify-content: space-between;
        align-items: center;
    }

    .ingredient span {
        flex-grow: 2;
        text-align: start;
    }
    .ingredient:hover{
        background: rgb(240, 239, 239);
    }
    .ingredient button{
        width: 25px;
        height: 25px;
        margin: 5px;
        padding: 3px;
        align-self: center;
    }

    .ingredient img {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin-right: 7px;
    }

</style>
