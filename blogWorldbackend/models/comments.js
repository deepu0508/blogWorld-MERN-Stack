const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    time: {
        type: Date,
        require: true,
        default: Date.now()
    }
});

const Comments = mongoose.model("comments", commentSchema);
module.exports = Comments;