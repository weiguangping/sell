<!--  -->
<template>
  <div class="cart padding">
    <mt-header fixed title="sellapp"></mt-header>
    <div class="top bg_white p_s">
      <img src="../assets/logo.png" class="logo" alt="">
      <span>店铺</span>
      <span class="fr" @click="edit">{{text}}</span>
    </div>
    <ul v-if="cartData.length>0">
      <li v-for="(item,index) in cartData" :key="index" class="flex p_s b_t bg_white">
        <mt-cell-swipe class="w100" :right="[{content: 'Delete',style: { background: 'red',color: '#fff',width:'50px','margin-right':'10px' },handler: () => del(index)}]">
          <label class="mint-checklist-label dib">
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" v-model="item.checked" @click="check(index)">
              <span class="mint-checkbox-core"></span>
            </span>
          </label>
          <div class="main">
            <img :src="item.img" alt="">
            <h4 class="text">{{item.name}}</h4>
            <p class="text">{{item.skuName}}</p>
            <span class="price">￥{{item.price}}.00</span>
            <span v-if="text=='编辑'" class="fr">X{{item.num}}</span>
            <div class="opa fr" v-else>
              <button class="reduce" @click="reduce(index)">-</button>
              <input type="text" v-on:input="input(index)" class="num box" v-model="item.num" maxlength="2">
              <button class="add" @click="add(index)">+</button>
            </div>
          </div>
        </mt-cell-swipe>
      </li>
    </ul>
    <div v-else class="tc p_all mt_20">暂无商品</div>
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
      tolPrice: 0,
      text: "编辑"
    };
  },
  created () {
    if (localStorage.cartData) {
      let cartData = JSON.parse(localStorage.cartData);
      this.cartData = cartData;
    }
    this.allCheck();
  },
  methods: {
    add (index) {
      if (this.cartData[index].num < 98) {
        this.cartData[index].num++;
      }
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    },
    reduce (index) {
      if (this.cartData[index].num > 1) {
        this.cartData[index].num--;
      }
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    },
    input (index) {
      // console.log(11)
      if (this.cartData[index].num <= 0) {
        this.cartData[index].num = 1;
      }
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    },
    edit () {
      if (this.text === "编辑") {
        this.text = "完成";
      } else {
        this.text = "编辑";
      }
    },
    confirmOrder () {
      let newarr = this.cartData.filter(i => {
        return i.checked;
      });
      if (newarr < 1) {
        MessageBox({
          title: "提示",
          message: "请选择后再下单?",
          showCancelButton: false
        });
      } else {
        let newData = {};
        newData.items = newarr;
        newData.tolprice = this.tolPrice;
        newData.sum = newarr.length;
        localStorage.setItem("confirmData", JSON.stringify(newData));
        this.$router.push({
          name: "confirmpro"
        });
      }
    },
    sumPrice () {
      this.tolPrice = 0;
      this.cartData.map(i => {
        if (i.checked) {
          this.tolPrice += i.num * i.price;
        }
      });
    },
    check (index) {
      this.cartData.map((i, ind) => {
        if (index === ind) {
          i.checked = !i.checked;
        }
        return i;
      });
      this.allCheck();
    },
    checkallClick () {
      if (!this.checkAll) {
        this.cartData.map(i => {
          i.checked = true;
          return i;
        });
      } else {
        this.cartData.map(i => {
          i.checked = false;
          return i;
        });
      }
      this.sumPrice();
    },
    allCheck () {
      let arr = this.cartData.filter(i => {
        return i.checked;
      });
      if (arr.length === this.cartData.length && this.cartData.length > 0) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      this.sumPrice();
    },
    del (index) {
      MessageBox({
        title: "提示",
        message: "确定删除么?",
        showCancelButton: true
      }).then(res => {
        if (res === "confirm") {
          this.showPop = true;
          setTimeout(() => {
            this.showPop = false;
          }, 1000);
          this.cartData.splice(index, 1);
          localStorage.setItem("cartData", JSON.stringify(this.cartData));
          this.allCheck();
        }
      });
      console.log(index);
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>