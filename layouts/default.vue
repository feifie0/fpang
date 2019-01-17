<template>
    <div id="show" @click="mouseClick" :style=" isShow ? 'left:250px' : ''">
        <my-header class="header hidden-sm-and-up"/>
        <el-row class="row">
            <left-nav class="nav"/>
            <nuxt class="content" v-highlight/>
        </el-row>
        <div
            id="sidebar-mask"
            @click="onisLeftNavHide"
            :style=" isShow ? 'display:block' : 'display:none'"
        ></div>
        <div
            class="spot"
            :style="spotShow ? `left:${client[0] - 15 }px;top:${client[1] - 15 }px;transition:transform 0.4s;transform: scale(0.01,0.01);opacity:1;`:'opacity:0'"
        ></div>
    </div>
</template>
<script>
import Bus from "~/assets/js/bus.js";
import MyHeader from "~/components/nav/header.vue";
import LeftNav from "~/components/nav/index.vue";

export default {
    components: {
        MyHeader,
        LeftNav
    },
    data() {
        return {
            isShow: false,
            spotShow: false,
            time: "",
            client: [],
            navData:''
        };
    },
    watch: {
        $route(to, from) {
            this.isShow = false;
        }
    },
    mounted: async function() {
        Bus.$on("onisLeftNavShow", val => {
            this.isShow = val;
        });
    },
    methods: {
        mouseClick: function(e) {
            this.client = [e.clientX, e.clientY];
            this.spotShow = true;
            clearTimeout(this.time);
            this.time = setTimeout(() => {
                this.spotShow = false;
            }, 400);
        },
        onisLeftNavHide: function() {
            this.isShow = false;
            Bus.$emit("onisLeftNavHide", "");
        }
    }
};
</script>
<style lang='stylus' scoped>
#show {
    position: relative;

    .header {
        background: #545c64;
        height: 50px;
        flex-shrink: 0;
    }

    .row {
        display: flex;
        max-width: 1100px;

        .nav {
            background: #545c64;
            height: 100vh;
            width: 250px;
            border-right: solid 1px #e6e6e6;
        }

        .content {
            width: calc(100% - 250px);
            background: #b0f5b0;
            height: 100vh;
            overflow-y: auto;
            box-sizing: border-box;
            padding: 30px 10px;
        }
    }

    #sidebar-mask {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .spot {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: fixed;
        left: 300px;
        top: 200px;
        z-index: 999;
        background: radial-gradient(transparent 60%, red 65%, transparent 75%);
        opacity: 0;
        pointer-events: none;
    }
}

@media all and (max-width: 920px) and (min-width: 768px) {
    #show {
        .row {
            .nav {
                width: 70px;
                // background: red;
            }

            .content {
                width: calc(100% - 70px);
                background: #b0f5b0;
            }
        }
    }
}

@media all and (max-width: 767px) {
    #show {
        .row {
            .content {
                width: 100%;
                background: #b0f5b0;
            }

            .nav {
                position: absolute;
                height: 100vh;
                left: -250px;
                top: -50px;
            }

            .content {
                height: calc(100vh - 50px);
            }
        }
    }
}
</style>
