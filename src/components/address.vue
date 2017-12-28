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
      <div v-if="showpop">
        <div class="maskbg" @click="close"></div>
      </div>
    </transition>
    <transition name="maskmain" mode="out-in">
      <div v-if="showpop">
        <div class="addressEdit maskmain">
          <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
          <mt-field label="手机号" type="number" placeholder="请输入手机号" v-model="mobile"></mt-field>
          <mt-cell title="地区" :value="addressValue" @click.native="selectAddress"></mt-cell>
          <div class="addr ov bg_white">
            <!-- <div class="fl">
              <p>省级</p>
              <p>市区</p>
              <p>县镇</p>
            </div>
            <div class="fl">
              <v-distpicker @selected='selected' province="广东省" city="广州市" area="海珠区"></v-distpicker>
            </div> -->
            <mt-field class="clear" label="详细地址" placeholder="请输入详细地址" v-model="detail"></mt-field>
            <div class="tc mt_20 mb_20">
              <button class="btn" @click="submit">确定</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <weui-distpicker @cancel='addressCancel' v-if='show' @confirm='addressConfirm'></weui-distpicker>
  </div>
</template>

<script>
import WeuiDistpicker from "weui-distpicker";
import { MessageBox } from "mint-ui";
export default {
  components: { WeuiDistpicker },
  data () {
    return {
      address: [],
      checkboxModel: false,
      showpop: false,
      name: "",
      mobile: "",
      detail: "",
      show: false,
      addressValue: "请选择地区"
    };
  },
  created () {
    if (localStorage.address) {
      this.address = JSON.parse(localStorage.address);
    }
  },
  methods: {
    addressCancel () {
      this.show = false;
    },
    addressConfirm (res) {
      this.province = res[0].label;
      this.city = res[1].label;
      this.area = res[2].label;
      this.addressValue =
        res[0].label + " " + res[1].label + " " + res[2].label;
      this.show = false;
    },
    selectAddress () {
      console.log(1);
      this.show = true;
    },
    selected (data) {
      this.area = data.area;
      this.city = data.city;
      this.province = data.province;
    },
    messageBox (message) {
      MessageBox({
        title: "提示",
        message
      });
    },
    submit () {
      if (this.name === "") {
        this.messageBox("请输入姓名");
        return;
      } else if (this.mobile === "") {
        this.messageBox("请输入手机号");
        return;
      } else if (this.area === "" || this.area === undefined) {
        this.messageBox("请选择地区");
        return;
      } else if (this.detail === "") {
        this.messageBox("请输入详细地址");
        return;
      }
      let data = {};
      data.name = this.name;
      data.mobile = this.mobile;
      data.detail = this.detail;
      data.area = this.area;
      data.city = this.city;
      data.province = this.province;
      console.log(data)
      if (localStorage.address) {
        let address = JSON.parse(localStorage.address);
        address.push(data);
        localStorage.setItem("address", JSON.stringify(address));
      } else {
        let arr = [];
        arr.push(data)
        localStorage.setItem("address", JSON.stringify(arr));
      }
    },
    addAddress () {
      this.showpop = true;
    },
    close () {
      this.showpop = false;
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
<style>
@import "../../static/css/weui.css";
</style>