<template>
  <div class="control">
    <div class="container">
      <div class="grid-item-1" @click="goUsedMarket()">
        <i class="iconfont usedShop">&#xe6c7;</i>
        <i class="web-font">二手市场</i>
        <span class="spanSty">
          <span>旧物交易、闲置拍卖</span>
        </span>
      </div>
      <div class="grid-item-2">
        <i class="iconfont takeAway" style="font-size:240%">&#xe742;</i>
        <i class="web-font">外卖代取</i>
        <span class="spanSty">
          <span>外卖速拿、快递代取</span>
        </span>
      </div>
      <div class="grid-item-3">
        <i class="iconfont job">&#xe605;</i>
        <i class="web-font">兼职招聘</i>
        <span class="spanSty">
          <span>找兼职、找实习、找工作</span>
        </span>
      </div>
      <div class="grid-item-4" @click="goCampusCommunity()">
        <i class="iconfont school" style="font-size:179%">&#xe622;</i>
        <i class="web-font">校园社区</i>
        <span class="spanSty">
          <span>校园交友、校圈社区</span>
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
      goCampusCommunity(){
         wx.switchTab({
          url: '/pages/campusCommunity/index/main'
        })
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
