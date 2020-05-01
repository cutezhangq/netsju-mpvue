<template>
  <div class="index">
    <!-- 搜索框 -->
    <searchBar @click="toSearch"></searchBar>

    <!-- 轮播 -->
    <div class="listContainer">
      <swiper class="swiper" indicator-dots indicator-color="#EDEDED" indicator-active-color="#FFD800" autoplay="true" interval="3000" circular="true" duration="500">
         <block v-for="(item, index) in banner" :key="index">
           <swiper-item>
            <img style="width:100%;" :src="item.image_url" alt="">
          </swiper-item>
         </block>
      </swiper>
    </div>
    <!-- 分类 -->
    <div class="channel">
      <div @click="categoryList(index)" v-for="(item, index) in category" :key="index">
        <img :src="item.iconUrl">
        <p>{{item.name}}</p>
      </div>
      <div @click="toCategoryList(4)">
        <img :src="all_channel.iconUrl">
        <p>{{all_channel.name}}</p>
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
          <img :src="item.new_pic_url">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API,SH_API } from "@/api/api";
import { get } from "@/utils/request";
import searchBar from "@/components/searchBar";

export default {
  components: {
    searchBar,
  },
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
      //全部分类icon
      all_channel:{
        iconUrl:SH_API + "/images/icon/全部分类.png",
        name:"全部分类"
      },
      category:[],
      //品牌直供
      brandList:[]
    }
  },
  beforeMount() {
    this.sh_category();
    this.sh_indexGoods();
  },
  computed: {
   
  },
  methods: {
    //跳转---search页面
    toSearch() {
      wx.navigateTo({
        url: "/pages/usedMarket/index/search/main"
      });
    },
    //跳转页面
    toCategoryList(category_index){
      if(category_index !== 4){
        //分类列表 页面
        wx.navigateTo({
          url: "/pages/usedMarket/index/categorylist/main"+"?categoryIndex="+category_index
        });
      }else{
        //全部分类 页面
        wx.navigateTo({
          url: "/pages/usedMarket/index/allCategory/main"
        });
      }      
    },

    //请求---分类信息
    async sh_category(){
      const data = await get(SH_API+"/category",{location:0});
      this.category = data.data;
    },
    //请求---首页商品
    async sh_indexGoods(){
      const data = await get(API+"/index/index");
      this.brandList = data.brandList;
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/common.styl";
@import "./style.styl";
</style>
