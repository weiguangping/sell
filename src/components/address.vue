<!--  -->
<template>
  <div class="address padding">
    <mt-header fixed  title="sellapp"></mt-header>
    <ul class="addresslist">
      <li v-for="(item,index) in address" :key="index">
        <p>{{item.name}} <span class="fr">{{item.mobile}}</span></p>
        <p>{{item.detail}}</p>
        <div>
          <label class="mint-checklist-label dib">
            <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" v-model="checkboxModel" :value="item.skuId">
              <span class="mint-checkbox-core"></span>
            </span>
            <span>选择默认</span>
          </label>
          <div class="opt fr">
            <span><i class="iconfont icon-xinxi"></i>删除</span>
            <span><i class="iconfont icon-xinxi"></i>编辑</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      address: [{name: '1', detail: '1', mobile: '13640870150'}],
      checkboxModel: false
    }
  },
  created () {

  }
};
</script>
<style lang='stylus' scoped>
</style>