class Comment {
    constructor(comId, content, userId, recId, userName ) {
      this.comId = comId;
      this.content = content;
      this.userId = userId;
      this.recId = recId;
      this.userName = userName;
      this.reportMsg = "";
      this.reportPanel = false;
    }
}

export default Comment