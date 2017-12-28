<!--  -->
<template>
  <div class="confirm padding">
    <mt-header fixed title="sellapp">
      <span @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div class="address">
      <router-link :to="{name:'address',query:{flag:1}}"  v-if="address.name">
        <div class="det ov bg_white p_all">
          <p>
            <span>{{address.name}}</span>
            <span class="fr">{{address.mobile}}</span>
          </p>
          <p>{{address.province}}{{address.city}}{{address.ares}}{{address.detail}}</p>
          <i data-v-48713cc3="" class="mint-cell-allow-right"></i>
        </div>
      </router-link>
      <div v-else>
        <router-link :to="address">
          <h4 class="tc p_all bg_white">
            <router-link :to="{name:'address',query:{flag:1}}">选择地址</router-link>
          </h4>
        </router-link>
      </div>
    </div>
    <div class="main mt_20">
      <ul class="list">
        <li class="p_all b_t bg_white ov order" v-for="(item,index) in confirmData.items" :key="index">
          <img :src="item.img" alt="" class="fl">
          <h4>{{item.name}}</h4>
          <p>{{item.skuName}}</p>
          <p>
            <span class="price">￥{{item.price}}.00</span>
            <span class="fr">x{{item.num}}</span>
          </p>
        </li>
      </ul>
      <h5 class="p_all clear bg_white mt_20">
        商品金额
        <span class="price fr">￥{{confirmData.tolprice}}.00</span>
      </h5>
    </div>
    <div class="foot p_all bg_white ov box flex_cencers">
      <span>共计{{confirmData.sum}}件 合计:￥{{confirmData.tolprice}}.00</span>
      <button class="fr btn" @click="pay">去付款</button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data () {
    return {
      address: {},
      confirmData: {}
    };
  },
  created () {
    this.confirmData = JSON.parse(localStorage.confirmData);
    if (localStorage.selAddress) {
      this.address = JSON.parse(localStorage.selAddress);
    } else {
      if (localStorage.address && JSON.parse(localStorage.address).length > 0) {
        let address = JSON.parse(localStorage.address).filter(i => {
          return i.checked
        })
        this.address = address[0];
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
      localStorage.removeItem('selAddress');
    },
    pay () {
      if (!this.address.name) {
        Toast({
          message: "请选择地址"
        });
      } else {
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>