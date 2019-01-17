import Router from 'koa-router';
import PageTitle from '../dbs/models/pagetitle';

let router = new Router({
    prefix: '/API'
})

// 单独返回 Title 信息所有的 
router.get('/getTitle', async (ctx) => {
    let data = await PageTitle.find()
    if (data) {
        ctx.body = {
            code: 0,
            mag: data
        }
    }
})

export default router