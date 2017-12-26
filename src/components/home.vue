<!--  -->
<template>
  <div class="home padding padding">
    <mt-header fixed  title="sellapp"></mt-header>
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

</style>