<!--  -->
<template>
    <div id="app">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150"
                 @top-status-change="handleTopChange" ref="loadmore">
        <ul class="scroll-wrapper">
            <li v-for="item in list" @click="itemClick(item)">{{ item }}</li>
        </ul>

    </mt-loadmore>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      allLoaded: false,
      topStatus: ''
    };
  },
  created () {
    var i = 0, len = 20;
    for (; i < len; i++) {
      this.list.push('demo' + i);
    }
  },
  methods: {
    loadTop () {  // 刷新数据的操作
      var self = this;
      setTimeout(function () {
        self.list.splice(0, self.list.length);
        for (let i = 0; i < 10; i++) {
          self.list.push('demo' + i);
        }
        self.$refs.loadmore.onTopLoaded();
      }, 2000);
    },
    loadBottom () { // 加载更多数据的操作
                // load data

                // this.allLoaded = true;// 若数据已全部获取完毕
      console.log(11)
      var self = this;
      setTimeout(function () {
        for (let i = 0; i < 10; i++) {
          self.list.push('dddd' + i);
        }
        self.$refs.loadmore.onBottomLoaded();
      }, 2000);
    },
    handleTopChange (status) {
      this.topStatus = status;
    },
    itemClick (data) {
      console.log('item click, msg : ' + data);
    }
  }
};
</script>
<style>
*{
    margin: 0;
    padding: 0;
}
html, body{
    height: 100%;
}

#app{

    height: 100%;
    overflow: scroll;
}
.scroll-wrapper{
    margin: 0;
    padding: 0;
    list-style: none;

}
.scroll-wrapper li{
    line-height: 120px;
    font-size: 60px;
    text-align: center;
}
</style>