import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    articleId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment