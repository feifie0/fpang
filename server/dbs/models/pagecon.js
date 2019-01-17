import mongoose from 'mongoose'
const Schema = mongoose.Schema
const pageCon = new Schema({
    id: {
        type: String,
        require: true
    },
    con: [{
        _id: false,
        title: {
            type: String,
            require: true
        },
        block: [{
            _id: false,
            title: {
                type: String,
                require: true
            },
            con: [{
                _id: false,
                type: {
                    type: String,
                    require: true
                },
                con: {}
            }]
        }]
    }]
})

export default mongoose.model('pageCon', pageCon)
