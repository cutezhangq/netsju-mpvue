<template>
  <div class="goods">
    <!-- 轮播 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.img_url" class="slide-image" />
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
        <p>{{info.goods_brief}}</p>
        <p>￥{{info.retail_price}}</p>
        <div v-if="brand.name" class="brand">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    
    <!-- 商品数量 -->
    <div @click="showType" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>

    <!-- <div @click="showType" class="section-nav">
      <div>用户评价</div>
      <div></div>
    </div> -->

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
        <div @click="togoodsDetail(subitem.id)" v-for="(subitem, subindex) in productList" :key="subindex">
          <img :src="subitem.list_pic_url" alt="">
          <p>{{subitem.name}}</p>
          <p>￥{{subitem.retail_price}}</p>
        </div>
      </div>
    </div>

    <!-- 底部固定栏 -->
    <div class="bottom-fixed">
      <!-- <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']"></div>
      </div> -->
      <div @click="toCart">
        <div class="car">
          <span>
            {{allnumber}}
          </span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt="">
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
          <img :src="info.primary_pic_url" alt="">
        </div>
        <div class="right">
          <div>
            <p>价格￥{{info.retail_price}}</p>
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
    <!-- 选择规格部分 -->

  </div>
</template>

<script>
// import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
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
    console.log(this.$root.$mp.query.id);

    this.categoryId = this.$root.$mp.query.categoryId;

    this.openId = getStorageOpenid();
    this.goodsDetail();
  },
  //商品转发
  onShareAppMessage() {
    console.log(this.info.name);
    console.log(this.info.id);
    console.log(this.gallery[0].img_url);

    return {
      title: this.info.name,
      path: "/pages/goods/main?id=" + this.info.id,
      imageUrl: this.gallery[0].img_url //拿第一张商品的图片
    };
  },
  data() {
    return {
      allnumber: 0,
      openId: "",
      collectFlag: false,
      number: 0,
      showpop: false,
      gallery: [],
      info: {},
      brand: {},
      productList: [],
      goods_desc: "",
      categoryId: "",
      userInfo: "",
      goodsId: "",
      allPrise: ""
    };
  },
  components: {
    wxParse
  },
  methods: {
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
          console.log(this.goodsId);
          console.log(this.openId);

          const data = await post("/order/submitAction", {
            goodsId: this.goodsId,
            openId: this.openId,
            allPrise: this.allPrise
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
    //       openId: this.userInfo.openId,
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
            openId: this.userInfo.openId,
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
    async goodsDetail() {
      const data = await get(SH_API+`/shProduct/${this.categoryId}`);
      this.gallery = data.data.gallery;
      this.info = data.data.info;
      this.allPrise = data.data.info.retail_price;
      this.goodsId = data.data.info.id;
      this.brand = data.data.brand;
      this.goods_desc = data.data.info.goods_desc;
      this.collectFlag = data.data.collected;
      this.allnumber = data.data.allnumber;
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
