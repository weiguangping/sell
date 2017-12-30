<!--  -->
<template>
  <div class="cat flex padding box">
    <mt-header fixed  title="sell"></mt-header>
    <div class="left" id="leftNav">
      <ul id="leftNavli" >
        <li v-for="(item,index) in cats" :id="'nav'+item.id" :data-id='item.id' :key="index" class="text" :class="item.id==selected?'on':''" @click="navClick(item.id)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="right">
      <h4 class="p_s">{{pro.title}}</h4>
      <div class="main">
        <ul class="flex">
          <li v-for="(item,index) in pro.items" :key="index" class="box mb_20">
            <router-link :to="{name:'prodetails',query:{id:item.id}}">
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
        // console.log(this.$route.query.id)
        if (this.$route.params.id) {
          this.selected = this.$route.params.id + 30;
        } else {
          this.selected = res.data.items[0].id;
        }
        this.requestGet(this.selected);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    navClick (id) {
      this.selected = id
      this.requestGet(id);
    },
    requestGet (id) {
      this.$ajax
      .get("pro", {
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        this.pro = res.data;
        // document.getElementById('leftNav').scrollTop = 238;
        // console.log(document.getElementById(ele).scrollTop)
        // console.log(document.getElementById('leftNavli').clientHeight, document.getElementById('nav' + id).offsetTop, document.getElementById('leftNav').clientHeight)
        document.getElementById('leftNav').scrollTop = document.getElementById('nav' + id).offsetTop - 2 * document.getElementById('nav' + id).clientHeight;
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