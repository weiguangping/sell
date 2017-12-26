<!--  -->
<template>
  <div class="cat flex padding box">
    <mt-header fixed  title="sellapp"></mt-header>
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
            <router-link :to="{name:'prodetails',params:{id:item.id}}">
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
</style>