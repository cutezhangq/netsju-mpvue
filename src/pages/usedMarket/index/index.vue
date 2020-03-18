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
        <i class="iconfont icon-netsju-fuzhuang1"></i>
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
// import tabBar from '@/components/tabBar'

export default {
  onShow() {
  },
  // components: {
  //   tabBar
  // },

  data () {
    return {
      //轮播图
      banner: [
        {
          image_url:"/static/images/carousel/carousel01.jpg"
        },
         {
          image_url:"/static/images/carousel/carousel02.jpg"
        },
         {
          image_url:"/static/images/carousel/carousel03.jpg"
        },
         {
          image_url:"/static/images/carousel/carousel04.jpg"
        },
      ], 
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
    }
  },

  created () {
  },
  methods: {
    // 获取信息
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
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
            // wx.navigateTo({
            //   url: "/pages/mappage/main"
            // });
          }
        }
      });
    },
    //定位城市
    getCityName() {
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
    toSearch() {
      // wx.navigateTo({
      //   url: "/pages/search/main"
      // });
    },

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl"
  .search{
    background: $mainCorlor;
  }
</style>
