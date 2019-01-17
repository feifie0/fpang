import Router from 'koa-router';
import PageTitle from '../dbs/models/pagetitle';
import PageCon from '../dbs/models/pagecon';
import leftNav from '../dbs/models/nav';

let router = new Router({
    prefix: '/API'
})

async function addNavOne(level, level2, name, id) {
    let item = level2 ? [{
        type: 'menu',
        name: level2,
        item: [{
            type: 'menuItem',
            name,
            id
        }]
    }] : [{
        type: 'menuItem',
        name: level2,
        id
    }]
    let navData = new leftNav({
        type: 'menu',
        name: level,
        item
    })
    return await navData.save()
}
//新增页面 包括 头部 主体内容 左侧导航 
router.post('/addPage', async (ctx) => {
    let {
        data,
        title
    } = ctx.request.body
    // 构建 头部数据
    let page_T = new PageTitle(title);
    // 插入头部数据
    let T = await page_T.save()
    // 构建主体数据
    let page_C = new PageCon({
        id: T._id,
        con: data
    });
    // 插入主体数据
    let C = await page_C.save()

    let navCallback, //nav 储存后回调
        nav1, //判断一层是否存在
        nav2, //判断二层是否存在
        level = title.level,
        level2 = title.level2,
        name = title.name,
        id = page_T._id;
    // 查询 第一层导航
    nav1 = await leftNav.findOne({
        name: level
    })
    //判断第一层导航是否存在
    if (nav1) {
        //查询第二层导航
        nav2 = await leftNav.findOne({
            name: level,
            item: {
                $elemMatch: {
                    name: level2
                }
            }
        })
        //判断第二层导航是否存在
        if (nav2) {
            //一二层导航 存在 直接插入三级选项
            navCallback = await leftNav.updateOne({
                name: level,
                item: {
                    $elemMatch: {
                        name: level2
                    }
                }
            }, {
                $push: {
                    'item.$.item': {
                        type: 'menuItem',
                        name,
                        id
                    }
                }
            })
        } else {
            //二层导航不存在 同时插入二层导航 和 三级选项
            navCallback = await leftNav.updateOne({
                name: level
            }, {
                $push: {
                    'item': {
                        type: 'menu',
                        name: level2,
                        item: [{
                            type: 'menuItem',
                            name,
                            id
                        }]
                    }
                }
            })
        }
    } else {
        // 一级导航不存在  新建导航
        navCallback = await addNavOne(level, level2, name, id)
    }
    ctx.body = {
        code: 0,
        C,
        T,
        navCallback,
    }
})

router.get('/set', async (ctx) => {
    ctx.body = {
        code: 0
    }
})
// router.get('/get', async (ctx) => {
//     let data = await page_T.find()
//     if (data) {
//         ctx.body = {
//             code: 0,
//             mag: data
//         }
//     }
// })
// router.post('/up', async (ctx) => {
//     //let data = ctx.query //获取get请求参数
//     let data = ctx.request.body
//     // console.log(data)
//     ctx.body = {
//         code: 0,
//         mag: data
//     }
// })


export default router


// 查询：
// conditions 查询条件，如果查询条件为空，则表示匹配全部。
// [projection] 投影，设置返回的文档对象包含哪些字段。投影可以用字符串表示，空格分隔 ，减号表示不显示
// [options] 选项
// callback 回调函数，查询操作结果会通过回调函数返回，参数err，docs，doc对象是Model的实例，对应MongoDB的文档

// 查询所有：
// Model.find( conditions,[projection],[options],callback );
// 根据Id属性查询：
// Model.findById( Id，[projection],[options],callback );
// 查询符合条件的第一个文档：
// Model.findOne( conditions,[projection],[options],callback );

// 增加：
// Model.create({name:"瑞雯"},function(){if(!err){}});
// let page_T = new PageTitle({
//     title: "title",
//     name: "name",
//     text
// });
// 修改：
// Model.update( conditions,doc,[projection],[options],callback );
// options可选:
// upsert (boolean)： 默认为false。如果查询结果不存在是否创建新记录。
// multi (boolean)： 默认为false。是否修改多个文档。


// 删除:
// 删除符合条件的所有文档：
// Model.deleteMany(conditions,callback);

// 删除符合条件的第一个文档：
// Model.remove(conditions,callback);
// Model.deleteOne(conditions,callback);

// 数：
// Model.count(conditions,callback);
// 数量会通过回调中的参数count返回。
// atcModel.count({type:"Vue.js"},function(err,count){
//     if(!err){
//         console.log("共匹配到:"+count)
//     }  
// });
// 复杂条件：

// 属性值自增 $inc

// 增加属性 $set

// 删除属性 $unset

// 比较 $eq等于 $lt小于 $lte小于等于 $gt大于 $gte大于等于 $ne不等于

// 逻辑与多个条件:逗号隔开

// 逻辑或多个条件 {$or:[{a:1},{b:2}]}

// 常见选项：

// 显示前10 .limit(10)

// 显示11-20 .skip(10).limit(10) skip( 页码-1 * 每页条数)


// 排序
// sort({sal：1})  升序参数1  降序参数-1 多个条件逗号隔开
