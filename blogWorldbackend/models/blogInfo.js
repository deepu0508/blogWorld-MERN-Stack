const mongoose = require("mongoose")
const { Schema } = mongoose;

const blogInfo = new Schema({
    blogId: {
        type: mongoose.Types.ObjectId,
        require: true,
        unique:true
    },
    titleColor: {
        type: String,
        default: "black"
    },
    titleStyle: {
        type: String,
        default:"normal"
    },
    titleFontFamily: {
        type: String,
    },
    titleSize: {
        type: String,
    },
    subTitleColor: {
        type: String,
        default: "black"
    },
    subTitleStyle: {
        type: String,
        default:"normal"
    },
    subTitleFontFamily: {
        type: String,
    },
    subTitleSize: {
        type: String,
    },
    desColor: {
        type: String,
        default: "black"
    },
    desStyle: {
        type: String,
        default:"normal"
    },
    desFontFamily: {
        type: String,
    },
    desSize: {
        type: String,
    },
});

const BlogData = mongoose.model("blogInfomation", blogInfo);
module.exports = BlogData;