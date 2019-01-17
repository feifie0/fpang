<template>
  <ul id="list">
    <li><a href="/">标题1</a></li>
    <li><a href="/">标题2</a></li>
    <li><a href="/">标题3</a></li>
    <li><a href="/">标题4</a></li>
    <li><a href="/">标题5</a></li>
  </ul>
</template>

<script>
export default {
  components: {
  }
};
</script>

<style lang='stylus' scoped>
    #list{
        box-sizing border-box
        padding-left 50px 
        font-size 14px

        li{
            list-style outside  
            color #888
            a{
                color #888
            }
        }
    }
</style>
