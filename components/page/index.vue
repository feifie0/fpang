<template>
    <section id="page">
        <i v-if="_events.pageRemove" @click="remove" class="remove el-icon-close" circle></i>
        <!-- title -->
        <div class="title">
            <h1>{{pageTitle.title}}</h1>
            <template v-for="(v,i) in pageTitle.text">
                <p v-if="v.title == 'link'" :key="i">
                    {{v.con}}
                    <a target="_blank" :href="v.link">{{v.link}}</a>
                </p>
                <p v-else-if="v.title == 'text'" :key="i">{{v.con}}</p>
            </template>
        </div>
        <!-- block -->
        <div class="page-region" v-for="(block_item,block_index) in pageRegion " :key="block_index">
            <div class="block" v-if="block_index != 0">
                <div class="dividingLine">区分割线</div>
            </div>
            <h2>{{block_item.title}}</h2>
            <div v-for="(item,index) in block_item.block" :key="index" class="block">
                <h3>{{item.title}}</h3>
                <template v-for="(v,i) in item.con">
                    <!-- text -->
                    <p v-if="v.type == 'text'" :key="i">{{v.con}}</p>
                    <!-- code -->
                    <div v-if="v.type == 'code'" :key="i" class="code">
                        <code v-html="v.con.replace(/\n\r|\n|\r/g,'<br/>')"></code>
                    </div>
                    <!-- title -->
                    <h4 v-if="v.type == 'title'" :key="i">{{v.con}}</h4>
                    <!-- img -->
                    <div v-if="v.type == 'img'" class="img" :key="i">
                        <img :src="v.con" alt>
                    </div>
                    <!-- list -->
                    <ol v-if="v.type == 'list'" class="list" :key="i">
                        <li v-for="(list_item , list_i) in v.con" :key="list_i">{{list_item}}</li>
                    </ol>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
//
export default {
    data() {
        return {};
    },
    props: ["pageRegion", "pageTitle"],
    mounted() {},
    // 过滤器
    filters: {
        code: function(val) {
            return val.replace(/\n\r|\n|\r/g, "<br/>");
        }
    },
    methods: {
        remove: function() {
            this.$emit("pageRemove", "");
        }
    }
};
</script>

<style lang='stylus' scoped>
#page {
    width: 100%;
    max-width: calc(1100px - 250px);
    height: 100%;
    overflow-y: auto;
    // position: fixed;
    // left: 250px;
    // top: 0;
    background: rgba(176, 245, 176, 0.8);
    padding: 30px 20px;
    box-sizing: border-box;

    .remove {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        background: red;
        color: #fff;
        cursor: pointer;
    }

    h1 {
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        font-size: 30px;
    }

    .title {
        padding: 10px 0;
    }

    .block {
        padding: 20px;
        border-bottom: 1px solid #888;

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

        h3, h4, p {
            padding-top: 10px;
            line-height: 180%;
        }

        strong {
            color: red;
        }

        ol {
            li {
                padding: 5px 0;
            }
        }

        img {
            max-width: 100%;
        }

        .code code {
            border-radius: 5px;
        }
    }
}

</style>
