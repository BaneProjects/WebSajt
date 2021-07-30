<template>
    <div class="nav-top-margine">
        <div :style=' !showSpiner ? "display:none" : "display:block"' class="nav-top-margine">
            <img src="/loadingimg.gif" alt="spinner">
        </div>
        <the-reports :recipesRep='true' :reports="reports" :reportTitle="'Reports'" @goToSingleRecipe="goToSingleRecipe" @deleteReport="deleteReport"
        @ban="ban" @unban="unban"/>
        <p v-text="msg"></p>
    </div>
</template>

<script>
import axios from "axios";
import RecipeReport from "../javascript/RecipeReport";
import TheReports from '../components/TheReports'
import { mapState } from 'vuex'

export default {
    components:{
        TheReports
    },
    computed:{
        ...mapState(['currentUser'])
    },
    data(){
      return{
        reports:[],
        showSpiner: false,
        banDays:30,
        msg:''
      }
    },
    methods:{
        fetchRecipeReports(){
            this.reports = []
            this.msg=""
            this.showSpiner = true
            axios.get("http://108m122.e2.mars-hosting.com/api/reports",{
                params:{
                    filter: "rec"
                }
            })
            .then((res)=>{
                let r = res.data.data
                if(res.data.res === 'ok'){
                    for(let i = 0; i < r.length; i++){
                        this.reports.push(new RecipeReport(
                            r[i].rep_id,
                            r[i].rec_id,
                            r[i].rec_name,
                            r[i].reportAuthorID,
                            r[i].recipeAuthorID,
                            r[i].reportAuthor,
                            r[i].image_link,
                            r[i].reportAuthorImg,
                            r[i].recipeAuthorImg,
                            r[i].recipeAuthor,
                            r[i].repAuthorBanned,
                            r[i].recAuthorBanned
                        ))
                    }
                }
                else this.msg=res.data.msg
                this.showSpiner = false
                
                // console.log(res.data)
                console.log(this.reports)
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        goToSingleRecipe(recId){
            this.$router.push("/recipes/" + recId)
        },
        deleteReport(repId){
            axios.delete("http://108m122.e2.mars-hosting.com/api/reports/" + repId, {
                params:{
                    sid: sessionStorage.getItem("sid")
                }
            })
            .then((res)=>{
                if(res.data.res === 'ok'){
                    this.fetchRecipeReports()
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
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
                 else this.fetchRecipeReports()
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
                else this.fetchRecipeReports()
            }).catch((err)=>{
                console.log(err);
            });
        }
    },
    mounted(){
      this.fetchRecipeReports();
    }
}
</script>
<style scoped>
    .comments{
        height: auto;
        overflow: auto;
    }

</style>