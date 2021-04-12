const { Area } = require('../models');
const validations = require('../helpers/inPutValidation');
const calculator = require('../services/areaCalculator');
/* eslint radix: ["error", "as-needed"] */

/**
 * @description Areas controller
 * class Areas
 */
class area {
  /**
   * @description Create new Area
   * @method createArea
   * @param {*} req
   * @param {*} res
   */
  static async calculate(req, res) {
    const userId = parseInt(req.decoded.userId);
    const { shape, side, length, breadth, lengthA, lengthB, lengthC, radius  } = req.body;
    const loweredShape = shape.toLowerCase();  
     
     if (loweredShape == 'square') {
      const data = await calculator.calculateSquare(req.body); 
      if (data.hasOwnProperty('errors')) {
        res.send(data.errors); 
      }
      else {
        await Area.create({userId, shape: loweredShape, side, result: data.area });
        res.send(data); 
      }   
    }

    if (loweredShape == 'rectangle') {
      const data = await calculator.calculateRectangle(req.body);
      if (data.hasOwnProperty('errors')) {
        res.send(data.errors); 
      }
      else {
        await Area.create({ userId, shape: loweredShape, length, breadth, result: data.area });
        res.send(data);
      }
    }

    if (loweredShape == 'triangle') {
      const data = await calculator.calculateTriangle(req.body);
      if (data.hasOwnProperty('errors')) {
        res.send(data.errors); 
      }
      else {
        await Area.create({ userId, shape: loweredShape, lengthA, lengthB, lengthC, result: data.area });
        res.send(data)
      }
    }

    if (loweredShape == 'circle') {
      const data = await calculator.calculateCircle(req.body);
      if (data.hasOwnProperty('errors')) {
        res.send(data.errors); 
      }
      else {
        await Area.create({ userId, shape: loweredShape, radius, result: data.area });
        res.send(data)
      }

    }
    else {
      res.send({
        Error: 'Sorry, your shape is out of our scope at the moment'
      });
    }
  }
// 77 to 54
  /**
   * @description fetch all Areas from dummy db
   * @method getAreas
   * @param {*} req
   * @param {*} res
   */
  static async getAreas(req, res) {
    const areas = await Area.findAll();
    if (areas.length > 0) {
      return res.status(200).json({
        message: 'Areas Found',
        areas
      });
    }
    return res.status(401).json({
      message: 'No Areas found. Be the first to create shape'
    });
  }

  /**
   * @description fetch a single Area from dummy db
   * @method getSingleArea
   * @param {*} req
   * @param {*} res
   */
  static async getSingleArea(req, res) {
    const areaId = parseFloat(req.params.areaId);
    const areaFound = await Area.findOne({
      where: { id: areaId } 
    });
    if (areaFound) {
      return res.status(200).json({
        message: 'Area Found',
        areaFound
      });
    }
    return res.status(404).json({
      message: 'Area not found'
    });
  }

  /**
   * @description View all of my areas
   * @method Area
   * @param {*} req
   * @param {*} res
   */
  static async myArea(req, res) {
    const userId = parseFloat(req.decoded.userId);
    const areaFound = await Area.findAll({
      where: { userId }
    });
    if (areaFound) {
      return res.status(200).json({
        message: 'Areas Found',
        areaFound
      });
    }
    return res.status(404).json({
      message: 'Sorry!, you don\'t have any Area yet. Try to create Area'
    });
  }

  /**
   * @description View each Area
   * @method mySingleArea
   * @param {*} req
   * @param {*} res
   */
  static async mySingleArea(req, res) {
    const userId = parseFloat(req.decoded.userId);
    const areaId = parseFloat(req.params.areaId);
    const areaFound = await Area.findOne({
      where: [{ id: areaId }, { userId }]
    });
    if (areaFound) {
      return res.status(200).json({
        message: 'Area Found',
        areaFound
      });
    }
    return res.status(401).json({
      message: 'Area not found'
    });
  }



  /**
   * @description Delete Area
   * @method deleteMyArea
   * @param {*} req
   * @param {*} res
   */
  static async deleteMyArea(req, res) {
    const areaId = parseFloat(req.params.areaId);
    const userId = parseFloat(req.decoded.userId);
    const areaFound = await Area.findOne({
      where: [{ id: areaId }, { userId }]
    });
    if (areaFound) {
      await areaFound.destroy();
      return res.status(401).json({
        message: 'Area deleted'
      });
    }
    return res.status(401).json({
      message: 'Area not found'
    });
  }
}
module.exports = area;