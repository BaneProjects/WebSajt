<template>
    <div class="comments">
        <div class="add-comment" v-if="currentUser.userId != null">
            <h2>Your comment:</h2>
            <textarea
            cols="30"
            rows="10"
            placeholder="Enter your comment..."
            v-model="currentComment"
            ></textarea>
            <button @click="sendComment">Send Comment</button>
        </div>
        <div class="add-comment"  v-if="currentUser.userId === null">
            <h2>
            If you want to post a comment please login or create a
            profile..
            </h2>
            <button><router-link to="/login">Log in</router-link></button>
        </div>
        <div v-if="comments.length >= 1">
            <h2>Comments</h2>
            <div class="comment" v-for="(comment, idx) in comments" :key="comment.comId">
                <div class="comment-user">
                    <h4>{{ comment.userName }}</h4>
                </div>
                <p>{{ comment.content }}</p>
                <p v-if="comment.reportPanel"> 
                    <textarea v-model="comment.reportMsg" cols="30" rows="10"></textarea>     
                </p>
                <button v-if="currentUser.userId != null && currentUser.userId === comment.userId && currentUser.level === 2" @click="deleteComment(comment.comId)"><i class="fa fa-trash"></i></button>
                <button v-if="currentUser.userId != null && currentUser.level === 1" @click="deleteComment(comment.comId)"><i class="fa fa-trash"></i></button>
                <button v-if="currentUser.userId != null && currentUser.userId != comment.userId && currentUser.level === 2 && !comment.reportPanel" @click="comment.reportPanel = !comment.reportPanel"><i class="fa fa-flag"></i>  Report</button>
                <button class="bottom-btn" v-if="comment.reportPanel" @click="reportComment(comment.comId, comment.reportMsg, idx)"><i class="fa fa-flag"></i>  Submit report</button>
                <button v-if="comment.reportPanel" @click="comment.reportPanel = !comment.reportPanel"> X </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['currentUser', 'comments'],
    data(){
        return{
            currentComment: ""
        }
    },
    methods:{
        sendComment(){
            this.$emit("sendComment", this.currentComment)
            this.currentComment = ""
        },
        deleteComment(comId){
            this.$emit("deleteComment", comId)
        },
        reportComment(comId, repMsg, idx){
            this.$emit("reportComment", {comId: comId, repMsg: repMsg, idx: idx})
        }
    }
}
</script>

<style scoped>
    
.comments {
    background: #ffffffd0;
    margin: 30px auto;
    padding: 35px;
    border-radius: 5px;
    width: 70%;
    height: 700px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
}
.comment-user {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.568);
    padding: 0 10px;
}
.add-comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.705);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}
.add-comment button{
    width: 120px;
}
.add-comment textarea {
    height: 220px;
    width: 90%;
    border: 1px solid rgba(0, 0, 0, 0.329);
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.432);
    padding: 15px;
    outline: none;
}
.comment{
    width: 80%;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.445);
    padding: 15px;
    margin: 5px;
    text-align: left;
}
.comment button{
    position: absolute;
    right: 3px;
    top: 5px;
}
.comment textarea{
    width: 90%;
}
.bottom-btn{
    position: relative !important;
}
.comments div h2{
    align-self: flex-start;
    text-align: left;
}
@media screen and (max-width: 768px) {
    .comments{
        overflow: auto;
        height: auto;
        width: 90%;
    }
    .comment button{
        position: relative;
    }
    
}
</style>