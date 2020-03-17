<template>
  <div class="index">
    <!-- 搜索 -->
    <div class="search">
      <!-- 城市位置 -->
      <!-- <div @click="toMappage">{{cityName}}</div> -->
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播 -->
    <div class="listContainer">
      <swiper class="swiper" indicator-dots indicator-color="pink" indicator-active-color="green">
        <swiper-item>
          <img style="width:100%;" src="/static/images/carousel/carousel01.jpg" alt="">
        </swiper-item>
        <swiper-item>
          <img style="width:100%;" src="/static/images/carousel/carousel02.jpg" alt="">
        </swiper-item>
        <swiper-item>
          <img style="width:100%;" src="/static/images/carousel/carousel03.jpg" alt="">
        </swiper-item>
        <swiper-item>
          <img style="width:100%;" src="/static/images/carousel/carousel04.jpg" alt="">
        </swiper-item>
      </swiper>
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
      banner: [], //轮播图
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
  @import "./style.stylus";
</style>
