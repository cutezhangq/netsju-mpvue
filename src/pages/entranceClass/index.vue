<template>
  <div class="control">
    <div class="container">
      <div class="grid-item-1" @click="goUsedMarket()">
        <i class="iconfont icon-netsju-zu usedShop"></i>
        <i class="web-font">二手市场</i>
        <span class="spanSty">
          <span>000</span>
        </span>
      </div>
      <div class="grid-item-2">
        <i class="iconfont icon-netsju-waimai takeAway" style="font-size:240%"></i>
        <i class="web-font">外卖代取</i>
        <span class="spanSty">
          <span>333</span>
        </span>
      </div>
      <div class="grid-item-3">
        <i class="iconfont icon-netsju-zhaopin job"></i>
        <i class="web-font">兼职招聘</i>
        <span class="spanSty">
          <span>222</span>
        </span>
      </div>
      <div class="grid-item-4">
        <i class="iconfont icon-netsju-luntan3 school" style="font-size:179%"></i>
        <i class="web-font">校园社区</i>
        <span class="spanSty">
          <span>1111</span>
        </span>
      </div>
    </div>
    <!-- <van-button type="primary">按钮</van-button> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      goUsedMarket(){
        wx.switchTab({
          url: '/pages/usedMarket/index/main'
        })
      },
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
