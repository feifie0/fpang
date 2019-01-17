import Router from 'koa-router';
import leftNav from '../dbs/models/nav';

let router = new Router({
    prefix: '/API'
})
// let getnav = new nav()
router.get('/getNav', async (ctx) => {
    let data = await leftNav.find()
    if (data) {
        ctx.body = {
            code: 0,
            mag: data
        }
    }
})
router.get('/upNav', async (ctx) => {
    let navData1 = new leftNav({
        type: 'menu',
        name: "javaScript",
        item: [{
            type: 'menu',
            name: "vue",
            item: [{
                type:'menuItem',
                name:'vue基础',
                id:'123456'
            }]
        }, {
            type: 'menu',
            name: "nuxt",
            item: [{
                type:'menuItem',
                name:'nuxt基础',
                id:'123456'
            }]
        }, {
            type: 'menu',
            name: "插件",
            item: [{
                type:'menuItem',
                name:'highlight',
                id:'123456'
            }]
        }]
    });
    let navData2 = new leftNav({
        type: 'menu',
        name: "css",
        item: [{
            type: 'menu',
            name: "原生css",
            item: [{
                type:'menuItem',
                name:'css基础',
                id:'123456'
            }]
        }, {
            type: 'menu',
            name: "element",
            item: [{
                type:'menuItem',
                name:'element基础',
                id:'123456'
            }]
        }]
    });
    let navData3 = new leftNav({
        type: 'menu',
        name: "server",
        item: [{
            type:'menuItem',
            name:'nginx基础',
            id:'123456'
        }]
    });
    let d1 = await navData1.save()
    let d2 = await navData2.save()
    let d3 = await navData3.save()
    ctx.body = {
        code: 0,
        d1,
        d2,
        d3
    }
})
export default router


// [{
//     type: 'menu',
//     name: "javaScript",
//     item: [{
//         type: 'menu',
//         name: "vue",
//         item: ''
//     }, {
//         type: 'menu',
//         name: "nuxt",
//         item: ''
//     }, {
//         type: 'menu',
//         name: "插件",
//         item: ''
//     }]
// },
// {
//     type: 'menu',
//     name: "css",
//     item: [{
//         type: '原生css',
//         name: "插件",
//         item: ''
//     }, {
//         type: 'element',
//         name: "插件",
//         item: ''
//     }]
// },
// {
//     type: 'menu',
//     name: "server",
//     item: [{
//         type: 'menu',
//         name: " ",
//         item: ''
//     }]
// }
// ]
