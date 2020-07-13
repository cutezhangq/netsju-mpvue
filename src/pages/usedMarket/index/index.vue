<template>
  <div>
    <div class="content">
      <!-- 搜索 -->
      <div class="search">
        <!-- 城市位置 -->
        <div @click="toMappage">{{cityName}}</div>
        <div @click="toSearch()">
          <input type="text" placeholder="搜索商品">
          <span class="icon"></span>
        </div>
      </div>
      <!-- 轮播 -->
      <div class="listContainer">
      <swiper class="swiper" indicator-dots indicator-color="#EDEDED" indicator-active-color="#FFD800" autoplay="true"
        interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item>
            <img style="width:100%;" :src="item.imageUrl" alt="">
          </swiper-item>
        </block>
      </swiper>
      </div>
      <!-- 分类 -->
      <div class="channel">
      <div @click="toCategoryList(index,item.id)" v-for="(item, index) in category" :key="index">
        <img :src="item.iconUrl">
        <p>{{item.name}}</p>
      </div>
      <div @click="toCategoryList(4)">
        <img :src="all_channel.iconUrl">
        <p>{{all_channel.name}}</p>
      </div>
      </div>
      <!-- 新品首发 -->
      <div class="bg">
      <div @click="goodsList('new')" class="newgoods">
      <div class="top">
        <p>新品首发</p>
        <p>查看全部</p>
      </div>
      </div>
      <!-- 人气推荐 -->
      <div @click="goodsList('hot')" class="newgoods hotgoods">
      <div class="top">
        <p>人气推荐
          <span></span> 好物精选</p>
        <p>查看全部</p>
      </div>
      </div>
      </div>
      <!-- 商品信息组件 -->
      <productBar :product="product"></productBar>
    </div>
    <!-- tabbar -->
    <vueTabBar   
      @fetch-index="clickIndexNav"
      :selectNavIndex=selectNavIndex
      >
    </vueTabBar>
  </div>
</template>

<script>
  import {SH_API} from "@/api/api";
  import {get } from "@/utils/request";
  import productBar from "@/components/productBar";
  import amapFile from "@/utils/amap-wx";
  import {mapState, mapMutations} from "vuex";
  import vueTabBar from "@/components/usedMTabBar";

  export default {
    onShow(){
      wx.hideTabBar();
    },
    components: {
      productBar,
      vueTabBar
    },
    //下拉刷新
    onPullDownRefresh(){
      this.page=1
      this.getShProduct(true)
      //刷新后关闭
      wx.stopPullDownRefresh()
    },
    //划到底部
    onReachBottom(){
      this.page=this.page+1;
      wx.showToast({
        title: '数据库中没有数据啦',
        icon: 'none',
        duration: 2000
      })
      //判断数据是否还有没有
      if(this.page>8){
        return false;
      }
      this.getShProduct()
    },
    data() {
      return {
        selectNavIndex:0,
        banner: [],
        page:0,
        product:[],
        bannerPage: 0,
        //全部分类icon
        all_channel: {
          iconUrl: SH_API + "/images/icon/全部分类.png",
          name: "全部分类"
        },
        category: [],
      }
    },
    beforeMount() {
      this.sh_category();
      this.getCityName();
      this.getIndexBanner();
      this.getShProduct(true);
    },
    computed: {
      ...mapState(["cityName"]),
    },
    methods: {
      ...mapMutations(["city_update"]),
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
        var _this = this;
        var myAmapFun = new amapFile.AMapWX({
          key: "e545e7f79a643f23aef187add14e4548" //高德key
        });
        myAmapFun.getRegeo({
          success: function (data) {
            _this.city_update({
              cityName: data[0].regeocodeData.formatted_address
            });
          },
          fail: function (info) {
            //如果用户拒绝授权,默认为南京
            _this.cityName = "南京市";
            _this.city_update({
              cityName: "南京市"
            });
          }
        });
      },

      //跳转---search页面
      toSearch() {
        wx.navigateTo({
          url: "/pages/usedMarket/index/search/main"
        });
      },
      //跳转---分类列表、全部分类页
      toCategoryList(category_index, category_id) {
        if (category_index !== 4) {
          //分类列表 页面
          wx.navigateTo({
            url: "/pages/usedMarket/index/categoryList/main" + "?categoryId=" + category_id
          });
        } else {
          //全部分类 页面
          wx.navigateTo({
            url: "/pages/usedMarket/index/allCategory/main"
          });
        }
      },

      //请求---分类信息
      async sh_category() {
        const data = await get(SH_API + "/category", {location: 0});
        this.category = data.data;
      },
      //请求轮播图
      async getIndexBanner() {
        const data = await get(SH_API + `/ad/${this.bannerPage}`)
        this.banner = data.data;
      },
      //请求商品信息
      async getShProduct(first){
        const data = await get(SH_API + `/shProduct/index?page=${this.page}`)
        if(first){
          this.product = data.data;
        } else {
          this.product = this.product.concat(data.data);
        }
      },
      //跳转到新品或人气页面
      goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url:"../index/newGoods/main?isHot="+1
        });
      } else {
        wx.navigateTo({
          url: "../index/newGoods/main?isNew="+1
        });
      }
    },
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";
</style>
