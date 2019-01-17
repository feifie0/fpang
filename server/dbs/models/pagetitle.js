import mongoose from 'mongoose'
const Schema = mongoose.Schema
const pageTitleSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    level: {
        type: String,
        require: true
    },
    isdelete: {
        type: Number,
        default: 0
    },
    text: [{
        type: {
            type: String,
            require: true
        },
        con: {
            type: String,
            require: true
        },
        link: String,
        _id: false
    }],
    createTime: {
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})

export default mongoose.model('pageTitle', pageTitleSchema)



// 数据类型
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array


// 选项
// autoIndex（默认true）
// 自动索引：应用开始的时候，Mongoose对每一个索引发送一个ensureIndex的命令。索引默认（_id）被Mongoose创建。当我们不需要设置索引的时候，就可以通过设置这个选项。
// 例：var schema = new Schema({..}, { autoIndex: false });


// capped
// 上限设置:如果有数据库的批量操作，该属性能限制一次操作的量。
// 例：new Schema({...},{capped:1024});  //一次操作上线1024条数据
// 当然该参数也可是对象，包含size、max、autiIndexId属性
// new Schema({...},{capped:{size:1024,max:100,autoIndexId:true}});


// collection
// 集合名字：在MongDB中默认使用Model的名字作为集合的名字，如过需要自定义集合的名字，可以通过设置这个选项。
// 例：var schema = new Schema({...}, {collection: 'yourName'});


// id
// mongoose分配给每一个schema一个虚拟属性id，它是一个getter。返回的是_id转换为字符串后的值。如果不需要为schema添加这个getter，可以通过id配置修改。

// _id（默认true）
// // 默认行为
// var pageSchema = new Schema({ name: String });
// var pageModel = mongoose.model('Page', pageSchema);
// var p = new pageModel({ name: 'mongodb.org' });
// console.log(p.id); // '50341373e894ad16347efe01'

// // 禁止id
// var pageSchema = new Schema({ name: String }, { id: false } );
// var pageModel = mongoose.model('Page', pageSchema);
// var p = new pageModel({ name: 'mongodb.org' });
// console.log(p.id); // undefined

// read


// safe（默认true）


// shardKey


// strict（默认true）


// toJSON


// toObject


// versionKey


// typeKey


// validateBeforeSave


// skipVersioning


// timestamps


// useNestedStrict


// retainKeyOrder
