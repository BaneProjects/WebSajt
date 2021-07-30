class Ingredient {
    constructor(ingId, name, units,img) {
      this.ingId = ingId;
      this.name = name;
      this.amount = 0;
      this.unit = "";
      this.units = units;
      this.density = null;
      this.calories = 0;
      this.img = img;
    }
    selectedUnit(un){
        this.unit = un
      return console.log(this.unit)
    }
    amountAdd(){
      return console.log(this.amount)
    }
    amountRemove(){
      if(this.amount <= 0){
        return this.amount = 0
      }
      return this.amount--
    }
}

export default Ingredient