<!--  -->
<template>
  <div class="address padding">
    <mt-header fixed title="sellapp"></mt-header>
    <ul class="addresslist" v-if="address.length>0">
      <li v-for="(item,index) in address" :key="index" class="bg_white p_all mt_20">
        <p>{{item.name}}
          <span class="fr">{{item.mobile}}</span>
        </p>
        <p>{{item.detail}}</p>
        <div class="b_t">
          <label class="mint-checklist-label dib">
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" v-model="item.checked" @click="check(index)">
              <span class="mint-checkbox-core"></span>
            </span>
            <span>选择默认</span>
          </label>
          <div class="opt fr">
            <span>
              <i class="iconfont icon-xinxi"></i>删除</span>
            <span>
              <i class="iconfont icon-xinxi"></i>编辑</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="tc mt_20">
      <button class="btn" @click="addAddress">新增地址</button>
    </div>
    <transition name="maskbg" mode="out-in">
      <div v-if="show">
        <div class="maskbg" @click="close"></div>
      </div>
    </transition>
    <transition name="maskmain" mode="out-in">
      <div v-if="show">
        <div class="addressEdit maskmain">
          <div class="p_all bg_white group">
            <label for="">姓名</label>
            <input type="text" placeholder="请输入姓名">
          </div>
          <div class="p_all bg_white group">
            <label for="">手机号</label>
            <input type="number" placeholder="请输入手机号">
          </div>
          <div class="addr ov bg_white">
            <div class="fl">
              <p>省级</p>
              <p>市区</p>
              <p>县镇</p>
            </div>
            <div class="fl">
              <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker>
            </div>
            <div class="det ov p_all bg_white group">
              <label for="">详细地址</label>
              <input type="text" placeholder="请输入地址">
            </div>
            <div class="tc mt_20 mb_20">
              <button class="btn">确定</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      address: [],
      checkboxModel: false,
      show: false
    };
  },
  created () {
    if (localStorage.address) {
      this.address = JSON.parse(localStorage.address);
    }
  },
  methods: {
    addAddress () {
      this.show = true;
    },
    close () {
      this.show = false;
    },
    check (index) {
      console.log(index);
      this.address.map((i, ind) => {
        console.log(i, ind);
        if (index == ind) {
          i.checked = true;
        } else {
          i.checked = false;
        }
        return i;
      });
      localStorage.setItem("address", JSON.stringify(this.address));
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>