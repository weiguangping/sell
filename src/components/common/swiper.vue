<!--  -->
<template>
  <div>
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in banner" :key="index">
          <router-link class="db" :to="{name:'prodetails',query:{id:item.id}}">
            <img :src="item.url" alt="">
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banner: []
    };
  },
  props: ['url'],
  created () {
    this.$ajax
      .get("banner")
      .then(res => {
        this.banner = res.data.items;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style lang='stylus' scoped>
</style>