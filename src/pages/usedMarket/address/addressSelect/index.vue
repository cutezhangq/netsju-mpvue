<template>
  <div class="address">
    <scroll-view scroll-y="true" class="addcont" style="height: 100%;">
      <!-- 地址列表 -->
      <div v-if="listData.length!=0" class="item">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="addresslist" :style="item.textStyle">
            <!-- 默认地址 -->
            <div>
              <span>{{item.nickname}}</span>
              <div v-if="item.isDefault" class="moren">
                默认
              </div>
            </div>
            <!-- 其他地址 -->
            <div @click="selAddress(item.id)" class="info">
              <p>{{item.phone}}</p>
              <p>
                {{item.province+' '+item.city+' '+item.area+' '
                +item.university+' '+item.campus+' '+item.dormitory+' '+item.room}}
              </p>
            </div>
            <!-- 操作-->
            <div @click="toDetail(item.id)"></div>
            <div @click="toDelete(item.id)"></div>
          </div>
        </div>
      </div>
      <!-- 没有地址 -->
      <div v-else class="center">
        <p>收货地址在哪里?</p>
      </div>
    </scroll-view>
    <!-- 选择 -->
    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
import { get,post,del } from "@/utils/request";
import { SH_API } from "@/api/api";
export default {
  onShow() {
    this.getAddressList();
  },
  created() {},
  computed: {},
  data() {
    return {
      listData: []
    };
  },
  components: {},
  methods: {
    //选择地址
    selAddress(id) {
      wx.setStorageSync("addressId", id);
      // wx.redirectTo({ url: "/pages/usedMarket/order/main?id=" + id });
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },

    //查看 选择的地址 详情
    toDetail(id) {
      wx.navigateTo({
        url: "/pages/usedMarket/address/addAddress/main?id=" + id
      });
    },

    //删除该地址
    async toDelete(id){
      var _this = this;
      const data = await del(SH_API+"/address/"+id);
      if(data){
        wx.showToast({
          title: "删除成功",
          icon: "success",
          duration: 2000, 
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
            this.getAddressList();
          }
        });
      }
    },

    //获取用户的地址
    async getAddressList() {
      var _this = this;
      const data = await get(SH_API+"/address");
      this.listData = data.data;
    },

    //新建地址、一键导入微信地址
    wxaddress(index) {
      // 新建地址
      if (index == 1) {
        wx.navigateTo({
          url: "/pages/usedMarket/address/addAddress/main"
        });
      } else {
        //一键导入微信地址
        wx.chooseAddress({
          success: function(res) {
            //转码
            var res = encodeURIComponent(JSON.stringify(res));
            wx.navigateTo({
              url: "/pages/usedMarket/address/addAddress/main?res=" + res
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/common.styl";
@import "./style.styl";
</style>
