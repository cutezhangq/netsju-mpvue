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
         <block v-for="(item, index) in banner" :key="index">
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
      <div @click="toCategoryList(0)">
        <i class="iconfont icon-netsju-fuzhuang1"></i>
        <p>服装</p>
      </div>
      <div @click="toCategoryList(1)">
        <i class="iconfont icon-netsju-yinshi"></i>
        <p>食品</p>
      </div>
      <div @click="toCategoryList(2)">
        <i class="iconfont icon-netsju-erji1"></i>
        <p>配件</p>
      </div>
      <div @click="toCategoryList(3)">
        <i class="iconfont icon-netsju-ziyuan"></i>
        <p>书籍</p>
      </div>
      <div @click="toAllCategory">
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
import { API,SH_API } from "../../../api/api";
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
       }
       ],
      

      category:[],
      //品牌直供
      brandList:[]
    }
  },
  beforeMount() {
    //this.getBrandList();
    this.sh_categorycontroller();
    this.sh_indeximg();
  },
  methods: {
    //跳转---search页面
    toSearch() {
      wx.navigateTo({
        url: "/pages/usedMarket/index/search/main"
      });
    },
    //跳转---categorylist页面
    toCategoryList(category_index){
       wx.navigateTo({
        url: "/pages/usedMarket/index/categorylist/main"+"?categoryIndex="+category_index
      });
    },

    //跳转---allcategory页面
    toAllCategory(){
      wx.navigateTo({
        url: "/pages/usedMarket/index/allCategory/main"
      });
    },
    //test
    async getBrandList(){
      const data = await get(API+"/index/index");
      this.brandList = data.brandList;
      console.log(this.brandList)
    },

    //请求---分类信息
    sh_categorycontroller(){
      wx.request({
        url:SH_API+'/category',
        success:(res)=>{
          this.category = res.data
          //console.log(this.category)
        }
      })
    },
    //请求---首页商品
    sh_indeximg(){
      wx.request({
        url:API+'/index/index',
        success:(res)=>{
          this.brandList = res.data.brandList
          //console.log(this.brandList)
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl"
</style>
