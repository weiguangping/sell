<!--  -->
<template>
  <div class="cart padding">
    <mt-header fixed title="sellapp"></mt-header>
    <div class="top bg_white p_s">
      <img src="../assets/logo.png" class="logo" alt="">
      <span>店铺111</span>
    </div>
    <ul>
      <li v-for="(item,index) in cartData" :key="index" class="flex p_s b_t bg_white">
        <mt-cell-swipe class="w100" :right="[{content: 'Delete',style: { background: 'red',color: '#fff',width:'50px','margin-right':'10px' },handler: () => del(index)}]">
          <label class="mint-checklist-label dib">
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" v-model="checkboxModel" :value="item.skuId">
              <span class="mint-checkbox-core"></span>
            </span>
          </label>
          <div class="main">
            <img :src="item.img" alt="">
            <h4>{{item.name}}</h4>
            <p>{{item.skuName}}</p>
            <span class="price">￥{{item.price}}.00</span>
            <span class="fr">X{{item.num}}</span>
          </div>
        </mt-cell-swipe>
      </li>
    </ul>
    <div class="cartfoot">
      <label class="mint-checklist-label p_all">
        <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" value="全部" v-model="checkAll" @click="checkallClick">
          <span class="mint-checkbox-core"></span>
        </span>
        <span>全部</span>
      </label>
      <div class="fr">
        <span class="pri">￥{{tolPrice}}.00</span>
        <button class="btn" @click="confirmOrder">下单</button>
      </div>
    </div>
    <mt-popup v-model="showPop" :modal='false'>
      <h4>删除成功</h4>
    </mt-popup>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data () {
    return {
      value: false,
      checkAll: false,
      cartData: [],
      showPop: false,
      checkboxModel: [],
      tolPrice: 0
    };
  },
  created () {
    if (localStorage.cartData) {
      let cartData = JSON.parse(localStorage.cartData);
      this.cartData = cartData;
    }
  },
  watch: {
    checkboxModel: {
      handler: function (val, oldVal) {
        this.tolPrice = 0;
        if (this.checkboxModel.length === this.cartData.length) {
          this.checkAll = true;
          this.sumPrice();
        } else {
          this.checkAll = false;
          this.sumPrice();
        }
      },
      deep: true
    }
  },
  methods: {
    confirmOrder () {
      if (this.checkboxModel.length < 1) {
        MessageBox({
          title: "提示",
          message: "请选择后再下单?",
          showCancelButton: false
        });
      } else {
        let items = [];
        let newData = {};
        this.checkboxModel.forEach(i => {
          this.cartData.map(k => {
            if (k.skuId == i) {
              items.push(k);
            }
          });
        });
        newData.items = items;
        newData.tolprice = this.tolPrice;
        newData.sum = this.checkboxModel.length;
        localStorage.setItem("confirmData", JSON.stringify(newData));
        this.$router.push({
          name: "confirmpro"
        });
      }
    },
    sumPrice () {
      this.checkboxModel.forEach(i => {
        this.cartData.map(k => {
          if (k.skuId == i) {
            this.tolPrice += k.num * k.price;
          }
        });
      });
    },
    checkallClick () {
      if (!this.checkAll) {
        this.checkboxModel = [];
        this.cartData.map(i => {
          this.checkboxModel.push(i.skuId);
        });
      } else {
        this.checkboxModel = [];
      }
    },
    del (index) {
      MessageBox({
        title: "提示",
        message: "确定删除么?",
        showCancelButton: true
      }).then(res => {
        if (res == "confirm") {
          this.showPop = true;
          setTimeout(() => {
            this.showPop = false;
          }, 1000);
          this.cartData.splice(index, 1);
          localStorage.setItem("cartData", JSON.stringify(this.cartData));
        }
      });
      console.log(index);
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>