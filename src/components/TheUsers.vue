<template>
<div class="users">
    <div class="userWrap" v-for="user in users" :key="user.userId">
        <div class="user" v-if="currentUser.userId!=user.userId">
            <span class="avatar"><img :src="user.imgLink" :alt="user.fullname"></span>
            <span class="bold-span">{{user.fullname}}</span>
            <div>
            <label for="isAdmin">Admin</label>
            <input type="checkbox" id="isAdmin" :checked="user.level<2?true:false" @change="toggleAdmin([user.userId,$event.target.checked])">
            </div>
            <button v-if="!user.banned || Date.parse(user.banned)<new Date()" @click="ban(user.userId)">Ban</button>
            <button v-else @click="unban(user.userId)">Unban</button>
            <div class="bannedWrap" v-if="user.banned && Date.parse(user.banned)>new Date()">
                <span>Banned until: {{format(user.banned)}}</span>
            </div>
        </div>
    </div>
</div>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        users:Array
    },
    computed:{
        ...mapState(['currentUser'])
    },
    methods:{
        toggleAdmin(val){
            this.$emit('toggleAdmin',val)
        },
        ban(id){
            this.$emit('ban',id)
        },
        unban(id){
            this.$emit('unban',id)
        },
        format(date){
            date = Date.parse(date)
            let dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' }) 
            const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date) 
            return `${day}-${month}-${year}`           
        }
    }

}
</script>

<style scoped>

.user{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    min-width: 400px;
    margin: auto;
    border: solid black 1px;
    margin-bottom: 5px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.445);
}

    .user:hover{
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.445);
        cursor: pointer;
    }

.avatar img{
        border-radius: 1000px;
        width: 50px;
        height: 50px;
        margin: 5px;
        margin-right: 10px;
        margin-left: 10px;
        object-fit: cover;
    }

.bannedWrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 30px;
    margin: 0px;
    padding-left: 15px;
}
</style>