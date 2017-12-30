<!--  -->
<template>
  <div>
    <mt-header fixed :title="title">
      <span @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  created () {},
  props: ['title'], // 声明接收父组件参数
  methods: {
    back () {
      this.$router.go(-1); // 根据浏览器记录返回上一次
    }
  }

};
</script>
<style lang='stylus' scoped>
</style>