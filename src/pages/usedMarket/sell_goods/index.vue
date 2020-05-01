<template>
  <div class="bg">
    <!-- 消息 走马灯-->
    <div class="head" ref="gundong">
      <h2>超多人想买 快来发布赚钱</h2>
      <div class="gundong_box">
        <div class="gundong_text" v-for="(item,index) in scroll_goodsList" :key="index">
          <img :src="item.imgUrl">
          <p>{{item.text}}</p>
          <span>{{item.num}}人想买</span>
          <input type="text" value="一键转卖">
        </div>
      </div>
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

    data() {
      return {
        scroll_goodsList: [{
            imgUrl: "/static/images/sell_goods/1.png",
            text: "宜搭T恤",
            num: 5431
          },
          {
            imgUrl: "/static/images/sell_goods/1.png",
            text: "白色衬衫",
            num: 2658
          },
          {
            imgUrl: "/static/images/sell_goods/1.png",
            text: "男士西装",
            num: 5431
          },
          {
            imgUrl: "/static/images/sell_goods/1.png",
            text: "蓝色牛仔",
            num: 3125
          },
        ],
      }
    },

    methods: {}
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";

</style>
