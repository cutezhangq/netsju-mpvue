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
              <img :src="item.image" alt="">
            </div>
            <div class="info">
              <p>{{item.name}}</p>
              <p>￥{{item.price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">
              x{{item.productNum}}
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
      <div @click="confirmOrder" v-if="!isConfirmOrder">
        确认订单
      </div>
      <div @click="modifyOrder" v-else>
        修改订单
      </div>
    </div>
  </div>
</template>

<script>
  import {get,post} from "@/utils/request";
  import { SH_API } from "@/api/api";
  import {mapState} from "vuex";
  
  export default {
    onShow() {
      if (wx.getStorageSync("addressId")) {
        this.addressId = wx.getStorageSync("addressId");
        this.getChooseAddress();
      }else{
        this.getDefaultAddress();
      }
      this.allprice = wx.getStorageSync("order_allPrise");
    },
    mounted(){
      this.getDetail();
    },
    data() {
      return {
        addressId: "",
        allprice: "",
        listData: [],
        address: {},
        isConfirmOrder:false,
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
      //展示选择下单的商品
      getDetail() {
        this.listData = this.orderProductList;
      },
      //下单
      confirmOrder(){
        // console.log('选择的商品数组',this.listData);
        // console.log('选择的地址信息',this.address);
        //数组对象的某个属性的值提取出来组成新的数组
        let ItemDtoList = (this.listData).map((item,index)=>{
          return {
            productId:item.productId,
            num:item.productNum
          }
        })
        let orderList = {};
        let addr = this.address;
        orderList.orderItemDtoList = ItemDtoList;
        orderList.username = addr.nickname;
        orderList.phone =  addr.phone;
        orderList.receiverUniversity =  addr.university;
        orderList.receiverCampus =  addr.campus;
        orderList.receiverDormitory =  addr.dormitory;
        orderList.receiverRoom =  addr.room;
        orderList.receiverDetail =  addr.comment;
        // orderList.phone =  addr.phone;
        // orderList.phone =  addr.phone;
        // orderList.phone =  addr.phone;
        // orderList.phone =  addr.phone;
        // console.log('新的数组:',orderList);
        const data = post(SH_API+"order",{
          orderDto:orderList
        });
        if (data.code == 200) {
          this.isConfirmOrder = true;
          var _this = this;
          wx.showModal({
            title: "",
            content: "订单已确认，去支付",
            confirmText:"去支付",
            success: function (res) {
              if (res.confirm) {
                console.log("用户点击去支付");
                _this.pay();
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        }
      },
      //修改订单---只能修改地址和收货人的相关信息
      modifyOrder(){
        
      },
    },
    computed: {
      //拿到vuex中数据
      ...mapState(["orderProductList"]),
    },
  };

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";
</style>
