const express = require("express")
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comments = require("../models/comments");
const router = express.Router();

// Router 1: Add Comments by user using POST Method --> id:Blog Id
router.post("/addcomment/:id", fetchUser, async (req, res) => {
    let success = false;
    try {
        // Fetch content
        const { content } = req.body;
        const blogId = req.params.id;
        if (!content) { return res.status(400).json({ success, error: "Enter valid content" }); }

        const user = await User.findById(req.user.id);
        if (!user) { return res.status(400).json({ success, error: "User invalid" }); }

        const blog = await Blog.findById(blogId);
        if (!blog) { return res.status(400).json({ success, error: "Not found Blog" }); }

        const comments = new Comments({
            user: req.user.id, blogId, username: user.username, content
        });
        await comments.save();
        success = true;
        res.json({ success, comments });

    } catch (error) {
        console.error(error);
        res.status(400).json({ success, error: "Some error occurs" });
    }
});

// Router 2:Fetch all comments of particular blog --> id: Blog Id
router.post("/fetchall/:id", async (req, res) => {
    let success = false;
    try {
        const blogId = req.params.id;
        const comments = await Comments.find({ blogId: blogId });
        success = true;
        res.json({ success, comments });
    } catch (error) {
        console.error(error)
        res.status(400).json({ success, error: "Some error occurs" })
    }
});

// Router 3:Update a comment by user -->id : comment Id
router.post("/updatecomment/:id", fetchUser, async (req, res) => {
    let success = false;
    try {
        const { content } = req.body;
        const user = req.user.id;
        const commentId = req.params.id;

        // New Updated Comment Content
        const newCom = {};
        if (content) { newCom.content = content; }

        // Check comment is present or not
        const comment = await Comments.findOne({ commentId });
        if (!comment) { return res.status(400).json({ success, error: "Enter valid comment" }); }

        // Check comment update by same user
        if (user !== comment.user.toString()) { return res.status(400).json({ success, error: "User by inavlid access" }); }

        // Update comment with authentication complete
        const saveComment = await Comments.findByIdAndUpdate(commentId, { $set: newCom }, { new: true });
        success = true;
        res.json({ success, saveComment });

    } catch (error) {
        console.error(error);
        res.status(400).json({ success, error: "Some error occurs" })
    }
});

// Router 4:Delete a comment of particular blog --> Comment id
router.post("/deletecomment/:id", fetchUser, async (req, res) => {
    let success = false;
    try {
        // Check comment found or not
        const comment = await Comments.findById(req.params.id);
        if (!comment) { return res.status(400).json({ success, error: "Not found comment" }); }

        // Check same user are delete comment or not
        if (req.user.id !== comment.user.toString()) { return res.status(400).json({ success, error: "Invalid access by user" }); }

        // Delete Comment by user
        const deleteComment = await Comments.findByIdAndDelete(req.params.id, { new: true });
        success = true;
        res.json({ success, deleteComment });
    } catch (error) {
        console.error(error)
        res.status(400).json({ success, error: "Some error occurs" });
    }
});
module.exports = router;