<template>
    <div class="reports">
      <div v-if="commentsRep" class="reportWrap">
            <div class="report" v-for="report in reports" :key="report.repId">
                <div>
                    <div class="userInfo">
                        <span class="avatar"><img :src="report.reportAuthorImg" :alt="report.reportAuthor"></span>
                        <span class="bold-span">{{report.reportAuthor}}</span>
                        <button @click="$emit('ban',report.reportAuthorID)" v-if="!report.repAuthorBanned || Date.parse(report.repAuthorBanned)<new Date()">Ban</button>
                        <button @click="$emit('unban',report.reportAuthorID)" v-else>Unban</button>
                    </div>
                    <div class="reportMsg" v-if="report.repMsg">
                        <p> {{report.repMsg}} </p>
                    </div>
                    <div class="commWrap">
                    <div class="userInfo">
                        <span class="avatar"><img :src="report.commentAuthorImg" :alt="report.reportAuthor"></span>
                        <span class="bold-span">{{report.commentAuthor}}</span>
                        <button @click="$emit('ban',report.commentAuthorID)" v-if="!report.comAuthorBanned || Date.parse(report.comAuthorBanned)<new Date()">Ban</button>
                        <button @click="$emit('unban',report.commentAuthorID)" v-else>Unban</button>
                    </div>
                    <div>
                        <p> {{report.comContent}} </p>
                    </div>
                    <div>
                        <button @click="validReport(report.comId, report.repId)">Delete {{reportTitle.substring(0, reportTitle.length - 1)}} </button>
                        <button @click="invalidReport(report.comId, report.repId)">Approve {{reportTitle.substring(0, reportTitle.length - 1)}} </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="recipesRep">
            <div class="recipe-reports">
                <div class="report recipe-report" v-for="report in reports" :key="report.repId">
                    <div>
                        <div class="userInfo">
                            <span>Report by:</span>
                            <span class="avatar"><img :src="report.reportAuthorImg" :alt="report.reportAuthor"></span> 
                            <span class="bold-span"> {{report.reportAuthor}} </span> 
                            <span>
                                <button @click="$emit('ban',report.reportAuthorId)" v-if="!report.repAuthorBanned || Date.parse(report.repAuthorBanned)<new Date()">Ban</button>
                                <button @click="$emit('unban',report.reportAuthorId)" v-else>Unban</button>
                            </span>
                        </div>
                        <div class="report-recipe">
                        <div class="userInfo">
                            <span class="avatar"><img :src="report.recipeAuthorImg" :alt="report.recipeAuthor"></span>
                            <span class="bold-span">{{report.recipeAuthor}}</span>
                                <button @click="$emit('ban',report.recipeAuthorId)" v-if="!report.recAuthorBanned || Date.parse(report.recAuthorBanned)<new Date()">Ban</button>
                                <button @click="$emit('unban',report.recipeAuthorId)" v-else>Unban</button>
                        </div>
                            <div class="recipeWrap" @click="goToSingleRecipe(report.recId)">
                                <h4> {{report.name}} </h4>
                                <img id="recImg" :src="report.recImg" :alt="report.name">
                                <div class="tooltip"><h3>Click here to read more..</h3></div>
                            </div>
                        </div>
                        <div>
                            <button @click="deleteReport(report.repId)">Delete {{reportTitle.substring(0, reportTitle.length - 1)}} </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['reports', 'reportTitle', 'commentsRep', 'recipesRep'],
    methods:{
        invalidReport(comId, repId){
            this.$emit("invalidReport", {comId: comId, repId: repId})
        },
        validReport(comId, repId){
            this.$emit("validReport", {comId: comId, repId: repId})
        },
        goToSingleRecipe(recId){
            this.$emit("goToSingleRecipe", recId)
        },
        deleteReport(repId){
            this.$emit("deleteReport", repId)
        }
    }
}
</script>

<style scoped>
    .reports {
        background: #ffffffd0;
        margin: 30px auto;
        padding: 35px;
        border-radius: 5px;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
    }
    .report-user {
        display: flex;
        flex-direction: column;
        border-bottom: 3px solid rgba(0, 0, 0, 0.568);
        padding: 7px;
        position: relative;
        margin: 0 0 10px;
    }
    .report{
        width: 100%;
        box-sizing: border-box;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.445);
        padding: 15px;
        margin: auto;
        margin-bottom: 25px;
        position: relative;
        text-align: left;
    }
    .report p{
        border-bottom: 1px solid #000;
        padding: 15px;
    }
    .report:hover{
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.445);
        cursor: pointer;
    }
    .reports div h4{
        align-self: flex-start;
        text-align: left;
        margin: 5px;
    }
    .author{
        background: #eceeeeb9;
    }
    .bold-span{
        font-weight: 700;
    }
    .report-recipe{
        position: relative;
        border:solid rgba(0, 0, 0, 0.52) 1px;
        padding: 20px;
    }
    .report-recipe img{
        width: 370px;
        height: 370px;
        object-fit: cover;
    }
    .recipeWrap:hover>#recImg{
        opacity: .8;
    }
    .tooltip{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffffea;
        opacity: 0;
        border-radius: 3px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.53);
        transition: .3s;
        z-index: 10;
        text-align: center;
    }
    .recipeWrap:hover > .tooltip{
        opacity: 1;
    }
    .avatar img{
        border-radius: 1000px;
        width: 50px;
        height: 50px;
        margin: 5px;
        margin-right: 10px;
        margin-left: 10px;
    }
    .recipe-report{
        width: 400px;
        margin: 20px;
    }
    .recipe-reports{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    @media screen and (max-width: 768px) {
        .reports{
            overflow: auto;
            height: auto;
            width: 90%;
        }
        .report button{
            position: relative;
        }
    }

    .reportWrap {
        width: 85%;
    }

    .userInfo {
        display: flex;
        align-items: center;
    }

    .recipe-report .userInfo {
        justify-content: center;
    }

    .reportMsg {
        border: none;
    }

    .commWrap {
        border: 1px solid #000;
        padding: 15px;
        margin-top: 15px;

    }

    .commWrap p {
        border: none;
    }

    .commWrap .userInfo {
        border-bottom: 1px solid #000;
    }

    /* .recipe-report .userInfo {
        border-bottom: 1px solid #000;
    } */

    .report-recipe .userInfo {
        border:none;
    }
</style>