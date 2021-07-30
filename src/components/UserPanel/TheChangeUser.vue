<template>
    <div v-if="currentUser" class="user-panel nav-top-margine">
        <div class="card">
                            
            <div v-if="showChangeUser" class="notEditt" >
            <h3>Your current account information:</h3>
            <div class="notEdit">
                <div id="avatarr">
                    <img :src="currentUser.imgLink" :alt="currentUser.username">
                </div>
                <div>
                    <p><label>Full name: </label> {{currentUser.fullname}} </p>
                    <p> <label>Email: </label>{{currentUser.email}} </p>
                    <p> <label>Username: </label>{{currentUser.username}} </p>
                </div>
            </div>
            </div>
            <div class="edtButton">
                <button @click="handleShowChangeUser" v-if="showChangeUser">Edit</button>
            </div>
            <div v-if="!showChangeUser" class="change-info">
                <div id="avatar">
                    <img :src="currentUser.imgLink" :alt="currentUser.username">
                    <div id="imgChange">
                        <label for="newFile">Select file</label>
                        <input type="file" @change="handleAddFile" id="newFile" style="display:none"/>
                        <button @click="handleChangeImg">Change image</button>
                    </div>
                </div>
                <div class="text-info">
                    <div>
                        <label>Full name:</label>
                        <input type="text" v-model="currentUser.fullname" placeholder="Change full name..">
                    </div>
                    <div>
                        <label>Username:</label>
                        <input type="text" v-model="currentUser.username" placeholder="Change username..">
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" v-model="currentUser.email" placeholder="Change email..">
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" v-model="password" placeholder="Enter password..">
                    </div>
                <div>
                    <label>Repeat password:</label>
                    <input type="password" v-model="repeatPassword" placeholder="Repeat password..">
                </div>
                </div>
                <div class="btn-holder">
                    <button @click="handleChangeUser">Update Info</button>
                    <button @click="handleShowChangeUser">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props:{
        showChangeUser: Boolean
    },
    data(){
        return{
            password: "",
            repeatPassword: ""
        }
    },
    computed:{
        ...mapState(['currentUser'])
    },
    methods:{
        handleChangeUser(){
            this.$emit("handleChangeUser", {
                password: this.password,
                repeatPassword: this.repeatPassword
            })

        },
        handleShowChangeUser(){
            this.$emit("handleShowChangeUser")
        },
        handleAddFile(e){
            this.$emit("handleAddFile", e)
        },
        handleChangeImg(){
            this.$emit("handleChangeImg")
        }
    }
    
}
</script>

<style scoped>
    .user-panel button, #avatar label{
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
    .user-panel button:hover, #avatar label:hover{
        background: #94320b;
    }
    .card {
        box-shadow: 2px 2px 5px #ffffff59;
        padding: 5px;
        margin: auto;
        background: #fff;
    }
    #avatar, #avatarr{
        border-radius: 10px;
        margin: 5px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-evenly;
    }
    #avatar img, #avatarr img{
        border-radius: 10px;
        width: 190px;
        height: 190px;
        object-fit: cover;
        margin-right: 50px;
    }

    #avatarr {
        flex-direction: column;
    }

    #avatarr img {
        width: 260px;
        height: 260px;
    }
    .change-info{
        display: flex;
        margin: 0 auto;
        background: #fff;
        flex-direction: column;
        max-height: 100%;
        padding: 70px;
        padding-top: 0px;
        padding-bottom: 20px;
        box-sizing: border-box;
        width: 100%;
    }
    .change-info div{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
    }
    .change-info label{
        font-weight: 700;
        text-align: start;
        margin: 5px;
    }
    .change-info input{
        width: 300px;
        padding: 5px;
        cursor: pointer;
        font-size: 1.02em;
        margin-bottom: 8px;
    }
    .change-info input:hover{
        background: rgb(212, 211, 211);
    }
    .btn-holder{
        flex-direction: row !important;
        justify-content: center;
    }
    .btn-holder button{
        margin: 10px 10px;
        margin-bottom: 0px;
    }

    .text-info{
        overflow-y: auto;
    }

    .text-info div {
        width: 99%;
    }

    .text-info input {
        width: 85%;
    }


    #imgChange{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    #selected {
        background-color: #94320b;
    }

    p label {
        opacity: 0.7;
        font-weight: 500;
    }

    p {
        font-weight: 700;
    }

    .notEdit {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .notEditt {
        flex-direction: column;
        width: 90%;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 100px;
    }

    #avatarr p {
        font-weight: 500;
        text-align: start;
        padding: 10px;
        margin:0px

    }

    h3 {
        margin-bottom: 6vh;
    }
    @media screen and (max-width: 768px){
        .notEdit{
            flex-direction: column;
            margin: 0 auto;
        }
    }

</style>