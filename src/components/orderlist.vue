<!--  -->
<template>
  <div class="address padding">
    <mt-header fixed title="sellapp">
      <span @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div class="tabsl">
      <ul>
        <li>
          11
        </li>
      </ul>
    </div>
    <ul class="addresslist" v-if="orderlist.items.length>0">
      <li class="p_all b_t bg_white ov order" v-for="(item,index) in orderlist.items" :key="index">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderlist: { items: [{ name: "1" }] }

    };
  },
  created () {
    this.$ajax
      .get("orderlist")
      .then(res => {
        console.log(res);
        this.orderlist = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    back () {
      this.$router.go(-1);
    }
  }
};
</script>
<style>

</style>