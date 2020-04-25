<template>
  <div class="bg">
     <!-- 头部轮播消息 -->
     <div class="head">
        <h2>超多人想买 快来发布赚钱</h2>
        <swiper class="resale" autoplay="true" interval="3000" circular="true" easing-function="easeInOutCubic">
          <swiper-item class="resale_detail">
              <img src="../../../../static/images/sell_goods/1.png">
              <p>宜搭T恤</p>
              <span>2658人想买</span>
              <input type="submit" value="一键转卖">
          </swiper-item>

          <swiper-item class="resale_detail">
            <img src="../../../../static/images/sell_goods/1.png">
            <p>宜搭T恤</p>
            <span>2658人想买</span>
            <input type="submit" value="一键转卖">
          </swiper-item>

          <swiper-item class="resale_detail">
            <img src="../../../../static/images/sell_goods/1.png">
            <p>宜搭T恤</p>
            <span>2658人想买</span>
            <input type="submit" value="一键转卖">
          </swiper-item>
        </swiper>
     </div>


     <!-- 分类小板块 -->
     <div class="discount">
        <div class="discount_item item_1">
          <p>卡卷回收</p>
          <p>各类电子卷加价20%</p>
        </div>
        <div class="discount_item item_2">
          <p>手机回收加价2%</p>
          <p>还送10元话费</p>
        </div>
        <div class="discount_item item_3">
          <p>发布租房</p>
          <p>免中介费</p>
        </div>
     </div>

     <div class="discount">
        <div class="discount_item item_4">
          <p>智能拍照估价</p>
          <p>看看旧物值多少钱</p>
        </div>
        <div class="discount_item item_5">
          <p>截图转卖</p>
          <p>体验黑科技</p>
        </div>
        <div class="discount_item item_6">
          <p>免费送</p>
          <p>换闲鱼币 兑好礼</p>
        </div>
     </div>
     
     <!-- 发布按钮 -->
     <div class="btn">
        <div class="submit">
          <img src="/static/images/sell_goods/照相机.png">
          <h2>发布闲置</h2>
          <p>相册/拍照/拍视频</p>
        </div>
     </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
    }
  },

  created () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
