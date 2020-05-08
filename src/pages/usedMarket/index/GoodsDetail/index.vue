<template>
  <div>
    <div class="head">
      <!-- 轮播 -->
      <swiper class="swiper" indicator-dots indicator-color="#EDEDED" indicator-active-color="#FFD800" autoplay="true" interval="3000" circular="true" duration="500">
         <block v-for="(item, index) in goodsImg" :key="index">
           <swiper-item>
            <img :src="item.list_pic_url" alt="">
          </swiper-item>
         </block>
      </swiper>
    </div>
    <!-- 售货服务 -->
    <div class="service">
      <p>30天无忧退货</p>
      <p>48小时快速退款</p>
      <p>满88免邮费</p>
    </div>
    <!-- 商品简介 -->
    <div class="info" v-for="(item,index) in listData" :key="index">
      <h1>日式和风懒人沙发</h1>
      <p>{{item.goods_name}}</p>
      <span>￥{{item.retail_price}}</span>
    </div>
    <!-- 购买操作 -->
    <div class="shop">
      <img src="../../../../../static/images/GoosDetail/icon_collect_checked.png">
      <img src="../../../../../static/images/GoosDetail/icon_collect_checked.png">
      <span>立即购买</span>
      <span>加入购物车</span>
    </div>
  </div>
</template>

<script>
import { API } from "@/api/api";
import { get } from "@/utils/request";
export default {
    created(){},
    mounted(){
      this.getGoodsDetail();
      this.getListData()
    },
    data() {
      return {
        goodsImg:[]
      }
    },
    methods: {
      async getGoodsDetail(){
        const data = await get(API+"/cart/cartList");
        this.goodsList = data.data;
      },
      async getListData() {
        const data = await get("/cart/cartList");
        this.listData = data.data;
      },
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";

</style>
