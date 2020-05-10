<template>
  <div class="goods">
    <!-- 轮播 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.imgUrl" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>

    <!-- 退货 退款 邮费 -->
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>

    <!-- 商品简介 -->
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.description}}</p>
        <p>￥{{info.price}}</p>
        <!-- <div v-if="brand.name" class="brand">
          <p>{{brand.name}}</p>
        </div> -->
      </div>
    </div>
    
    <!-- 商品数量 -->
    <div @click="showType" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>

    <!-- 评论 -->
    <div class="comment">
      <div @click="showType_comment" class="section-nav">
        <div>用户评价</div>
        <div></div>
      </div>
      <div class="goods-info">
        <div class="c">
          <p>还没有用户评价...</p>
        </div>
      </div>
    </div>
    
    <!-- 解析富文本图片 -->
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc" />
    </div>

    <!-- 大家都在看 -->
    <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">大家都在看</text>
        <div class="line"></div>
      </div>
      <div class="sublist">
        <div @click="togoodsDetail(subitem.pid)" v-for="(subitem, subindex) in productList" :key="subindex">
          <img :src="subitem.pimg" alt="">
          <p>{{subitem.pname}}</p>
          <p>￥{{subitem.price}}</p>
        </div>
      </div>
    </div>

    <!-- 底部固定栏 -->
    <div class="bottom-fixed">
      <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']"></div>
      </div>
      <!-- 购物车 -->
      <div @click="toCart">
        <div class="car">
          <span>
            {{allnumber}}
          </span>
          <!-- <img src="/static/images/ic_menu_shoping_nor.png" alt=""> -->
           <i class="iconfont cart" style="font-size:142%">&#xe6c7;</i>
        </div>
      </div>
      <div @click="buy">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>

    <!-- 选择规格部分 -->
    <div v-show="showpop" @click="showType" class="pop"></div>
    <!-- 弹出层  点击"立即购买"/"加入购物车"弹出 -->
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primaryPicUrl" alt="">
        </div>
        <div class="right">
          <div>
            <p>价格￥{{info.price}}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div @click="showType" class="close">
          X
        </div>
      </div>
      <div class="b">
        <p>数量</p>
        <div class="count">
          <div @click="reduce" class="cut">-</div>
          <input class="number" disabled="" v-model="number" />
          <div @click="add" class="add">+</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {API,SH_API} from "@/api/api";
import {get,post,toLogin,login} from "@/utils/request";
import wxParse from "mpvue-wxparse";

export default {
  onShow() {
  },
  mounted() {
    //判断是否登录获取用户信息
    if (login()) {
      this.userInfo = login();
    }
    this.goodsDetail(this.$root.$mp.query.categoryId);
  },
  //商品转发
  onShareAppMessage() {
    return {
      title: this.info.name,
      path: "/pages/goods/main?id=" + this.info.id,
      imageUrl: this.gallery[0].imgUrl  //拿第一张商品的图片
    };
  },
  data() {
    return {
      allnumber: 0,
      // collectFlag: false,
      number: 0,
      showpop: false,
      gallery: [],
      info: {},
      // brand: {},
      productList: [],
      goods_desc: "",
      userInfo: "",
      goodsId: "",
    };
  },
  components: {
    wxParse
  },
  methods: {
    //跳转--商品详情页
    togoodsDetail(id) {
      //关闭当前页面，跳转到应用内的某个页面，不允许跳转到 tabbar 页面
      wx.redirectTo({ url: "/pages/usedMarket/index/GoodsDetail/main?categoryId=" + id });
    },

    add() {
      this.number = this.number + 1;
    },
    reduce() {
      if (this.number > 1) {
        this.number = this.number - 1;
      } else {
        return false;
      }
    },

    //立即购买
    async buy() {
      if (toLogin()) {
        if (this.showpop) {
          if (this.number == 0) {
            wx.showToast({
              title: "请选择商品数量", //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => { }
            });
            return false;
          }

          const data = await post("/order/submitAction", {
            goodsId: this.goodsId,
          });
          if (data) {
            wx.navigateTo({
              url: "/pages/order/main"
            });
          }
        } else {
          this.showpop = true;
        }
      }
    },
    // async collect() {
    //   if (toLogin()) {
    //     this.collectFlag = !this.collectFlag;
    //     const data = await post("/collect/addcollect", {
    //       goodsId: this.goodsId
    //     });
    //   }
    // },

    //加入购物车
    async addCart() {
      if (toLogin()) {
        if (this.showpop) {
          if (this.number == 0) {
            wx.showToast({
              title: "请选择商品数量", //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => { }
            });
            return false;
          }
          const data = await post("/cart/addCart", {
            goodsId: this.goodsId,
            number: this.number
          });
          //添加成功后
          if (data) {
            this.allnumber = this.allnumber + this.number;
            wx.showToast({
              title: "添加购物车成功",
              icon: "success",
              duration: 1500
            });
          }
        } else {
          this.showpop = true;
        }
      }
    },

    // 跳转--购物车
    toCart() {
      wx.switchTab({
        url: "/pages/cart/main"
      });
      // wx.navigateTo({
      //   url: "/pages/cart/main"
      // });
    },

    //请求--商品详情页
    async goodsDetail(categoryId) {
      const data = await get(SH_API+`/shProduct/${categoryId}`);
      this.gallery = data.data.gallery;
      this.info = data.data.productInfo;
      this.goodsId = data.data.productInfo.id;
      this.goods_desc = data.data.productInfo.productDesc;
      // this.brand = data.data.brand;
      // this.collectFlag = data.data.collected;
      this.allnumber = 6;
      this.productList = data.data.productList;
    },

    showType() {
      this.showpop = !this.showpop;
    }
  },
  computed: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "~@/assets/common.styl";
@import "./style.styl";
</style>
