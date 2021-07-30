<template>
    <div v-if="showRegister" class="register-form">
        <div>
            <h2>Register</h2>
            <div>
                <label>Full name</label>
                <input type="text" v-model="fullname">
            </div>
            <div>
                <label>Username</label>
                <input type="text" v-model="username">
            </div>
            <div>
                <label>Email</label>
                <input type="text" v-model="email">
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="password">
            </div>
            <div>
                <label>Repeat password</label>
                <input type="password" v-model="repeatPassword">
            </div>
            <div  class="btn-holder">
                <button @click="handleRegisterUser">Register</button>
                <span @click="showLogin">Log in</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        showRegister: Boolean
    },
    data(){
        return{
            fullname: "",
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        }
    },
    methods:{
        handleRegisterUser(){
            this.$emit("handleRegisterUser", {
                fullname: this.fullname,
                username: this.username,
                email: this.email,
                repeatPassword: this.repeatPassword,
                password: this.password
            })
        },
        showLogin(){
            this.$emit("showLogin")
        }
    }
}
</script>

<style scoped>
    .register-form{
        display: flex;
        background: #fff;
        padding: 20px;
        border-radius: 3px;
        box-shadow: 2px 2px 5px #11111159;
    }
    .register-form div{
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
    .register-form label{
        font-weight: 700;
        text-align: start;
        margin: 5px;
    }
    .register-form input{
        width: 300px;
        padding: 10px;
    }
    .register-form > div div:nth-last-child(1){
        flex-direction: row;
        justify-content: center;
        align-content: center;
    }
    .register-form button{
        margin: 0 5px;
    }
    .login span{
        cursor: pointer;
        color: rgb(184, 0, 0);
        line-height: 50px;
    }
    
    @media screen and (max-width: 768px){
        .register-form input{
            width: 90%;
        }
    }
</style>