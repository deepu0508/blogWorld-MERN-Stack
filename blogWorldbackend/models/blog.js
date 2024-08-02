const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    title: {
        type: String,
        require: true,
        unique:true
    },
    subTitle: {
        type: String,
        optional: true,
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    writeDate: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Array,
        default: [""]
    },
    file: {
        type: String,
        contentType: "pdf",
        optional: true
    },
    blogInfoId: {
        type: mongoose.Schema.Types.ObjectId,
        optional: true
    },
    // comment: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true
    // }
});

const Blog = mongoose.model("Blogs", blogSchema);
module.exports = Blog;