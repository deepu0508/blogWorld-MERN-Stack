const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Blog = require("../models/blog");
const router = express.Router();
const multer = require("multer");
const User = require("../models/user");
const fs = require("fs");
const BlogData = require("../models/blogInfo");
const Comments = require("../models/comments");
const verifyUser = require("../middleware/verifyUser");
// const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "imgs") {
      cb(null, `img/${Date.now()} - ${file.originalname}`);
    } else {
      cb(null, `pdf/${Date.now()} - ${file.originalname}`);
    }
  },
});
const upload = multer({ storage: storage });

// Router 1:Add New Blog by User after login by POST Method
router.post(
  "/addblog",
  [
    body("title", "Enter valid Title").isLength({ min: 20 }),
    body("description", "Enter valid description").isLength({ min: 100 }),
  ],
  fetchUser,verifyUser,
  async (req, res) => {
    let success = false;
    try {
      const { title, description, subTitle, imgs, file, type } = req.body;
      const random = Math.floor(Math.random() * 10000000 + 100000000);

      // Image take from base64 data
      const base64img = String(imgs).split("base64,")[1];
      const bufferImg = Buffer.from(base64img, "base64");
      const imgPath = `public/upload/img/img-${Date.now()}+${random}.png`;
      fs.writeFileSync(imgPath, bufferImg);

      // File take from base64 data
      if (file) {
        const base64file = String(file).split("base64,")[1];
        const bufferFile = Buffer.from(base64file, "base64");
        const filePath = `public/upload/pdf/file-${Date.now()}+${random}.pdf`;
        fs.writeFileSync(filePath, bufferFile);
      }

      // Check input data are correct or not
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors, error: "Enter valid data" });
      }

      // Check title are same with exists title in database
      const dbTitle = await Blog.findOne({ title });
      if (dbTitle) {
        return res
          .status(400)
          .json({ success, error: "This title name Blog already exists." });
      }

      // Create New Blog
      const author = await User.findById({ _id: req.user.id });
      try {
        if (!file) {
          const blog = new Blog({
            title,
            description,
            type,
            subTitle: subTitle || "",
            author: author.name,
            user: req.user.id,
            image: String(imgPath).replace("public/", "") || "/",
            file: "",
          });
          const saveBlog = await blog.save();
          success = true;
          res.send({ success, saveBlog });
        } else {
          const blog = new Blog({
            title,
            description,
            type,
            subTitle: subTitle || "",
            author: author.name,
            user: req.user.id,
            image: String(imgPath).replace("public/", "") || "/",
            file: String(file).replace("public/", "") || "/",
          });
          const saveBlog = await blog.save();
          success = true;
          res.send({ success, saveBlog });
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ success, error: "Some error occurrs" });
    }
  }
);

// Router 2:Fetch all blogs of User with Authentication
router.post("/fetchblogs", fetchUser,verifyUser, async (req, res) => {
  let success = false;
  try {
    const blogs = await Blog.find({ user: req.user.id });
    success = true;
    res.send({ success, blogs });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success, error: "Some error occurrs" });
  }
});

// Router 3:Fetch all Blogs for Gerneral Public without authentication and not update, delete
router.post("/fetchall",verifyUser, async (req, res) => {
  let success = false;
  try {
    const allBlogs = await Blog.find();
    success = true;
    res.send({ success, allBlogs });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success, error: "Some error occurrs" });
  }
});

// Router 4:Blog Update by particular User with Authentication useing POST Method
router.post("/updateblog/:id", fetchUser,verifyUser, async (req, res) => {
  let success = false;
  try {
    // Fetch all updated values
    const { title, description, subTitle, imgs, file, type, blogInfoId } =
      req.body;
    const random = Math.floor(Math.random() * 10000000 + 100000000);
    // Create new update blog
    const newBlog = {};

    // Image take from base64 data
    if (imgs) {
      const base64img = String(imgs).split("base64,")[1];
      const bufferImg = Buffer.from(base64img, "base64");
      const imgPath = `public/upload/img/img-${Date.now()}+${random}.png`;
      fs.writeFileSync(imgPath, bufferImg);
      newBlog.image = String(imgPath).replace("public/", "");
    }

    // File take from base64 data
    if (file) {
      const base64file = String(file).split("base64,")[1];
      const bufferFile = Buffer.from(base64file, "base64");
      const filePath = `public/upload/pdf/file-${Date.now()}+${random}.pdf`;
      fs.writeFileSync(filePath, bufferFile);
      newBlog.file = String(file).replace("public/", "");
    }

    // Check which value are update by user
    if (title) {
      newBlog.title = title;
    }
    if (description) {
      newBlog.description = description;
    }
    if (subTitle) {
      newBlog.subTitle = subTitle;
    }
    if (type) {
      newBlog.type = type;
    }
    if (blogInfoId) {
      newBlog.blogInfoId = blogInfoId;
    }

    // Check Blog are available in db or not
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ success, error: "Blog not available" });
    }

    if (imgs) {
      fs.unlink("public/" + blog.image, () => {
        console.log("Successfully image delete");
      });
    }
    if (file) {
      fs.unlink("public/" + blog.file, () => {
        console.log("Successfully file delete");
      });
    }

    // Check Blog same user by access or not
    if (blog.user.toString() !== req.user.id) {
      return res.status(400).json({ success, error: "Access Denied" });
    }

    // Update Blog
    const saveBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: newBlog },
      { new: true }
    );
    success = true;
    res.send({ success, saveBlog });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success, error: "Some error occurrs" });
  }
});

// Router 5: Blog Delete by User with Authentication
router.delete("/deleteblog/:id", fetchUser,verifyUser, async (req, res) => {
  let success = false;
  try {
    // Check blog are available or not in db
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ success, error: "Not Available" });
    }

    // Check Blog by same user or not
    if (blog.user.toString() !== req.user.id) {
      return res.status(400).json({ success, error: "Access Denied" });
    }

    // Blog Delete by Blog Id
    try {
      fs.unlink(blog.image, (err) => console.log(err));
      if (blog.file) {
        fs.unlink(blog.file, (err) => console.log(err));
      }
    } catch (error) {
      console.error(error);
    }
    const deleteComment = await Comments.deleteMany({ blogId: blog._id });
    console.log(deleteComment)
    const deleteInfo = await BlogData.findByIdAndDelete(blog.blogInfoId, { new: true });
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id, {
      new: true,
    });
    success = true;
    res.send({ success, deleteBlog,deleteComment,deleteInfo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success, error: "Some error occurrs" });
  }
});

router.post("/blogLike/:id", fetchUser,verifyUser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const blogId = req.params.id;

    if (!userId) {
      return res.status(401).json({ success, error: "Access Denied" });
    }
    if (!blogId) {
      return res.status(401).json({ success, error: "Blog Id Not Present" });
    }

    const blog = await Blog.findById(blogId);

    const newBlog = { likes: blog.likes };
    blog.likes.includes(userId)
      ? (newBlog.likes = newBlog.likes.filter((e) => e !== userId))
      : newBlog.likes.push(userId);

    const updateBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: newBlog },
      { new: true }
    );

    success = true;
    res.send({ success, updateBlog });
  } catch (error) {
    res.status(401).json({ success, error: "Some error occurs" });
  }
});

module.exports = router;
