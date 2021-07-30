<template>
    <div class="steps">
        <h3>Add steps</h3>
        <div>
            <textarea v-model="step" cols="80" rows="10" @keydown.enter="addToSteps" placeholder="Write steps for your recipe here.."></textarea>
        </div>
        <button @click="addToSteps">Add a step</button>
        <div class="step" v-for="(step, idx) in steps" :key="step.number">
            <p><span>{{step.number}}. </span> {{step.description}}</p>
            <button @click="step.edit = !step.edit">Edit</button>
            <button @click="removeFromSteps(idx)"><i class="fa fa-trash"></i></button>
            <div>
                <textarea cols="70" rows="10" v-if="step.edit" v-model="step.description"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['steps'],
    data(){
        return{
            step: ""
        }
    },
    methods:{
        addToSteps(){
            this.$emit("addToSteps", this.step)
            this.step = ""
        },
        removeFromSteps(idx){
            this.$emit("removeFromSteps", idx)
        }
    }
}
</script>

<style>
    .step{
        margin: 5px;
        border: 1px solid #000;
        padding: 10px;
    }
    .steps textarea{
        padding: 15px;
        width: 80%;
    }
</style>