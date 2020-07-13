<template>
  <div>
    <p>校园社区--测试页</p>
    <!-- tabbar -->
    <vueTabBar   
      @fetch-index="clickIndexNav"
      :selectNavIndex=selectNavIndex
      >
    </vueTabBar>
  </div>
</template>

<script>
import vueTabBar from "@/components/campusCTabBar";
export default {
  onShow(){
     wx.hideTabBar();
  },
  components: {
    vueTabBar
  },
   data() {
      return {
        selectNavIndex:1
      }
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  // @import "./style.styl";
</style>
