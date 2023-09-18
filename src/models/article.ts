import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true,
        maxLength: 150,
    },
    content: {
        type: String,
        required: true,
        maxLength: 2000,
    },
}, {
    timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

export default Article