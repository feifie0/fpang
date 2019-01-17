import Vue from 'vue'
import Hljs from 'highlight.js'
import 'highlight.js/styles/railscasts.css'
Hljs.configure({useBR: true});
let Highlight = {}
Highlight.install = function (Vue, options) {
    Vue.directive('highlight', function (el) {
        let blocks = el.querySelectorAll('.code code');
        blocks.forEach((block) => {
            Hljs.highlightBlock(block)
        })
    })
}
export default () => {
    Vue.use(Highlight)
}
