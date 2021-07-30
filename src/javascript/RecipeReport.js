class RecipeReport {
    constructor(repId, recId, name, reportAuthorId,recipeAuthorId, reportAuthor, recImg, reportAuthorImg,recipeAuthorImg, recipeAuthor, repAuthorBanned, recAuthorBanned) {
      this.repId = repId;
      this.recId = recId;
      this.name = name;
      this.reportAuthorId = reportAuthorId;
      this.recipeAuthorId = recipeAuthorId;
      this.reportAuthor = reportAuthor;
      this.recImg = recImg;
      this.reportAuthorImg = reportAuthorImg;
      this.recipeAuthorImg = recipeAuthorImg;
      this.recipeAuthor = recipeAuthor;
      this.repAuthorBanned = repAuthorBanned;
      this.recAuthorBanned = recAuthorBanned;

    }
}

export default RecipeReport