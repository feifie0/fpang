<template>
  <el-row id="header">
    <el-col class="btn" :span="8">
      <i @click="navShow" :class="navClass ? 'el-icon-close':'el-icon-menu'"></i>
    </el-col>
    <el-col class="center" :span="8">阳光印象</el-col>
    <el-col :span="8">
      <img src="~static/logo.png" alt>
    </el-col>
  </el-row>
</template> 
<script>
import Bus from '~/assets/js/bus.js';
export default {
  data(){
    return{
      navClass:false
    }
  },
  mounted: function() {
    Bus.$on("onisLeftNavHide", () => {
      this.navClass = false;
    });
  },
  methods:{
    navShow:function(){
      this.navClass = !this.navClass
      Bus.$emit('onisLeftNavShow',this.navClass);
    }
  }
};
</script>
<style lang='stylus' scoped>
#header {
  height: 50px;
  line-height: 50px;
  padding 0 10px
  font-size 20px
  color #fff

  .btn{
    cursor pointer
  }

  .center {
    text-align: center;
  }

  img {
    width: 40px;
    float: right;
    margin-top: 5px;
  }
}
</style>
