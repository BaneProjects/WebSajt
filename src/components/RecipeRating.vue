<template>
    <div class="rating-wrap">
        <div v-if="starChecked" class="rating">
            <input type="radio" name="star" v-model="updateStar" @change="handleRecipeRating" :value="5" id="star1"><label for="star1"></label>
            <input type="radio" name="star" v-model="updateStar" @change="handleRecipeRating" :value="4" id="star2"><label for="star2"></label>
            <input type="radio" name="star" v-model="updateStar" @change="handleRecipeRating" :value="3" id="star3"><label for="star3"></label>
            <input type="radio" name="star" v-model="updateStar" @change="handleRecipeRating" :value="2" id="star4"><label for="star4"></label>
            <input type="radio" name="star" v-model="updateStar" @change="handleRecipeRating" :value="1" id="star5"><label for="star5"></label>
            <div v-if="starChecked" class="disable-rating"></div>
        </div>
        <div v-if="!starChecked && !disableRating" class="rating">
            <input type="radio" name="star" :value="5" id="star1" @change="handleRecipeRating"><label for="star1"></label>
            <input type="radio" name="star" :value="4" id="star2" @change="handleRecipeRating"><label for="star2"></label>
            <input type="radio" name="star" :value="3" id="star3" @change="handleRecipeRating"><label for="star3"></label>
            <input type="radio" name="star" :value="2" id="star4" @change="handleRecipeRating"><label for="star4"></label>
            <input type="radio" name="star" :value="1" id="star5" @change="handleRecipeRating"><label for="star5"></label>
        </div>
    </div>
</template>

<script>
export default {
    props:['starChecked', 'disableRating'],
    methods:{
        handleRecipeRating(e){
            this.$emit('handleRecipeRating', e.target.value)
        }
    },
    computed: {
        updateStar: {
            get: function () {
                return this.starChecked
            },
            set: function (newValue) {
                return newValue
            }
        }
    }
}
</script>

<style>
    .rating-wrap{
        position: relative;
        height: 70px;
    }
    .rating{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateY(180deg);
        display: flex;
    }
    .rating .disable-rating{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: none;
    }
    .rating input{
        display: none;
    }
    .rating label{
        display: block;
        cursor: pointer;
        width: 40px;
    }
    .rating label::before{
        content: '\f005';
        font-family: fontAwesome;
        position: relative;
        display: block;
        font-size: 40px;
        color: #101010;
    }
    .rating label::after{
        content: '\f005';
        font-family: fontAwesome;
        position: absolute;
        top: 0;
        display: block;
        font-size: 40px;
        color: orange;
        opacity: 0;
        transition: .5s;
        text-shadow: 0 2px 5px rgba(0, 0, 0, .5);
    }
    .rating label:hover::after,
    .rating label:hover ~ label::after,
    .rating input:checked ~ label::after{
        opacity: 1;
    }
</style>