<!--  -->
<template>
  <div class="mine padding">
    <mt-header fixed title="sellapp"></mt-header>
    <div class="img">
      <img src="../assets/logo.png" alt="">
    </div>
    <router-link :to="{name:'orderlist',query:{type:1}}" class="db">
      <h4 class="bg_white p_all">
        <span class="iconfont icon-xinxi">
          <i>我的订单</i>
        </span>
        <span class="fr">查看全部
          <i class="mint-cell-allow-right"></i>
        </span>
      </h4>
    </router-link>
    <div class="status">
      <ul class="flex_cencer b_t">
        <li v-for="item in status" :key="item.id" class="flex_cencer p_s bg_white">
          <span :class="item.icon"></span>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <router-link :to="{name:'address'}" class="db">
      <h5 class="p_all bg_white mt_20">
        收货地址
        <span class="mint-cell-allow-right fr"></span>
      </h5>
    </router-link>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: [
        {
          name: "待付款",
          icon: "iconfont icon-xinxi",
          id: "1"
        },
        {
          name: "待发货",
          icon: "iconfont icon-xinxi",
          id: "2"
        },
        {
          name: "待收货",
          icon: "iconfont icon-xinxi",
          id: "3"
        },
        {
          name: "已签收",
          icon: "iconfont icon-xinxi",
          id: "4"
        }
      ]
    };
  },
  created () {}
};
</script>
<style lang='stylus' scoped>
</style>