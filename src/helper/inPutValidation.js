const { validNumber } = require('./regEx') ; 
/**
 * @description validate user details
 * @class validateDetails
 */
 class validations {
     
    /**
       * @description validate user inputs
       * @function squareValidations
       * @param {object} body
       * @returns {Array} squareErrors
       */
    static squareValidations(body) {
      const { side } = body;
      const squareErrors = {}; 
  
      if (!side || !validNumber.test(side)) {
        squareErrors.side = [];
        squareErrors.side.push('Side is required and must be a number');
      }  
   
      return squareErrors;
    }
 
     
  /**
     * @description validate user inputs
     * @function rectangleValidations
     * @param {object} body
     * @returns {Array} rectangleErrors
     */
   static rectangleValidations(body) {
    const { length, breadth } = body;
    const rectangleErrors = {}; 

    if (!length || !validNumber.test(length)) {
      rectangleErrors.length = [];
      rectangleErrors.length.push('Length is requiredand must be a number');
    }  

    if (!breadth || !validNumber.test(breadth)) {
        rectangleErrors.breadth = [];
        rectangleErrors.breadth.push('Breadth is requiredand must be a number');
      }  
   
    return rectangleErrors;
  }

  /**
     * @description validate user inputs
     * @function triangleValidations
     * @param {object} body
     * @returns {Array} triangleErrors
     */
   
  static triangleValidations(body) {
      const { side, lengthA, lengthB, lengthC } = body;
      const triangleErrors = {};
  
      if (!side || !validNumber.test(side)) {
        triangleErrors.side = [];
        triangleErrors.side.push('Side is required and must be a number');
      } 
      
      if (!lengthA || !validNumber.test(lengthA)) {
        triangleErrors.lengthA = [];
        triangleErrors.lengthA.push('lengthA is required and must be a number');
      }  
      
      if (!lengthB || !validNumber.test(lengthB)) {
        triangleErrors.lengthB = [];
        triangleErrors.lengthB.push('lengthB is required and must be a number');
      }  
      
      if (!lengthC || !validNumber.test(lengthC)) {
        triangleErrors.lengthC = [];
        triangleErrors.lengthC.push('lengthC is required and must be a number');
      }  

      return triangleErrors;
  }
   
    /**
       * @description validate user inputs
       * @function circleValidations
       * @param {object} body
       * @returns {Array} circleErrors
       */
     static circleValidations(body) {
        const { radius } = body;
        const circleErrors = {}; 
    
        if (!radius || !validNumber.test(radius)) {
          circleErrors.radius = [];
          circleErrors.radius.push('Radius is required and must be a number');
        }  
     
        return circleErrors;
      }
}
module.exports = validations;