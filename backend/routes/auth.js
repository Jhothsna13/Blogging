const express = require("express");
const router = express.Router();

const {
  register,
  login,
  createPost,
  getBlogs,
  getBlogsByCategory,
  updateBlog,
  deleteBlog,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/create-post", createPost);
router.get("/blogs", getBlogs);
router.get("/blogs/:category", getBlogsByCategory);
router.put("/update-blog/:id", updateBlog);
router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
