<!--  -->
<template>
  <div class="prodetails">
    <mt-header fixed title="sellapp">
      <span @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div class="lun">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in det.img" :key="index"><img :src="item" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="det bg_white p_s">
      <h5 class="mt_20 p_h">{{det.name}}</h5>
      <h4 class="mt_20 p_h">{{det.det}}</h4>
      <p class="mt_20 p_h price">￥{{det.minprice}}-{{det.maxprice}}</p>
    </div>
    <div class="img mt_20">
      <img v-for="(item,index) in det.details" :key="item.id" :src="item" alt="" class="wc-preview-img" v-lazy="item" @click="$preview($event, det.img, index)">
    </div>
    <div class="foot p_h box">
      <router-link :to="{name:'cart'}">
        <span class="iconfont icon-gouwuche"></span>
      </router-link>
      <div class="fotbtn fr">
        <button class="add" @click="showmask">加入购物车</button>
        <button class="buy" @click="showmask">立即购买</button>
      </div>
    </div>
    <transition name="maskbg" mode="out-in">
      <div v-if="show">
        <div class="maskbg" @click="close"></div>
      </div>
    </transition>
    <transition name="maskmain" mode="out-in">
      <div v-if="show">
        <div class="maskmain">
          <div class="top b_b p_all ov">
            <img :src="det.img[0]" alt="" class="fl">
            <h4>{{det.name}}</h4>
            <p class="price">{{det.minprice}}</p>
          </div>
          <div class="gui p_all clear">
            <ul>
              <li v-for="item in det.sku" :key="item.id">
                <h4>{{item.name}}</h4>
                <dl>
                  <dd v-for="val in item.value" :key="val.id" class="text" @click="selGui(item.id,val.id)" :class="val.isSelected?'on':''">{{val.name}}</dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="opa p_h">
            <h5>数量</h5>
            <button class="reduce" @click="reduce">-</button>
            <input type="text" v-on:input="input" class="num box" v-model="num" maxlength="2">
            <button class="add" @click="add">+</button>
          </div>
        </div>
        <div class="foot p_h box b_t">
          <router-link :to="{name:'cart'}">
            <span class="iconfont icon-gouwuche"></span>
          </router-link>
          <div class="fotbtn fr">
            <button class="add" @click="addCarorbuys(1)">加入购物车</button>
            <button class="buy" @click="addCarorbuys(2)">立即购买</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data () {
    return {
      det: { img: ["1"] },
      show: false,
      num: 1
    };
  },
  created () {
    console.log(this.$route.query);
    this.$ajax
      .get("det")
      .then(res => {
        console.log(res);
        res.data.sku.map(i => {
          i.value[0].isSelected = true;
        });
        this.det = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    selGui (opid, id) {
      console.log(opid, id);
      this.det.sku = this.det.sku.map((i, j) => {
        console.log(i, j);
        if (i.id == opid) {
          i.value.map((item, index) => {
            // 把同一规格的 取消选中
            item.isSelected = false;
            // 选中当前
            if (item.id == id) {
              item.isSelected = true;
            }
          });
        }
        return i;
      });
      console.log(this.det.sku);
    },
    showmask () {
      this.show = true;
    },
    addCarorbuys (flag) {
      this.show = false;
      let skuId = "";
      let skuName = "";
      let num = this.num;
      let img = this.det.img[0];
      let name = this.det.name;
      let price = this.det.minprice;
      this.det.sku.map(i => {
        i.value.map(k => {
          if (k.isSelected) {
            skuId += k.id + ",";
            skuName += k.name + ",";
          }
        });
      });
      skuId = skuId.substr(0, skuId.length - 1);
      skuName = skuName.substr(0, skuName.length - 1);
      let data = {
        skuId,
        skuName,
        num,
        img,
        name,
        price,
        checked: false
      };
      if (flag === 1) {
        if (localStorage.cartData) {
          let newarr = JSON.parse(localStorage.cartData);
          let flag = true;
          newarr.map(i => {
            if (i.skuId === skuId) {
              i.num += num;
              flag = false;
            }
            return i;
          });
          if (flag) {
            newarr.push(data);
          }
          localStorage.setItem("cartData", JSON.stringify(newarr));
        } else {
          let arr = [];
          arr.push(data);
          localStorage.setItem("cartData", JSON.stringify(arr));
        }
        // console.log(skuId, skuName);
        Toast({
          message: "操作成功",
          iconClass: "iconfont icon-xinxi"
        });
      } else {
        let arr = [];
        arr.push(data);
        let newData = {};
        newData.tolprice = num * price;
        newData.items = arr;
        newData.sum = num;
        localStorage.setItem("confirmData", JSON.stringify(newData));
        this.$router.push({ name: "confirmpro" });
      }
    },
    close () {
      this.show = false;
    },
    add () {
      if (this.num < 98) {
        this.num++;
      }
    },
    reduce () {
      if (this.num > 1) {
        this.num--;
      }
    },
    input () {
      // console.log(11)
      if (this.num <= 0) {
        this.num = 1;
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>