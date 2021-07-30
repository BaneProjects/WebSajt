<template>
    <div class="nav-top-margine">
        <div :style=' !showSpiner ? "display:none" : "display:block"' class="nav-top-margine">
            <img src="/loadingimg.gif" alt="spinner">
        </div>
        <p> {{msg}} </p>
        <the-reports v-if="reports && reports.length > 0" :commentsRep="true" :reports="reports" :reportTitle="'Comments'" @invalidReport="invalidReport" @validReport="validReport"
        @ban="ban" @unban="unban" />
    </div>
</template>

<script>
import axios from "axios";
import CommentReport from "../javascript/CommentReport";
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
        msg: ""
      }
    },
    methods:{
        fetchCommentsReports(){
            this.showSpiner = true
            this.reports = []
            axios.get("http://108m122.e2.mars-hosting.com/api/reports",{
                params:{
                    filter: "com"
                }
            })
            .then((res)=>{
                let r = res.data.data
                if(res.data.res === 'ok'){
                    for(let i = 0; i < r.length; i++){
                        this.reports.push(new CommentReport(
                        r[i].rep_id,
                        r[i].rep_msg,
                        r[i].reportAuthorID,
                        r[i].reportAuthor,
                        r[i].commentAuthorID,
                        r[i].commentAuthor,
                        r[i].com_id,
                        r[i].com_content,
                        r[i].commentAuthorImg,
                        r[i].reportAuthorImg,
                        r[i].repAuthorBanned,
                        r[i].comAuthorBanned
                        ))
                    }
                    this.showSpiner = false
                }
                if(res.data.res === 'err'){
                    this.msg = res.data.msg
                    this.showSpiner = false
                }
            })
            .catch((ex)=>{
                console.error(ex)
            })
        },
        invalidReport(rep){
            for (let i = 0; i < this.reports.length; i++) {
                if(this.reports[i].comId === rep.comId){
                    axios.delete("http://108m122.e2.mars-hosting.com/api/reports/" + this.reports[i].repId, {
                        params:{
                            sid: sessionStorage.getItem("sid")
                        }
                    })
                    .then((res)=>{
                        if(res.data.res == "ok"){
                            this.fetchCommentsReports()
                        }
                    })
                    .catch((ex)=>{
                        console.log(ex)
                    })
                }
            }
        },
        validReport(rep){
                console.log(rep)
            axios.delete("http://108m122.e2.mars-hosting.com/api/comments/" + rep.comId, {
                params:{
                    sid: sessionStorage.getItem("sid")
                }
            })
            .then((res)=>{
                if(res.data.res === 'ok'){
                    this.invalidReport(rep.repId)
                    this.fetchCommentsReports()
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
                 else this.fetchCommentsReports()
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
                else this.fetchCommentsReports()
            }).catch((err)=>{
                console.log(err);
            });
        }
    },
    mounted(){
      this.fetchCommentsReports();
    }
}
</script>
<style scoped>
    .comments{
        height: auto;
        overflow: auto;
    }

</style>