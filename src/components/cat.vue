<!--  -->
<template>
  <div class="cat flex padding">
    <div class="left">
      <ul>
        <li v-for="(item,index) in cats" :key="index" class="text" :class="item.id==selected?'on':''" @click="navClick(item.id)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="right">
      <h4 class="p_s">{{pro.title}}</h4>
      <div class="main">
        <ul class="flex">
          <li v-for="(item,index) in pro.items" :key="index" class="box mb_20">
            <router-link :to="{name:'prodetails',params:'item.id'}">
              <img :src="item.url" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cats: [],
      tabs: [],
      pro: {},
      selected: -1
    };
  },
  created () {
    this.$ajax
      .get("cats")
      .then(res => {
        this.cats = res.data.items;
        this.selected = res.data.items[0].id
        this.requestGet(res.data.items[0].id)
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    navClick (id) {
      this.selected = id
    },
    requestGet () {
      this.$ajax
      .get("pro", {
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        this.pro = res.data;
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
};
</script>
<style lang='stylus' >
.cat
  text-align center
  height 100%
  .left
    height 100%
    background white
    overflow auto
    width 30%
    li
      width 100%
      padding .15rem .15rem
      box-sizing border-box
    .on
      color red
  .right
    flex 1
    ul
      flex-wrap wrap
      li
        width 33.3%
        padding 0 .1rem
        img 
          width 100%
          height 1rem
          
</style>