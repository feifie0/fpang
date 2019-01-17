import mongoose from 'mongoose'
const Schema = mongoose.Schema
const nav = new Schema({
    type: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    item: [{
        _id: false,
        type: {
            type: String,
        },
        name: {
            type: String
        },
        item: [],
    }]
})

export default mongoose.model('nav', nav)
