<template>
<div id="usersWrap">
    <p>Search by full name: 
        <input type="text" placeholder="Filter..." v-model="filter" @change="fetchUsers">
    </p>
    <the-users :users="users" @toggleAdmin="toggleAdmin" @ban="ban" @unban="unban"/>
</div>
  
</template>

<script>
import theUsers from '../components/TheUsers'
import User from '../javascript/User'
import axios from 'axios'
export default {
    data(){
        return{
            users:[],
            banDays:30,
            filter:''
        }
    },

    components:{
        theUsers
    },
    methods:{
        fetchUsers(){
            this.users=[]
            axios.get("http://108m122.e2.mars-hosting.com/api/user",{params:{
                filter:this.filter
            }})
            .then((res)=>{
                if(res.data.result == "ok"){
                    for(let user of res.data.users){
                        this.users.push(new User(user.usr_id, user.usr_username, user.usr_fullname, user.usr_email,
                            (user.img_link?user.img_link:"/genericimguser.jpg"), user.usr_level, user.usr_banned, user.allergies, user.preferences))
                    }
                }
            }).catch((err)=>{
                console.log(err);
            });
        },
        toggleAdmin(val){
        axios.patch(`http://108m122.e2.mars-hosting.com/api/user/${val[0]}`,{
            sid:sessionStorage.getItem("sid"),
            level:val[1]?1:2
        })
            .then((res)=>{
                if (res.data.res!=='ok') console.log(res.data.msg)
            }).catch((err)=>{
                console.log(err);
            });
        },
        ban(id){
            let banDate = new Date()
            banDate.setDate(banDate.getDate()+this.banDays)
            axios.patch(`http://108m122.e2.mars-hosting.com/api/user/${id}`,{
            sid:sessionStorage.getItem("sid"),
            banned:banDate
        })
            .then((res)=>{
                if (res.data.res!=='ok') console.log(res.data.msg)
                 else this.fetchUsers()
            }).catch((err)=>{
                console.log(err);
            });
        },
        unban(id){
            axios.patch(`http://108m122.e2.mars-hosting.com/api/user/${id}`,{
                sid:sessionStorage.getItem("sid"),
                banned:"unban"
            })
                .then((res)=>{
                    if (res.data.res!=='ok') console.log(res.data.msg)
                    else this.fetchUsers()
                }).catch((err)=>{
                    console.log(err);
                });
        }
    },
    mounted(){
        this.fetchUsers()
    }

}
</script>

<style scoped>
#usersWrap {
    background: #ffffffd0;
    margin: 65px auto;
    padding: 35px;
    border-radius: 5px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 30px;
    min-width: 420px;
}
</style>