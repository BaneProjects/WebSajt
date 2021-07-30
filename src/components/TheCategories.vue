<template>
<div class="mWrap">
    <div class="column" v-if="cat_name!=='Ingredient types'">
        <h3>{{cat_name}}</h3>
        <div @click="$emit('changeCat',cat)" class="category" v-for="cat in categories" :key="cat.rct_id">
            <span>{{cat.rct_name}}</span>
        </div>
    </div>
    <div v-if="cat_name==='Ingredient types'">
        <h3>{{cat_name}}</h3>
        <div @click="$emit('changeIng',cat)" class="category" v-for="cat in categories" :key="cat.itp_id">
            <span>{{cat.itp_name}}</span>
        </div>
    </div>    
</div>
</template>

<script>
export default {
    props:{
        categories:Array,
        cat_name:String
    }

}
</script>

<style scoped>

.column {
    padding: 0px;
}

.category {
    border: solid black 1px;
    display: block;
    min-height: 40px;
    margin: 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    width: 89%;
    box-sizing: border-box;
}

.mWrap {
    width: 16%;
    margin: 10px 20px;
    margin-top: 30px;
    min-width: 200px;
    max-height: 40vh;
    overflow-y: scroll;
}

.category:hover {
    background: rgb(240, 239, 239);
    cursor: pointer;
}

span{
    width: 100%;
}

</style>