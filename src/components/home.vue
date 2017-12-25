<!--  -->
<template>
  <div class="home padding padding">
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in banner" :key="index"><img :src="item.url" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <div>
      <ul class="list bg_white mt_20">
        <li class="li p_s" v-for="(item,index) in tabs" :key="index">
          <router-link :to='{name:""}'>
            <img :src="item.url" alt="">
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <h4 class="p_s bg_white mt_20">{{pro.title}}</h4>
      <ul class="pro">
        <div class="li mb_20" v-for="(item,index) in pro.items" :key="index"><img :src="item.url" alt=""></div>
      </ul>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banner: [],
      tabs: [],
      pro: {}
    };
  },
  created () {
    this.$ajax
      .get("banner")
      .then(res => {
        this.banner = res.data.items;
      })
      .catch(error => {
        console.log(error);
      });
    this.$ajax
      .get("tabs")
      .then(res => {
        this.tabs = res.data.items;
      })
      .catch(error => {
        console.log(error);
      });
    this.$ajax
      .get("pro")
      .then(res => {
        this.pro = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style lang='stylus' scoped>
.home
  text-align center
  .mint-swipe
    width 100%
    height 4rem
    img
      width 100%
      height 100%
  .list
    width 100%
    display flex
    align-items center
    justify-content center
    .li
      width 25%
      height 1rem
      .iconfont
        font-size .4rem
      p
        margin-top .1rem
      img 
        width .3rem
        height .3rem
  .main
    .pro
      .li
        img
          width 100%
          height 3rem 
   
</style>