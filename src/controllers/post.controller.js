require("dotenv").config();
const { cloudinary } = require("./../utils/cloudinary");
const ImageSchema = require("./../models/image.model");
const Post = require("./../models/post.model");
const formatBufferToBase64 = require("./../utils/formatBufferToBase64");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('featuredImage');
    return res.status(200).json({ message: 'SUCCESS', posts });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting posts', error });
  }
}

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('featuredImage').populate('category');
    return res.status(200).json({ message: 'SUCCESS', post });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting post', error });
  }
}

const createPost = async (req, res) => {
  try {
    const { content, title, category, featuredImage, published } = req.body;
    const newPost = new Post({
      content,
      title,
      category,
      featuredImage,
      published,
    });
    await newPost.save();
    const populatedPost = await Post.findById(newPost._id).populate('featuredImage');
    return res.status(201).json({ message: 'Post created successfully', post: populatedPost });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating post', error });
  }
}

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, title, category, featuredImage, published } = req.body;

    let data = {}

    if (content != undefined) data.content = content;
    if (title != undefined) data.title = title;
    if (category != undefined) data.category = category;
    if (featuredImage != undefined) data.featuredImage = featuredImage;
    if (published != undefined) data.published = published;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: 'No data to update' });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({ message: 'SUCCESS', post: updatedPost });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating post', error });
  }
}

const upload = async (req, res) => {
  try {
    let image = req.file;
    const uploadedResponse = await cloudinary.uploader.upload(
      formatBufferToBase64(image).content,
      { upload_preset: process.env.UPLOAD_PRESET }
    );
    const uploadedImage = new ImageSchema({
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.secure_url,
    });
    await uploadedImage.save();

    return res.status(200).json({ message: 'SUCCESS', image: uploadedImage });
  } catch (error) {
    return res.status(500).json(error);
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting post', error });
  }
}

module.exports = {
  upload,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};
