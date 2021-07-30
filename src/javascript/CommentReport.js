class CommentReport {
    constructor(repId, repMsg, reportAuthorID, reportAuthor, commentAuthorID, commentAuthor, comId, comContent, commentAuthorImg, reportAuthorImg, repAuthorBanned,comAuthorBanned) {
      this.repId = repId;
      this.repMsg = repMsg;
      this.reportAuthorID = reportAuthorID;
      this.reportAuthor = reportAuthor;
      this.commentAuthorID = commentAuthorID;
      this.commentAuthor = commentAuthor
      this.comId = comId;
      this.comContent = comContent;
      this.commentAuthorImg = commentAuthorImg;
      this.reportAuthorImg = reportAuthorImg;
      this.repAuthorBanned = repAuthorBanned;
      this.comAuthorBanned = comAuthorBanned;

    }
}

export default CommentReport