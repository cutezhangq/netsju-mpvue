<!-- 搜索框组件 -->
<template>
  <div class="search">
    <!-- 城市位置 -->
    <div @click="toMappage" class="city">{{cityName}}</div>
    <div @click="To" class="search_goods">
      <input type="text" placeholder="搜索商品">
      <span class="icon"></span>
    </div>
  </div>
</template>

<script>
  import amapFile from "@/utils/amap-wx";
  import {
    mapState,
    mapMutations
  } from "vuex";

  export default {
    props: {},
    data() {
      return {}
    },

    created() {},
    computed: {
      ...mapState(["cityName"]),
    },
    mounted() {
      this.getCityName();
    },
    methods: {
      ...mapMutations(["update"]),
      To() {
        this.$emit('click')
      },

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
            console.log(data);
            _this.update({
              cityName: data[0].regeocodeData.formatted_address
            });
          },
          fail: function (info) {
            console.log(info);
            //如果用户拒绝授权,默认为南京
            _this.cityName = "南京市";
            _this.update({
              cityName: "南京市"
            });
          }
        });
      },
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search {
    width: 100%;
    box-sizing: border-box;
    padding: 0 25rpx 0 10rpx;
    top: 0;
    z-index: 99;
    height: 80rpx;
    display: flex;
    align-items: center;
    background: #fff;
  }

  .city {
    width: 115rpx;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 22rpx;
    padding-right: 15rpx;
  }

  .search_goods {
    flex: 1;
    font-size: 32rpx;
    position: relative;
  }

  input {
    width: 100%;
    height: 56rpx;
    border-radius: 8rpx;
    background: #ededed;
    box-sizing: border-box;
    padding-left: 40rpx;
  }

  .icon {
    position: absolute;
    top: 15rpx;
    left: 10rpx;
    background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png') center no-repeat;
    background-size: 100%;
    width: 28rpx;
    height: 28rpx;
    margin-right: 10rpx;
  }

</style>
