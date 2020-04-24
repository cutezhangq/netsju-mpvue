<template>
  <div class="index">
    <!-- 搜索 -->
    <div class="search">
      <!-- 城市位置 -->
      <div @click="toMappage">{{cityName}}</div>
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
    </div>  -->
    
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
      <div @click="toCategoryList(4)">
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
  </div>
</template>

<script>
import { API,SH_API } from "@/api/api";
import { get } from "@/utils/request";
import amapFile from "@/utils/amap-wx";
import { mapState, mapMutations } from "vuex";
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
   // this.sh_category();
    this.sh_indexGoods();
  },
  computed: {
    ...mapState(["cityName"]),
   
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
      // console.log(this.category)
    },
    //请求---首页商品
    async sh_indexGoods(){
      const data = await get(API+"/index/index");
      this.brandList = data.brandList;
    },

    ...mapMutations(["update"]),
    //高德地图
    toMappage() {
      var _this = this;
      // 通过 wx.getSetting先查询一下用户是否授权了这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: res => {
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mapPage/main"
            })
          }
        }
      });
    },
    getCityName() {
      console.log('-----进入getCityName()..-----')
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function (data) {
          //成功回调
          console.log(data);
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function (info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "南京市";
          _this.update({ cityName: "南京市" });
        }
      });
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl"
</style>
