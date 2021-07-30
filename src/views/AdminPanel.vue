<template>
    <div class="admin-panel nav-top-margine">
        <div id="admin-panel-nav">
            <router-link to="/admin/addingredient">Add ingredient</router-link>
            <router-link to="/admin/changeingredient">Change ingredient</router-link>
            <router-link to="/admin/checkcomments">Reported comments</router-link>
            <router-link to="/admin/recipereports">Reported recipes</router-link>
            <router-link to="/admin/userlist">User list</router-link>
            <router-link to="/admin/categories">Edit categories</router-link>
        </div>
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>

export default {
    
    
}
</script>

<style scoped>
    .admin-panel{
        width: 90%;
    }
    #admin-panel-nav {
        padding: 30px;
        width: 90%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .admin-panel > div:nth-child(1){
        margin: 0 auto;
    }
    .admin-panel > div:nth-last-child(1){
        margin: 0 auto;
    }

    #admin-panel-nav a {
        font-weight: 400;
        color: #fff;
        padding: 5px 25px;
        margin: 5px;
        background: #ca430e;
        border-radius: 3px;
        cursor: pointer;
        box-sizing: border-box;
    }
    #admin-panel-nav a:hover {
        background: #94320b;
    }

    #admin-panel-nav a.router-link-exact-active {
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.66);
        background: #7a2808;
    }
    @media screen and (max-width: 768px) {
        .admin-panel{
            flex-direction: column;
        }
    }
</style>