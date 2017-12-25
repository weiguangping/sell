<!--  -->
<template>
  <div>
    <div class="footer">
      <mt-tabbar class="fix">
        <router-link to="/home" tag="div">
          <mt-tab-item id="home">
            <span slot="icon" class="iconfont icon-xinxi"></span>首页
          </mt-tab-item>
        </router-link>
        <router-link to="/cat" tag="div">
          <mt-tab-item id="cat">
            <span slot="icon" class="iconfont icon-xinxi"></span> 分类
          </mt-tab-item>
        </router-link>
        <router-link to="/car" tag="div">
          <mt-tab-item id="car">
            <span slot="icon" class="iconfont icon-xinxi"></span> 购物车
          </mt-tab-item>
        </router-link>
        <router-link to="/mine" tag="div">
          <mt-tab-item id="mine">
            <span slot="icon" class="iconfont icon-xinxi"></span> 我的
          </mt-tab-item>
        </router-link>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  created () {}
};
</script>
<style lang='stylus' scoped>
</style>