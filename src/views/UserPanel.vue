<template>
    <div class="user-panel">

        <div class="compWrap">
            <div id="tabs">
                <button :class="{'selected':slide===0}" @click="setSlide(0)">Personal info</button>
                <button :class="{'selected':slide===1}" @click="setSlide(1)">Allergies</button>
                <button :class="{'selected':slide===2}" @click="setSlide(2)">Diets</button>
            </div>
        <transition name="fade" mode="out-in" v-if="slide===0">
            <the-change-user @set-slide="setSlide" @handleChangeImg="handleChangeImg" @handleAddFile="handleAddFile" @handleChangeUser="handleChangeUser" @handleShowChangeUser="handleShowChangeUser" :showChangeUser="showChangeUser" />
        </transition>

        <transition name="fade" mode="out-in" v-if="slide===1">
            <allergies-panel @set-slide="setSlide" v-if="currentUser.userId!=null" :allergies="currentUser.allergies" @editAllergies="editAllergies"/>
        </transition>

        <transition name="fade" mode="out-in" v-if="slide===2">
            <pref-panel @set-slide="setSlide" v-if="currentUser.userId!=null" @editPrefs="editPrefs" :dietsProp="currentUser.prefs"/>
        </transition>
        </div>
    </div>
</template>

<script>
import TheChangeUser from '../components/UserPanel/TheChangeUser'
import axios from 'axios'
import User from '../javascript/User'
import { mapState } from 'vuex'
import allergiesPanel from '../components/UserPanel/allergiesPanel'
import prefPanel from '../components/UserPanel/prefPanel'

export default {
    components:{
        TheChangeUser,
        allergiesPanel,
        prefPanel
    },
    data(){
        return{
            showChangeUser: true,
            userNewImg: null,
            changedUser: {},
            slide:0
        }
    },
    computed:{
        ...mapState(['currentUser'])
    },
    methods:{
        handleShowChangeUser(){
            this.showChangeUser = !this.showChangeUser
        },
        handleChangeUser(pass){
          
            let formData = new FormData();
                formData.append('sid', sessionStorage.getItem("sid"))
                if(this.userNewImg){
                    formData.append('img', this.userNewImg)
                }
                formData.append('username', this.currentUser.username)
                formData.append('email', this.currentUser.email)
                formData.append('pass', pass.password)
                formData.append('pass2', pass.repeatPassword)
                formData.append('fullname', this.currentUser.fullname)
            axios.patch("http://108m122.e2.mars-hosting.com/api/user", formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((res)=>{
                if(res.data.res === "ok"){
                    axios.get("http://108m122.e2.mars-hosting.com/api/user/" + this.currentUser.userId)
                    .then((res)=>{
                        let user = res.data.user
                        this.changedUser = new User(user.usr_id, user.usr_username, user.usr_fullname, user.usr_email, user.img_link, user.usr_level, user.usr_banned, user.allergies, user.preferences)
                        this.$store.dispatch('login', this.changedUser)
                    })
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        handleAddFile(e){
            let width = 250;
            let fileName = e.target.files[0].name
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = event => {
                let img = new Image()
                img.src = event.target.result
                img.onload = () => {
                    let elem = document.createElement('canvas')
                    elem.width = width;
                    let scaleFactor = width / img.width
                    elem.height = img.height * scaleFactor
                    let ctx = elem.getContext('2d')
                    ctx.drawImage(img, 0, 0, width, img.height * scaleFactor)
                    ctx.canvas.toBlob((blob) => {
                        let file = new File([blob], fileName, {
                            type: 'image/',
                            lastModified: Date.now()
                        });
                        if(e.target.files[0].size < file.size){
                            this.userNewImg = e.target.files[0]
                        }else{
                            this.userNewImg  = file
                        }
                    }, 'image/jpeg', 1)

                },
                reader.onerror = error => console.log(error)
                }
        },
        handleChangeImg(){
            let formData = new FormData();
                formData.append('sid', sessionStorage.getItem("sid"))
                formData.append('img', this.userNewImg)
            axios.patch("http://108m122.e2.mars-hosting.com/api/user", formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((res)=>{
                if(res.data.res === "ok"){
                    axios.get("http://108m122.e2.mars-hosting.com/api/user/" + this.currentUser.userId)
                    .then((res)=>{
                        let user = res.data.user
                        this.changedUser = new User(user.usr_id, user.usr_username, user.usr_fullname, user.usr_email, user.img_link, user.usr_level, user.usr_banned, user.allergies, user.preferences)
                        this.$store.dispatch('login', this.changedUser)
                    })
                }
            }).catch((err)=>{
                console.error(err)
            })
        },
        refresh(){
            axios.get("http://108m122.e2.mars-hosting.com/api/user/" + this.currentUser.userId)
                .then((res)=>{
                    let user = res.data.user
                    this.changedUser = new User(user.usr_id, user.usr_username, user.usr_fullname, user.usr_email, user.img_link, user.usr_level, user.usr_banned, user.allergies, user.preferences)
                    this.$store.dispatch('login', this.changedUser)
            })
            .catch((err)=>{
                console.error(err)
            })
        },
        editAllergies(val){
            axios.post("http://108m122.e2.mars-hosting.com/api/allergies",{
                sid:sessionStorage.getItem("sid"),
                ingredients:val
            })
            .then((res)=>{
                if(res.data.res==='ok') {
                    this.refresh()
                }
                else console.log(res.data.msg)
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        editPrefs(val){
            axios.post("http://108m122.e2.mars-hosting.com/api/preferences",{
                sid:sessionStorage.getItem("sid"),
                diets:val
            })
            .then((res)=>{
                if(res.data.res==='ok') {
                    this.refresh()
                }
                else console.log(res.data.msg)
            })
            .catch((ex)=>{
                console.error(ex)
            })

        },
        setSlide(val){
            this.slide=val
        }
    }
}
</script>

<style scoped>
    .user-panel{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        margin: auto;
    }

    .compWrap {
        margin-top: 100px;
        background-color: white;
    }
   .user-panel button{
        padding: 5px 25px;
        outline: none;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        font-size: 1.05em;
    }
    .user-panel button:hover{
        background: #94320b;
    }

    .nav-top-margine {
        width: 50vw;
        min-width: 650px;
        box-sizing: border-box;
        margin: 0px;
    }

    #arrow-left {
        margin: 0px 50px;
        width: 0; 
        height: 0;
        padding: 0;
        background-color: transparent;
        border-top: 40px solid transparent;
        border-bottom: 40px solid transparent; 
        border-right:40px solid #ca430e; 
    }
    #arrow-left:hover {
        border-right:40px solid #94320b; 
    }

    #arrow-right {
        margin: 0px 50px;
        width: 0; 
        height: 0;
        padding: 0;
        background-color: transparent;
        border-top: 40px solid transparent;
        border-bottom: 40px solid transparent; 
        border-left:40px solid #ca430e; 
    }
    #arrow-right:hover {
        border-left:40px solid #94320b; 
    }

    .inactive {
        opacity: 0.7;
    }

    #tabs {
        z-index: 2;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 50vw;
        min-width: 650px;
        padding: 30px 2px;
    }

    #tabs button {
        width: 33%;
        font-size: 1.2em;
    }

    .selected {
        background-color: #94320b;
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.66);
    }

    @media screen and (max-width: 768px){
        #tabs{
            flex-direction: column;
            align-items: center;
            min-width: 0;
            margin: 0 auto;
        }
         #tabs button {
            width: 85%;
        }
        .nav-top-margine{
            min-width: 0;
            margin: 0 auto;
        }
        .compWrap{
            width: 100%;
            margin-top: 30px;
        }
    }
    
</style>