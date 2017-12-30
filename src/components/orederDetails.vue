<!--  -->
<template>
  <div class="orderDetails">
    <my-header title='sell'></my-header>
    <div class="top ov p_all bg_white">
      <span class="iconfont icon-xinxi fl"></span>
      <h4>{{orderDetails.state==1?'已取消':orderDetails.state==2?'待付款':orderDetails.state==3?'待发货':'已签收'}}</h4>
      <p>若下单请留意物流信息</p>
    </div>
    <div class="con">
      <h5 class="p_all bg_white mt_20">订单编号:{{orderDetails.ordernumber}}</h5>
      <ul>
        <li class="p_all b_t bg_white ov order" v-for="(item,index) in orderDetails.items" :key="index">
          <router-link class="db" :to="{name:'orederDetails',query:{id:item.id}}">
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
    </div>
    <div class="bot p_all bg_white">
      <h5>收件人：{{orderDetails.name}} <span class="mobile fr">{{orderDetails.mobile}}</span></h5>
      <p>{{orderDetails.details}}</p>
      <p>商品总计：￥{{orderDetails.tolprice}}</p>
      <p v-if="orderDetails.issend">物流单号：{{orderDetails.dan}}</p>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderDetails: {}
    };
  },
  created () {
    this.ajax(this.$route.query.id);
  },
  methods: {
    ajax (flag) {
      this.$ajax
        .get("orderDetails")
        .then(res => {
          // console.log(res);
          this.orderDetails = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
</style>