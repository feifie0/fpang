<template>
    <div id="left">
        <div class="logo">
            <div class="img"></div>
            <p>Hello World</p>
        </div>
        <my-nav />
    </div>
</template> 
<script>
import MyNav from "./nav.vue";
export default {
    components: {
        MyNav
    }
};
</script>
<style lang='stylus'>
.logo {
    padding-top: 40px;
    padding-bottom: 10px;

    .img {
        width: 160px;
        height: 160px;
        margin: 0 auto;
        border-radius: 50%;
        background: url('~static/logo.png') no-repeat center / 160px 160px;
    }

    p {
        color: #fff;
        text-align: center;
        padding: 20px 0;
        font-size: 24px;
    }
}

@media all and (max-width: 920px) and (min-width: 768px) {
    .logo {
        .img {
            width: 60px;
            height: 60px;
            background: url('~static/logo.png') no-repeat center / 60px 60px;
        }

        p {
            font-size: 14px;
        }
    }
}

.el-menu {
    border: none;
}

.el-menu--collapse {
    width: 70px;
}
</style>
