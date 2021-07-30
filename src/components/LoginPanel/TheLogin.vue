<template>
  <div v-if="logIn" class="login-form">
    <div>
        <h2>Log in</h2>
        <div>
            <label>Username or Email</label>
            <input type="text" v-model="logName">
        </div>
        <div class="password-inp">
            <label>Password</label>
            <input :type="passwordType ? 'password' : 'text'" v-model="password" @keydown.enter="handleLogin">
            <i v-if="passwordType" class="fa fa-eye" @click="togglePassword"></i>
            <i v-if="!passwordType" class="fa fa-eye-slash" @click="togglePassword"></i>
        </div>
        <div  class="btn-holder">
            <button @click="handleLogin">Log in</button>
            <span @click="handleRegister">Sign up</span>
        </div>
    </div>
  </div>
</template>

<script>


export default {
    props:{
        logIn: Boolean,
        passwordType: Boolean
    },
    data(){
        return{
            logName: "",
            password: ""
        }
    },
    methods:{
        handleLogin(){
            this.$emit("handleLogin", {
                username: this.logName,
                password: this.password
            })
        },
        handleRegister(){
            this.$emit("handleRegister")
        },
        togglePassword(){
            this.$emit("togglePassword")
        }
    }
}
</script>

<style scoped>
    
    .login-form{
        display: flex;
        background: #fff;
        padding: 20px;
        box-shadow: 2px 2px 5px #31303059;
        border-radius: 3px;
    }
    .login-form div{
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
    .login-form label{
        font-weight: 700;
        text-align: start;
        margin: 5px;
    }
    .login-form input{
        width: 300px;
        padding: 10px;
    }
    .login-form > div div:nth-last-child(1){
        flex-direction: row;
        justify-content: center;
        align-content: center;
    }
    .login-form button{
        margin: 0 5px;
    }
    .login span{
        cursor: pointer;
        color: rgb(184, 0, 0);
        line-height: 50px;
    }
    .password-inp{
        position: relative;
    }
    @media screen and (max-width: 768px){
        .login-form input{
            width: 90%;
        }
    }
    .fa{
        font-size: 1.9em;
        position: absolute;
        top: 38px;
        right: 10px;
        cursor: pointer;
    }
</style>