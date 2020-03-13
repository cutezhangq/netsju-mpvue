<template>
  <div class="control">
    <div class="container">
      <div class="grid-item-1">
        <div>
          <i class="iconfont tc-xiangguanzhuanji-guangdie"></i>
          <i class="web-font">二手市场</i>
          <span class="spanSty">
            <span>333</span>张
          </span>
        </div>
      </div>
      <div class="grid-item-2">
        <i class="iconfont tc-gequ"></i>
        <i class="web-font">外卖代取</i>
        <span class="spanSty">
          <span>333</span>首
        </span>
      </div>
      <div class="grid-item-3">
        <i class="iconfont tc-icon-test"></i>
        <i class="web-font">兼职招聘</i>
        <span class="spanSty">
          <span>222</span>篇
        </span>
      </div>
      <div class="grid-item-4">
        <i class="iconfont tc-beidanci"></i>
        <i class="web-font">校园社区</i>
        <span class="spanSty">
          <span>1111</span>个
        </span>
      </div>
    </div>
    <van-button>测试</van-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brandList: [{
            name: '二手市场',
            floor_price: 12
          },
          {
            name: '跑腿',
            floor_price: 34
          },
          {
            name: '讨论',
            floor_price: 23
          },
          {
            name: '待定',
            floor_price: 45
          }
        ]
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.stylus";

</style>
