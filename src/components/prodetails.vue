<!--  -->
<template>
  <div class="prodetails">
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
      <img v-for="item in det.details" :key="item.id" :src="item" alt="">
    </div>
    <div class="foot p_h box">
      <span class="iconfont icon-xinxi"></span>
      <span class="iconfont icon-xinxi"></span>
      <div class="btn fr">
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
            <p>请选择颜色分类</p>
          </div>
          <div class="gui p_all clear">
            <ul>
              <li v-for="item in det.sku" :key="item.id">
                <h4>{{item.name}}</h4>
                <dl>
                  <dd v-for="item in item.value" :key="item.id" class="text" @click="selGui">{{item.name}}</dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="opa p_h">
            <h5>数量</h5>
            <button class="reduce" @click="reduce">-</button>
            <input type="text" v-on:input="input" class="num" v-model="num" maxlength="2">
            <button class="add" @click="add">+</button>
          </div>
        </div>
        <div class="foot p_h box">
          <span class="iconfont icon-xinxi"></span>
          <span class="iconfont icon-xinxi"></span>
          <div class="btn fr">
            <button class="add" @click="addCar">加入购物车</button>
            <button class="buy" @click="buys">立即购买</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      det: { img: ["1"] },
      show: false,
      num: 1
    };
  },
  created () {
    this.$ajax
      .get("det")
      .then(res => {
        console.log(res);
        this.det = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    selGui () {

    },
    showmask () {
      this.show = true;
    },
    addCar () {
      this.show = false;
      Toast({
        message: '操作成功',
        iconClass: 'iconfont icon-xinxi'
      });
    },
    buys () {
      this.show = false;
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
        this.num = 1
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>