const express = require("express")
const router = express.Router();
const fetchUser = require("../middleware/fetchUser")
const User = require("../models/user")
const Blog = require("../models/blog")
const BlogData = require("../models/blogInfo");
const verifyUser = require("../middleware/verifyUser");

// Router 1: Add new blog details using post method -: id -> blogId
router.post("/addBlogInfo/:id", fetchUser, verifyUser, async (req, res) => {
    let success = false;
    try {
        const { TColor, TStyle, TFFamily, TSize, sTColor, sTStyle, sTFFamily, sTSize, DColor, DStyle, DFFamily, DSize } = req.body;
        const userId = req.user.id;
        const blogId = req.params.id;

        const user = await User.findById(userId);
        if (!user) { return res.status(400).json({ success, error: "User invalid" }) }

        const blog = await Blog.findById(blogId);
        if (!blog) { return res.status(400).json({ success, error: "Not found Blog" }) }

        const blogInfo = new BlogData({
            blogId: blog.id,
            titleColor: TColor,
            titleStyle: TStyle,
            titleFontFamily: TFFamily,
            titleSize: TSize,
            subTitleColor: sTColor,
            subTitleSize: sTSize,
            subTitleStyle: sTStyle,
            subTitleFontFamily: sTFFamily,
            desColor: DColor,
            desSize: DSize,
            desStyle: DStyle,
            desFontFamily: DFFamily
        });

        const saveBlogInfo = await blogInfo.save();
        success = true;
        res.send({ success, saveBlogInfo });
    } catch (error) {
        res.status(401).json({ success, error: "Some Error Occcurs" });
    }
});

// Router 2: This is fetch specific blog information
router.post("/infoFetch/:id", async (req, res) => {
    let success = false;
    try {
        const blogInfoId = req.params.id;
        if (!blogInfoId) { return res.send(401).json({ success, error: "Blog Information is not found" }) }

        const blogInfo = await BlogData.findById(blogInfoId);
        success = true;
        res.send({ success, blogInfo });
    } catch (error) {
        console.error(error);
    }
});

// Router 3: This is update blog info -: id -> bloginfo id
router.post("/updateBlogInfo/:id", fetchUser, verifyUser, async (req, res) => {
    let success = false;
    try {
        const { TColor, TStyle, TFFamily, TSize, sTColor, sTStyle, sTFFamily, sTSize, DColor, DStyle, DFFamily, DSize } = req.body;
        const userId = req.user.id;
        const blogInfoId = req.params.id;

        const user = await User.findById(userId);
        if (!user) { return res.status(400).json({ success, error: "User invalid" }) }

        const blogInfo = await BlogData.findById(blogInfoId);
        if (!blogInfo) { return res.status(400).json({ success, error: "Not found BlogInformation" }) }

        const newBlogInfo = {}
        if (TColor) { newBlogInfo.titleColor = TColor; }
        if (TStyle) { newBlogInfo.titleStyle = TStyle; }
        if (TFFamily) { newBlogInfo.titleFontFamily = TFFamily; }
        if (TSize) { newBlogInfo.titleSize = TSize; }

        if (sTColor) { newBlogInfo.subTitleColor = sTColor; }
        if (sTStyle) { newBlogInfo.subTitleStyle = TStyle; }
        if (sTFFamily) { newBlogInfo.subTitleFontFamily = sTFFamily; }
        if (sTSize) { newBlogInfo.subTitleSize = sTSize; }

        if (DColor) { newBlogInfo.desColor = DColor; }
        if (DStyle) { newBlogInfo.desStyle = DStyle; }
        if (DFFamily) { newBlogInfo.desFontFamily = DFFamily; }
        if (DSize) { newBlogInfo.desSize = DSize; }

        const updateBlogInfo = await BlogData.findByIdAndUpdate(blogInfoId, { $set: newBlogInfo }, { new: true });
        success = true;
        res.send({ success, updateBlogInfo });
    } catch (error) {
        res.status(401).json({ success, error: "Some Error Occcurs" });
    }
});
module.exports = router;