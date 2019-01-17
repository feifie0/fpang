import path from 'path'
import koaBody from 'koa-body'
import Router from 'koa-router';
let router = new Router({
    prefix: '/upload'
})
let obj = {
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, '../upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        onFileBegin: async (name, file) => { // 文件上传前的设置
            console.log(name, file)
            if (file.type.indexOf('image') == -1) return;
            let imgName = `${new Date().getTime().toString()}.${file.type.split('/')[1]}`
            file.path = path.join(__dirname, `../../assets/img/${imgName}`)
            file.name = imgName
        },
    }
}

router.post('/img',koaBody(obj), async (ctx) => {
    ctx.body = {
        name: ctx.request.files.file.name
    }
})
export default router
