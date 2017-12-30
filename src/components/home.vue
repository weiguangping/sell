<!--  -->
<template>
  <div class="home padding padding">
    <mt-header fixed title="sell"></mt-header>
    <my-swiper url='banner'></my-swiper>
    <div>
      <ul class="list bg_white mt_20">
        <li class="li p_s" v-for="(item,index) in tabs" :key="index" v-if="index<4">
          <router-link :to='{name:"cat",params:{id:item.id}}' :id='item.id'>
            <img :src="item.url" alt="">
            <p class="text">{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <h4 class="p_s bg_white mt_20">{{pro.title}}</h4>
      <div class="pro">
        <div class="li mb_20" v-for="(item,index) in pro.items" :key="index">
          <router-link class="db" :to="{name:'prodetails',query:{id:item.id}}"><img :src="item.url" alt=""> </router-link>
        </div>
      </div>
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
      .get("cats")
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