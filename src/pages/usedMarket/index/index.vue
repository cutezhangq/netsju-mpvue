<template>
  <div class="index">
    <!-- 搜索 -->
    <div class="search">
      <!-- 城市位置 -->
      <!-- <div @click="toMappage">{{cityName}}</div> -->
      <div></div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播 -->
    <div class="listContainer">
      <swiper class="swiper" indicator-dots indicator-color="#EDEDED" indicator-active-color="#FFD800" autoplay="true" interval="3000" circular="true" duration="500">
         <block v-for="(item, index) in banner " :key="index">
           <swiper-item>
            <img style="width:100%;" :src="item.image_url" alt="">
          </swiper-item>
         </block>
      </swiper>
    </div>
    <!-- 分类 -->
     <!-- <div class="channel">
      <div @click="categoryList(item.id)" v-for="(item, index) in channel" :key="index">
        <img :src="item.icon_url" alt="">
        <p>{{item.name}}</p>
      </div>
    </div> -->
    <div class="channel">
      <div>
        <a href="/pages/usedMarket/index/categorylist/main"><i class="iconfont icon-netsju-fuzhuang1"></i> </a>
        <p>服装</p>
      </div>
      <div>
        <i class="iconfont icon-netsju-yinshi"></i>
        <p>食品</p>
      </div>
      <div>
        <i class="iconfont icon-netsju-erji1"></i>
        <p>配件</p>
      </div>
      <div>
        <i class="iconfont icon-netsju-ziyuan"></i>
        <p>书籍</p>
      </div>
      <div>
        <i class="iconfont icon-netsju-quanbufenlei"></i>
        <p>全部分类</p>
      </div>
    </div>
    <!-- 商品展示 -->
    <div class="brand">
      <div @click="tobrandList" class="head">
        品牌制造商直供
      </div>
      <div class="content">
        <div v-for="(item, index) in brandList" :key="index">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>
      </div>
    </div>



     <!-- <tabBar></tabBar> -->
  </div>
</template>

<script>
import { API } from "../../../api/api";
import { get } from "../../../utils/request";
export default {
  data () {
    return {
      //轮播图
      banner: [
        {
          image_url:"/static/images/index/carousel01.jpg"
        },
         {
          image_url:"/static/images/index/carousel02.jpg"
        },
         {
          image_url:"/static/images/index/carousel03.jpg"
        },
         {
          image_url:"/static/images/index/carousel04.jpg"
        },
      ], 
      //分类icon
      channel: [
       {
         icon_url:"#",
         name:"服装"
       },
       {
         icon_url:"#",
         name:"食品"
       },
       {
         icon_url:"#",
         name:"配件"
       },
       {
         icon_url:"#",
         name:"书籍"
       },
       {
         icon_url:"#",
         name:"全部分类"
       },
     ],
      brandList:[]
    }
  },
  mounted() {
    //this.getBrandList();
  },
  methods: {
    toSearch() {
      wx.navigateTo({
        url: "/pages/usedMarket/index/search/main"
      });
    },
    //请求brandList
    async getBrandList(){
      const data = await get(API+"/index/index");
      this.brandList = data.brandList;
      console.log(this.brandList)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl"
</style>
