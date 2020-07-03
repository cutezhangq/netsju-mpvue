<template>
  <div class="bar">
    <div class="top">
      <span>—</span>
      <span>精品商城</span>
      <span>—</span>
    </div>
    <div class="productList">
      <div @click="goodsDetail(item.pid)" class="product" v-for="(item,index) in productDetail" :key="index">
        <img :src="item.pimg">
        <h3>{{item.pname}}</h3>
        <div class="price">
          <span>￥</span>
          <span>{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get
  } from "@/utils/request";
  import {
    SH_API
  } from "@/api/api";

  export default {
    //下拉刷新
    onPullDownRefresh() {
      this.page = 1
      this.getShProductDetails(true)
      //刷新后关闭
      wx.stopPullDownRefresh()
    },
    //划到底部
    onReachBottom() {
      this.page = this.page + 1;
      wx.showToast({
        title: '数据库中没有数据啦',
        icon: 'none',
        duration: 2000
      })
      //判断数据是否还有没有
      if (this.page > 1) {
        return false;
      }
      this.getShProductDetails()
    },
    mounted() {
      this.getShProductDetails(true)
    },
    data() {
      return {
        productId: 1045000,
        productDetail: [],
        page: 1,
      };
    },
    methods: {
      async getShProductDetails(first) {
        const data = await get(SH_API + `/shProduct/${this.productId}?page=${this.page}`)
        first ? this.productDetail = data.data.productList : this.productDetail = this.productDetail.concat(data.data
          .productList)
      },
      //跳转到商品详情页
      goodsDetail(id) {
        wx.navigateTo({
          url: "/pages/usedMarket/index/goodsDetail/main?categoryId=" + id
        });
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";

</style>
