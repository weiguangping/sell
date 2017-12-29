<!--  -->
<template>
  <div class="address">
    <mt-header fixed title="sellapp">
      <span @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <ul class="addresslist" v-if="address.length>0">
      <li v-for="(item,index) in address" :key="index" class="bg_white p_all mt_20" @click.stop="selectdAddress(index)">
        <p>{{item.name}}
          <span class="fr">{{item.mobile}}</span>
        </p>
        <p>{{item.province}}{{item.city}}{{item.area}}{{item.detail}}</p>
        <div class="b_t">
          <label class="mint-checklist-label dib" @click.stop="check(index)">
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" v-model="item.checked">
              <span class="mint-checkbox-core"></span>
            </span>
            <span>选择默认</span>
          </label>
          <div class="opt fr">
            <span @click.stop="delAddress(index)">
              <i class="iconfont icon-xinxi"></i>删除</span>
            <span @click.stop="editAddress(index)">
              <i class="iconfont icon-xinxi"></i>编辑</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="tc mt_20">
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
import { Toast } from "mint-ui";
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
      addressValue: "请选择地区",
      edit: false,
      editIndex: -1,
      flag: false
    };
  },
  created () {
    if (this.$route.query.flag) {
      this.flag = true;
    }
    if (localStorage.address) {
      this.address = JSON.parse(localStorage.address);
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    selectdAddress (index) {
      if (this.flag) {
        let selAddress = this.address[index];
        localStorage.setItem("selAddress", JSON.stringify(selAddress));
        this.$router.go(-1);
      }
    },
    delAddress (index) {
      MessageBox({
        title: "提示",
        message: "确定删除么?",
        showCancelButton: true
      }).then(res => {
        if (res === "confirm") {
          this.toast();
          this.address.splice(index, 1);
          if (this.address.length > 0) {
            this.address[0].checked = true;
          }
          localStorage.setItem("address", JSON.stringify(this.address));
        }
      });
    },
    editAddress (index) {
      this.showpop = true;
      this.name = this.address[index].name;
      this.mobile = this.address[index].mobile;
      this.detail = this.address[index].detail;
      this.addressValue =
        this.address[index].province +
        " " +
        this.address[index].city +
        " " +
        this.address[index].area;
      this.province = this.address[index].province;
      this.city = this.address[index].city;
      this.area = this.address[index].area;
      this.edit = true;
      this.editIndex = index;
    },
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
      this.show = true;
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
      if (localStorage.address && JSON.parse(localStorage.address).length > 0) {
        let address = JSON.parse(localStorage.address);
        if (this.edit) {
          data.checked = address[this.editIndex].checked;
          address[this.editIndex] = data;
        } else {
          address.push(data);
        }
        localStorage.setItem("address", JSON.stringify(address));
        this.address = address;
      } else {
        let arr = [];
        data.checked = true;
        arr.push(data);
        this.address = arr;
        localStorage.setItem("address", JSON.stringify(arr));
      }
      this.toast();
      this.showpop = false;
    },
    toast () {
      Toast({
        message: "操作成功",
        position: "middle",
        duration: 1000
      });
    },
    addAddress () {
      this.name = "";
      this.mobile = "";
      this.detail = "";
      this.addressValue = "请选择地区";
      this.province = "";
      this.area = "";
      this.city = "";
      this.showpop = true;
      this.edit = false;
      this.editIndex = -1;
    },
    close () {
      this.showpop = false;
    },
    check (index) {
      this.address.map((i, ind) => {
        if (index === ind) {
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