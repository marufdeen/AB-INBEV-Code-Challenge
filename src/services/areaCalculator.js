const validations = require("../helpers/inPutValidation");

class calculator {

  static async calculateSquare({ shape, side }) {
    const errors = await validations.squareValidations({ side });
    if (Object.keys(errors).length > 0) {
      return ({ errors });
    }
    const area =  parseFloat(Math.pow(side, 2));
    return ({
        message: `Area of ${shape} calculated successfully!`,
        shape,
        dimensions: { side },
        area
      });
 }

 static async calculateRectangle({ shape, length, breadth }) {
    const errors = await validations.rectangleValidations({ length, breadth });
    if (Object.keys(errors).length > 0) {
      return ({ errors });
    }
    const area = parseFloat(length * breadth);
    return ({
        message: `Area of ${shape} calculated successfully!`,
        shape,
        dimensions: { length, breadth },
        area
      });
 }

 static async calculateTriangle({ shape, lengthA, lengthB, lengthC }) {
    const errors = await validations.triangleValidations({ lengthA, lengthB, lengthC });
    if (Object.keys(errors).length > 0) {
      return ({ errors });
    }
    const semiPerimeter = ( parseFloat(lengthA) + parseFloat(lengthB) + parseFloat(lengthC)) /2 ; 
    const semiPerimeterA = semiPerimeter - lengthA;
    const semiPerimeterB = semiPerimeter - lengthB;
    const semiPerimeterC = semiPerimeter - lengthC;
    const area = Math.sqrt( semiPerimeter * semiPerimeterA * semiPerimeterB * semiPerimeterC );
    return ({
        message: `Area of ${shape} calculated successfully!`,
        shape,
        dimensions: { lengthA, lengthB, lengthC },
        area
      });
 }

 static async calculateCircle ({ shape, radius }) {
     const errors = await validations.circleValidations({ radius });
     if (Object.keys(errors).length > 0) {
        return ({ errors });
      }
    const area = Math.PI * Math.pow(parseFloat(radius), 2);
    return ({
        message: `Area of ${shape} calculated successfully!`,
        shape,
        dimensions: { radius },
        area
      });
 }


}

module.exports = calculator;
