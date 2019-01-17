<template>
    <section id="page-high">
        <!-- 简介 -->
        <div class="title">
            <!-- 标题 -->
            <h1>highlight.js与nuxt一起使用</h1>
            <p>highlight.js是一款强大的Web的语法突出显示插件，支持185种语言和89种风格、自动语言检测、多语言代码突出显示、可用于node.js、适用于任何标记、与任何js框架兼容。</p>官网地址：
            <a target="_blank" href="https://highlightjs.org/">https://highlightjs.org/</a>
        </div>
        <!-- 步骤 -->
        <!-- 第一步 -->
        <div class="block">
            <h3>第一、下载</h3>
            <p>
                下载地址
                <a
                    target="_blank"
                    href="https://highlightjs.org/download/"
                >https://highlightjs.org/download/</a>选择自己需要的语言点击Download按钮下载
            </p>
            <div class="img">
                <p>解压后：</p>
                <img src="~static/plug/highlight/img1.png" alt>
            </div>
            <p>styles文件夹里面是风格样式根据自己的喜好引入</p>
        </div>
        <!-- 第二步 -->
        <div class="block">
            <h3>第二、引用&amp;初始化</h3>
            <div class="code">
                <code>&lt;link rel="stylesheet" href="/highlight/styles/default.css"&gt;
                    <br>&lt;script src="/highlight/highlight.pack.js"&gt;&lt;/script&gt;
                    <br>&lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;
                </code>
            </div>
            <p>
                css文件决定样式风格，根据自己爱好选择，可以到官网
                <a
                    target="_blank"
                    href="https://highlightjs.org/static/demo/"
                >demo</a>选择对应语言对应样式预览
            </p>
            <p>hljs是js文件暴露出来的一个全局对象，所有的功能都会通过这个对象配置调用</p>
            <p>initHighlightingOnLoad是hljs下面的一个方法初始化highlight</p>
        </div>
        <!-- 第三步 -->
        <div class="block">
            <h3>第三、使用</h3>
            <div class="img">
                <p>
                    html当中这样写，使用pre标签保留换行缩进。
                    <strong>注意：尖括号要换成 &amp;lt; &amp;gt;</strong>
                </p>
                <img src="~static/plug/highlight/img2.png" alt>
            </div>
            <p>网页显示出来的效果：</p>
            <div class="code">
                <code>&lt;pre&gt;
                    <br>&nbsp;&lt;code&gt;
                    <br>&nbsp;&nbsp;function init() {
                    <br>&nbsp;&nbsp;&nbsp;console.log("a");
                    <br>&nbsp;&nbsp;}
                    <br>&nbsp;&lt;/code&gt;
                    <br>&lt;/pre&gt;
                </code>
            </div>
            <p>
                css文件决定样式风格，根据自己爱好选择，可以到官网
                <a
                    target="_blank"
                    href="https://highlightjs.org/static/demo/"
                >demo</a>选择对应语言对应样式预览
            </p>
            <p>hljs是js文件暴露出来的一个全局对象，所有的功能都会通过这个对象配置调用</p>
            <p>initHighlightingOnLoad是hljs下面的一个方法初始化highlight</p>
        </div>
        <div class="block">
            <div class="dividingLine">分割线</div>
            <h2>下面是nuxt项目里面的使用</h2>
        </div>
        <div class="block">
            <h3>第一、安装</h3>
            <div class="code">
                <code>npm install highlight.js --save</code>
            </div>
        </div>
        <div class="block">
            <h3>第二、引入</h3>
            <div class="code">
                <p>
                    在plugins目录下创建一个highlight.js 文件写一下代码
                    <strong>注意：configure 配置了一个useBR</strong>
                </p>
                <code>import Vue from 'vue'
                    <br>import Hljs from 'highlight.js'
                    <br>import 'highlight.js/styles/railscasts.css'
                    <br>
                    Hljs.configure({useBR: true});
                    <br>
                    let Highlight = {}
                    <br>Highlight.install = function (Vue, options) {
                    <br>&nbsp;Vue.directive('highlight', function (el) {
                    <br>&nbsp;&nbsp;let blocks = el.querySelectorAll('.code code');
                    <br>&nbsp;&nbsp;blocks.forEach((block) => {
                    <br>&nbsp;&nbsp;&nbsp;Hljs.highlightBlock(block)
                    <br>&nbsp;&nbsp;})
                    <br>&nbsp;})
                    <br>}
                    <br>export default () => {
                    <br>&nbsp;Vue.use(Highlight)
                    <br>}
                </code>
            </div>
        </div>
        <div class="block">
            <h3>第三、配置</h3>
            <div class="code">
                <p>在nuxt.config.js当中配置</p>
                <code>plugins: [
                    <br>&nbsp;'@/plugins/highlight'
                    <br>]
                </code>
            </div>
        </div>
        <div class="block">
            <h3>第四、使用</h3>
            <div class="code" v-highlight>
                <p>这次html中这样写，上面配置了不使用保留换行符的容器，需要自己使用br换行与空格缩进（个人认为这样代码会更整齐一点）</p>
                <img src="~static/plug/highlight/img3.png" alt>
                <p>页面显示效果：</p>
                <code>&lt;pre&gt;
                    <br>&nbsp;&lt;code&gt;
                    <br>&nbsp;&nbsp;function init() {
                    <br>&nbsp;&nbsp;&nbsp;console.log("a");
                    <br>&nbsp;&nbsp;}
                    <br>&nbsp;&lt;/code&gt;
                    <br>&lt;/pre&gt;
                </code>
            </div>
        </div>
        <!-- <right-list class="list"/> -->
    </section>
</template>

<script>
import rightList from "~/components/nav/rightlist.vue";
export default {
    data() {
        return {};
    },
    components: {
        rightList
    },
    mounted() {
        // console.log(Highlight)
        // Highlight()
        function init() {
            // console.log("a");
        }
    },

    updated() {
        // Highlight()
    }
};
</script>

<style lang='stylus' scoped>
#page-high {
    h1 {
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
    }

    .title {
        padding: 10px 0;
    }

    .block {
        padding: 20px;
        border-bottom: 1px solid #888;

        h3 {
            line-height: 180%;
        }

        p {
            line-height: 180%;

            strong {
                color: red;
            }
        }

        img {
            max-width: 100%;
        }
    }
}

@media all and (max-width: 1100px) {
    .list {
        display: none;
    }
}

.dividingLine {
    width: 100%;
    height: 30px;
    font-size: 20px;
    text-align: center;
    position: relative;
    padding: 30px 0;
}

.dividingLine::before {
    content: '';
    display: inline-block;
    width: calc(50% - 40px);
    height: 0px;
    border-bottom: 2px dashed #888;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
}

.dividingLine::after {
    content: '';
    display: inline-block;
    width: calc(50% - 40px);
    height: 0px;
    border-bottom: 2px dashed #888;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
}

.code code {
    border-radius: 5px;
}
</style>
