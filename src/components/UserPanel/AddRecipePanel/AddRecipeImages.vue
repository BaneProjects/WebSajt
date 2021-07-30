<template>
    <div>
        <h4>Add images: </h4>
        <div id="imgChange">
            <label for="newFile">Select file</label>
            <input type="file" @change="handleAddFile" multiple id="newFile" style="display:none"/>
        </div>
        <div class="recipe-img" v-if="imageUrl.length > 0 && !imageUrl[0].imgId">
            <div v-for="(img, index) in imageUrl" :key="index">
                <img :src="img" alt="#">
                <button @click="handleRemoveImg(index)">Remove</button>
            </div>
        </div>
        <div class="recipe-img" v-if="imageUrl.length > 0 && imageUrl[0].imgId">
            <div v-for="(img, index) in imageUrl" :key="index">
                <img :src="img.imgLink" :alt="img.imgId">
                <button @click="handleRemoveImg(index)">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["imageUrl"],
    methods:{
        handleAddFile(e){
            this.$emit("handleAddFile", e)
            return
        },
        handleRemoveImg(index){
            this.$emit("handleRemoveImg", index)
            return
        }
    }
}
</script>

<style>
    .recipe-img{
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        margin: 10px;
    }
    .recipe-img > div{
        margin: 5px;
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    .recipe-img img{
        width: 150px;
        height: 150px;
        object-fit: cover;
    }
    #imgChange label{
        margin: 10px;
        padding: 5px 25px;
        margin-bottom: 5px;
        outline: none;
        border: none;
        border-radius: 3px;
        background: #ca430e;
        cursor: pointer;
        color: #fff;
        font-size: 1.05em;
        font-weight: 500;
        text-align: center;
    }
    #imgChange label:hover{
        background: #94320b;
    }
    @media screen and (max-width: 768px){
        .recipe-img{
            justify-content: center;
        }
    }


</style>