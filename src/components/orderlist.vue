<!--  -->
<template>
  <div class="orderlist">
    <mt-header fixed title="sellapp">
      <span @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div class="tabs">
      <ul class="flex_center p_all bg_white">
        <li :class="select==0?'on':''" @click="navclick(0)">全部</li>
        <li :class="select==1?'on':''" @click="navclick(1)">待付款</li>
        <li :class="select==2?'on':''" @click="navclick(2)">待收货</li>
        <li :class="select==3?'on':''" @click="navclick(3)">已收货</li>
        <li :class="select==4?'on':''" @click="navclick(4)">已签收</li>
      </ul>
    </div>
    <div class="main">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill='false'>
      <ul class="addresslist">
        <li class="p_all b_t bg_white ov order" v-for="(item,index) in orderlist" :key="index">
          <router-link class="db" :to="{name:'home',query:{id:item.id}}">
            <img :src="item.img" alt="" class="fl">
            <h4>{{item.name}}</h4>
            <p>{{item.skuName}}</p>
            <p>
              <span class="price">￥{{item.price}}.00</span>
              <span class="fr">x{{item.num}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderlist: [],
      select: 0,
      allLoaded: false
    };
  },
  created () {
    if (this.$route.query.type) {
      this.select = this.$route.query.type;
    } else {
      this.select = 0;
    }
    this.getList();
  },
  methods: {
    loadTop () {
      console.log('loadTop')
      this.getList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom () {
      console.log('loadBottom')
      this.getList(1);
      this.$refs.loadmore.onBottomLoaded();
    },
    getList (flag) {
      this.$ajax
        .get("orderlist")
        .then(res => {
          console.log(res);
          if (flag) {
            this.orderlist = this.orderlist.concat(res.data.items);
          } else {
            this.orderlist = res.data.items;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    navclick (type) {
      this.select = type;
      this.getList();
    },
    back () {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.scroll-wrapper li{
    line-height: 120px;
    font-size: 60px;
    text-align: center;
}
</style>