<template>
    <section id="page-index">
        <div id="banner">
            <img style="width:100%" src="~static/banner.png" alt>
            <h1>每天一点点进步</h1>
        </div>

        <div class="block" v-for="(item , index) in listData" :key="index">
            <h3>
                <a :href="'/page/' + item.name">{{item.title}}</a>
                <label for>{{item.createTime | formatTime}}</label>
            </h3>
            <template v-for="(v,i) in item.text">
                <p v-if="v.type == 'link'" :key="i">
                    {{v.con}}
                    <a target="_blank" :href="v.link">{{v.link}}</a>
                </p>
                <p v-else-if="v.type == 'text'" :key="i">{{v.con}}</p>
            </template>
        </div>
    </section>
</template>

<script>
var moment = require('moment');
export default {
    data() {
        return {
            listData: []
        };
    },
    components: {
        // rightList
    },
    filters: {
        formatTime: function(val) {
            return moment(new Date(val).getTime()).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    async mounted() {
        let { status, data } = await this.$axios.get("/API/getTitle");
        console.log("data:", data);
        if (status === 200) {
            this.listData = data.mag;
        }
    },
    updated() {
        // Highlight()
    }
};
</script>

<style lang='stylus' scoped>
#page-index {
    #banner {
        width: 100%;
        height: 200px;
        overflow: hidden;
        border-radius: 5px;
        margin: 0 auto;

        img {
            width: 100%;
            border-radius: 5px;
        }
    }

    .block {
        border-bottom: 1px solid #888;
        padding: 20px 0;

        h3 {
            margin-bottom: 5px;

            label {
                // float: right;
                margin-left: 10px;
                font-weight: 600;
                font-size: 14px;
            }
        }
        p{
            padding-top 5px 
        }
        div {
            background: #fff;
            text-align: center;
            margin: 10px 0;

            img {
                max-width: 100%;
            }
        }

        a {
            color: #666;
        }

        a:hover {
            color: red;
        }
    }
}
</style>
