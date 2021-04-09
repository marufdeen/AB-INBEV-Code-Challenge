const { Area } = require('../models');
const validations = require('../helper/inPutValidation');

/* eslint radix: ["error", "as-needed"] */

/**
 * @description posts controller
 * class posts
 */
class area {
  /**
   * @description Create new post
   * @method createPost
   * @param {*} req
   * @param {*} res
   */
  static async calculate(req, res) {
    const userId = parseInt(req.decoded.userId);
    const { shape, side, length, breadth, lengthA, lengthB, lengthC, radius  } = req.body;
    const loweredShape = shape.toLowerCase(); 
    if (loweredShape == 'square') { 
      const errors = await validations.squareValidations(req.body);
      if (Object.keys(errors).length > 0) {
        return res.status(401).json({
          errors
        });
      }
    const result = parseInt(side * side);
    await Area.create({ userId, shape, side, result });
    return res.status(200).json({
      message: 'Area created successfully!',
      shape: loweredShape,
      dimensions: { side  },
      area: result
    });
    }  

    if (loweredShape == 'rectangle') {
      const errors = await validations.rectangleValidations(req.body);
      if (Object.keys(errors).length > 0) {
        return res.status(401).json({
          errors
        });
      }
      const result = parseInt(length * breadth);
      await Area.create({ userId, shape, length, breadth, result });
      return res.status(200).json({
        message: 'Area created successfully!',
        shape: loweredShape,
        dimensions: { length, breadth  },
        area: result
      });
      
    }
    else {
      return res.status(401).json({
        Error: 'Sorry, your shape is out of our scope at the moment'
      });
    }
  }

  /**
   * @description fetch all posts from dummy db
   * @method getPosts
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
   * @description fetch a single post from dummy db
   * @method getSinglePost
   * @param {*} req
   * @param {*} res
   */
  static async getSinglePost(req, res) {
    const postId = parseInt(req.params.postId);
    const postFound = await Post.findOne({
      where: [{ id: postId }, { visible: true }],
      include: [{
        model: Comment,
        as: 'comments'
      }],
    });
    if (postFound) {
      return res.status(200).json({
        message: 'Post Found',
        postFound
      });
    }
    return res.status(404).json({
      message: 'Post not found'
    });
  }

  /**
   * @description View all of my posts
   * @method myPosts
   * @param {*} req
   * @param {*} res
   */
  static async myPosts(req, res) {
    const userId = parseInt(req.decoded.userId);
    const postsFound = await Post.findAll({
      where: [{ userId }, { visible: true }]
    });
    if (postsFound) {
      return res.status(200).json({
        message: 'Posts Found',
        postsFound
      });
    }
    return res.status(404).json({
      message: 'Sorry!, you don\'t have any post yet. Try to create post'
    });
  }

  /**
   * @description View each post
   * @method mySinglePost
   * @param {*} req
   * @param {*} res
   */
  static async mySinglePost(req, res) {
    const userId = parseInt(req.decoded.userId);
    const postId = parseInt(req.params.postId);
    const postFound = await Post.findOne({
      where: [{ id: postId }, { userId }, { visible: true }],
      include: [{
        model: Comment,
        as: 'comments'
      }],
    });
    if (postFound) {
      return res.status(200).json({
        message: 'Post Found',
        postFound
      });
    }
    return res.status(401).json({
      message: 'Post not found'
    });
  }

  /**
   * @description Edit post
   * @method editMyPost
   * @param {*} req
   * @param {*} res
   */
  static async editMyPost(req, res) {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.decoded.userId);
    const postFound = await Post.findOne({
      where: [{ id: postId }, { userId }, { visible: true }]
    });
    if (postFound) {
      await postFound.update({
        title: req.body.title || postFound.title,
        content: req.body.content || postFound.content
      });
      return res.status(200).json({
        message: 'Post updated successfully!',
        postFound
      });
    }
    return res.status(404).json({
      message: 'Post not found'
    });
  }

  /**
   * @description Delete post
   * @method deleteMyPost
   * @param {*} req
   * @param {*} res
   */
  static async deleteMyPost(req, res) {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.decoded.userId);
    const postFound = await Post.findOne({
      where: [{ id: postId }, { userId }, { visible: true }]
    });
    if (postFound) {
      await postFound.destroy();
      return res.status(401).json({
        message: 'Post deleted along with corresponding comments!'
      });
    }
    return res.status(401).json({
      message: 'Post not found'
    });
  }
}
module.exports = area;