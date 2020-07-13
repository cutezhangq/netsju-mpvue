<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满30元免邮费</div>
    </div>
    <div class="cartlist">
      <div class="item" @touchstart="startMove" @touchmove="deleteGoods" @touchend="endMove" :data-index="index" v-for="(item,index) in listData"
        :key="index">
        <div class="con" :style="item.textStyle">
          <div class="left">
            <div class="icon" @click="changeColor(index,item.productId)" :class="[ Listids[index] ? 'active' : '',{active:allcheck}]"></div>
            <div class="img">
              <img :src="item.image" alt="">
            </div>
            <div class="info" @click="togoodsDetail(item.productId)">
              <p>{{item.name}}</p>
              <p>￥{{item.price}}</p>
            </div>
          </div>
          <!-- 商品数量 -->
          <div class="right">
            <div class="num">
              x{{item.productNum}}
            </div>
          </div>
        </div>

        <div @click="delGoods(item.id,index)" class="delete" :style="item.textStyle1">
          <div>
            删除
          </div>
        </div>

      </div>
    </div>
    <!-- 没有商品 -->
    <div v-if="false" class="nogoods">
      <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png" alt="">
    </div>
    <!-- 全选 -->
    <div class="fixed">
      <div @click="allCheck" :class="{active:allcheck}" class="left">
        全选({{isCheckedNumber}})
      </div>
      <div class="right">
        <div>
          ￥{{allPrise}}
        </div>
        <div @click="orderDown">去下单</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {get,post,put,del} from "@/utils/request";
  import {SH_API} from "@/api/api";
  import "@/utils/index";
  import { mapMutations} from "vuex";

  export default {
    onShow() {
      this.getListData();
    },
    data() {
      return {
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        tranX: 0,
        tranX1: 0,
        startX: "",
        startY: "",
        moveX: "",
        moveY: "",
        moveEndX: "",
        moveEndY: "",
        X: 0,
        Y: "",
        chooseProductList:[], //购物车中选择下单的商品
      };
    },
    methods: {
      //滑动之前先初始化数据
      initTextStyle() {
        for (var i = 0; i < this.listData.length; i++) {
          this.listData[i].textStyle = "";
          this.listData[i].textStyle1 = "";
        }
      },

      //手指触摸动作开始
      startMove(e) {
        this.initTextStyle();
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      },

      //手指触摸后移动
      deleteGoods(e) {
        this.initTextStyle();
        //选择的商品下标
        var index = e.currentTarget.dataset.index;
        if (this.X <= -100) {
          this.flag = true;
        }
        if (!this.flag) {
          this.moveX = e.touches[0].pageX;
          this.moveY = e.touches[0].pageY;
          this.X = this.moveX - this.startX;
          this.Y = this.moveX - this.startY;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          if (this.X >= 100) {
            this.X = 0;
          }
          this.tranX = this.X;
          if (this.X <= -100) {
            this.X = -100;
          }
          this.tranX1 = this.X;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        } else {
          this.moveX = e.touches[0].pageX;
          this.moveY = e.touches[0].pageY;
          this.X = this.moveX - this.startX;
          this.Y = this.moveX - this.startY;
          this.tranX = this.X - 100;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          if (this.X + -100 > -100) {
            this.flag = false;
          }
          this.tranX1 = -100;
          this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
        }
      },

      //手指触摸动作结束
      endMove(e) {
        var index = e.currentTarget.dataset.index;
        if (this.X > -50) {
          this.tranX1 = 0;
          this.tranX = 0;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        } else if (this.X <= -50) {
          this.tranX1 = -100;
          this.tranX = -100;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        }
      },

      ...mapMutations(["choose_productList"]),

      //下单
      async orderDown() {
        this.chooseProductList = [];
        if (this.Listids.length == 0) {
          wx.showToast({
            title: "请选择商品",
            icon: "none",
            duration: 1500
          });
          return false;
        }
        // 去掉数组中空的false的
        var newgoodsid = [];
        for (let i = 0; i < this.Listids.length; i++) {
          const element = this.Listids[i];
          if (element) {
            newgoodsid.push(element);
          }
        }
        var goodsId = newgoodsid.join(",");
        //选择的商品id数组 去空值
        var goodsIdArr = this.Listids.notEmpty();
        var _this = this;
        //获取选择的商品数组信息
        this.listData.forEach(function(item,index){
          goodsIdArr.forEach(function(item2,index2){
            if(item.productId == item2){
              _this.chooseProductList.push(_this.listData[index]);
            }
          })
        });
        //存入vuex
        this.choose_productList({
          orderProductList:this.chooseProductList
        })
        wx.setStorageSync("order_productId",goodsId);
        wx.setStorageSync("order_allPrise",this.allPrise);
        wx.navigateTo({
          url: "/pages/usedMarket/order/main"
        });
      },

      //删除商品
      delGoods(id, index) {
        var _this = this;
        wx.showModal({
          title: "",
          content: "是否要删除该商品",
          success: function (res) {
            if (res.confirm) {
              _this.Listids.splice(index, 1);
              //根据ID删除购物车某条数据
              const data = del(SH_API+`/cart/${id}`)
              .then(() => {
                _this.getListData();
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
              //滑动之前先初始化样式数据
              _this.initTextStyle();
            }
          }
        });
      },

      //查询用户购物车信息
      async getListData() {
        const data = await get(SH_API+"/cart");
        for (var i = 0; i < data.data.length; i++) {
          data.data[i].textStyle = "";
          data.data[i].textStyle1 = "";
        }
        this.listData = data.data;
      },

      //全选
      allCheck() {
        //先清空
        this.Listids = [];
        if (this.allcheck) {
          this.allcheck = false;
        } else {
          // 选择全部
          this.allcheck = true;
          //循环遍历所有的商品id
          for (let i = 0; i < this.listData.length; i++) {
            const element = this.listData[i];
            this.Listids.push(element.productId);
          }
        }
      },

      //选择某种商品，前方icon变色
      changeColor(index, id) {
        this.Listids[index]? this.$set(this.Listids, index, false):this.$set(this.Listids, index, id);
      },

      togoodsDetail(id){
        wx.navigateTo({
          url: "/pages/usedMarket/index/goodsDetail/main?categoryId="+id
        });
      }
    },

    computed: {
      //全选 数量
      isCheckedNumber() {
        let number = 0;
        for (let i = 0; i < this.Listids.length; i++) {
          if (this.Listids[i]) {
            number++;
          }
        }
        //是否 全选
        if (number == this.listData.length && number != 0) {
          this.allcheck = true;
        } else {
          this.allcheck = false;
        }
        return number;
      },

      //总价 
      allPrise() {
        var Prise = 0;
        for (let i = 0; i < this.Listids.length; i++) {
          if (this.Listids[i]) {
            Prise = Prise + this.listData[i].price * this.listData[i].productNum;
          }
        }
        return Prise;
      }
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";

</style>
