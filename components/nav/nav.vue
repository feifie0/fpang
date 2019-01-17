<template>
    <div id="nav">
        <el-menu
            :default-active="navActive"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            :collapse="iscollapse"
            :collapse-transition="false"
            :unique-opened="true"
            :router="true"
        >
            <el-menu-item index="/">
                <i class="el-icon-star-on"></i>
                <span>首页</span>
            </el-menu-item>

            <el-submenu  v-for="(data_item,data_index) in navData" :key="data_index" :index="data_index + ''" >
                <template slot="title">
                    <i class="el-icon-star-on"></i>
                    <span>{{data_item.name}}</span>
                </template>
                <!--  -->
                <template v-if="data_item.type == 'menu'">
                    <template v-for="(item,index) in data_item.item">
                        <!-- 菜单 -->
                        <el-submenu v-if="item.type == 'menu'" :key="index" :index="data_index +'-'+ index" >
                            <template slot="title">
                                <i class="el-icon-star-off"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <!-- 菜单项 -->
                            <el-menu-item v-for="(v,i) in item.item" :key="i" :index="'/page/' + v.name" >{{v.name}}</el-menu-item>
                        </el-submenu>
                        <!-- 菜单项 -->
                        <el-menu-item v-else-if="item.type == 'menuItem'" :key="index" :index="'/page/' + item.name" >{{item.name}}</el-menu-item>
                    </template>
                </template>
                <template v-else-if="data_item.type == 'menuItem'">
                    <!-- 菜单项 -->
                    <el-menu-item v-for="(item,index) in data_item" :key="index" :index="'/page/' + item.name" >{{item.name}}</el-menu-item>
                </template>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navData: "",
            iscollapse: false,
            navActive: this.$route.path
        };
    },
    watch: {
        $route(to, from) {
            this.navActive = to.path;
        }
    },
    async mounted() {
        this.windowSize();
        window.onresize = this.windowSize;
        //获取导航数据
        let {
            status,
            data: { mag }
        } = await this.$axios.get("/API/getNav");
        if (status == 200) {
            this.navData = mag;
        }
    },
    methods: {
        windowSize: function() {
            let w = document.body.offsetWidth;
            if (w < 920 && w > 768) {
                this.iscollapse = true;
            } else {
                this.iscollapse = false;
            }
        }
    }
};
</script>
<style lang="stylus" scoped>
</style>



