class Recipe {
    constructor(recId, name, prepTime, userId, itpId, itpName, mealType, rating) {
      this.recId = recId;
      this.name = name;
      this.prepTime = prepTime;
      this.userId = userId;
      this.itpId = itpId;
      this.itpName = itpName;
      this.mealType = mealType;
      this.imgLinks = [];
      this.rating = rating;
      this.calories = "";
      this.ingredients = [];
      this.steps = [];
      this.course = [];
      this.country = [];
      this.diets = [];
      this.recRepVal = false;
    }
}

export default Recipe