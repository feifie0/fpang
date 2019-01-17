import Koa from 'koa'
import consola from 'consola';
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose';
import dbConfig from "./dbs/config.js"
import {
    Nuxt,
    Builder
} from 'nuxt';
import cors from 'koa2-cors'
import APIpage from './API/page'
import APIupload from './API/upload'
import APInav from './API/nav'
import APItitle from './API/title'


const app = new Koa();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
//允许 跨域请求
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))
// app.use();
mongoose.connect(dbConfig.dbs, function (err) {
    if (err) {
        console.log('连接失败');
    } else {
        console.log('连接成功');
    }
});
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config);

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }
    app.use(APIpage.routes()).use(APIpage.allowedMethods())
    app.use(APIupload.routes()).use(APIupload.allowedMethods())
    app.use(APInav.routes()).use(APInav.allowedMethods())
    app.use(APItitle.routes()).use(APItitle.allowedMethods())
    app.use((ctx) => {
        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
        return new Promise((resolve, reject) => {
            ctx.res.on('close', resolve);
            ctx.res.on('finish', resolve);
            nuxt.render(ctx.req, ctx.res, (promise) => {
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject);
            });
        });
    });

    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}

start();
