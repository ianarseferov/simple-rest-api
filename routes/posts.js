const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

//post data
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get single post
router.get("/:postID", async (req, res) => {
  try {
    const postID = req.params.postID;
    const post = await Post.findById(postID);
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
});

//delete post
router.delete("/:postID", async (req, res) => {
  try {
    const postID = req.params.postID;
    const post = await Post.deleteOne({ _id: postID });
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
});

//update post
router.patch("/:postID", async (req, res) => {
  try {
    const postID = req.params.postID;
    const post = await Post.updateOne(
      { _id: postID },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
});

module.exports = router;
