import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    creator: String,
    tags: [String],
    selectedFile: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post