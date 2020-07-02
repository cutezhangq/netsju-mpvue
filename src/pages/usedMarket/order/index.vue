<template>
  <div class="order">
    <!-- 地址 -->
      <!-- 选择地址列表 -->
    <div @click="toAddressList" v-if="address.nickname" class="address">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.nickname}}</span>
              <div v-if="address.isDefault == 1" class="moren">
                默认
              </div>
            </div>
            <div class="info">
              <p>{{address.phone}}</p>
              <p>{{address.province+' '+address.city+' '+address.area+' '
                +address.university+' '+address.campus+' '+address.dormitory+' '+address.room}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 没有地址时，选择地址 -->
    <div @click="toAdd" v-else class="seladdress">
      还没有默认地址，去设置
    </div>
    <!-- 合计、运费、优惠劵 -->
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{allprice}}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <!-- 下单商品 -->
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>￥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">
              x{{item.number}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认订单 -->
    <div class="bottom">
      <div>
        实付 : ￥{{allprice}}
      </div>
      <!-- <div @click="pay">
        支付
      </div> -->
      <div @click="pay">
        确认订单
      </div>
    </div>
  </div>
</template>

<script>
  import {get,post} from "@/utils/request";
  import { SH_API } from "@/api/api";

  export default {
    onShow() {
      if (wx.getStorageSync("addressId")) {
        this.addressId = wx.getStorageSync("addressId");
        this.getChooseAddress();
      }else{
        this.getDefaultAddress();
      }
      // this.getDetail();
      
    },
    created() {},
    mounted() {},
    data() {
      return {
        addressId: "",
        allprice: "",
        listData: [],
        address: {}
      };
    },
    methods: {
      pay() {
        wx.showToast({
          title: "支付功能暂未开发", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: false, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
      },

      //跳转地址列表页
      toAddressList() {
        wx.navigateTo({
          url: "/pages/usedMarket/address/addressSelect/main"
        });
      },

      //没有地址时去添加地址
      toAdd() {
        wx.navigateTo({
          url: "/pages/usedMarket/address/addAddress/main"
        });
      },

      //查询默认地址
      async getDefaultAddress(){
        const data = await get(SH_API + "/address/default");
        if (data.data !== null) {
          this.address = data.data;
        }else{
          this.address = false;
        }
      },
      
      //查询选择的地址
      async getChooseAddress(){
        const data = await get(SH_API+"/address/"+this.addressId);
        this.address = data.data;
      },

      //展示地址和订单商品
      async getDetail() {
        const data = await get(SH_API + "/order/detailAction", {
          addressId: this.addressId
        });
        if (data) {
          this.allprice = data.allPrise;
          this.listData = data.goodsList;
          this.address = data.address;
        }
      }
    },
    computed: {}
  };

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";
</style>
